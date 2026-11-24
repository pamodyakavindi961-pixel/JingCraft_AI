import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'

if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET in .env')
  process.exit(1)
}

// ---------- Database ----------
fs.mkdirSync('data', { recursive: true })
const db = new DatabaseSync('data/jingcraft.db')
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS designs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  motif TEXT NOT NULL,
  vessel TEXT NOT NULL,
  palette TEXT NOT NULL,
  finish TEXT NOT NULL,
  prompt TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`)

// ---------- App ----------
const app = express()
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',') }))
app.use(express.json({ limit: '100kb' }))

const MOTIFS = ['dragon', 'floral', 'cloud', 'lotus', 'bamboo', 'peony']
const VESSELS = ['vase', 'teacup', 'plate', 'noodleBowl']
const PALETTES = ['cobalt', 'jade', 'rose', 'gold']
const FINISHES = ['gloss', 'satin', 'matte']

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

function requireAuth(req, res, next) {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Please log in first.' })
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id
    next()
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' })
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// ---------- Auth ----------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {}
  if (typeof name !== 'string' || !name.trim()) return res.status(400).json({ error: 'Name is required.' })
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Valid email required.' })
  if (typeof password !== 'string' || password.length < 8) return res.status(400).json({ error: 'Password must be 8+ characters.' })

  const e = email.trim().toLowerCase()
  if (db.prepare('SELECT id FROM users WHERE email = ?').get(e)) return res.status(409).json({ error: 'Email already registered.' })

  const info = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
    .run(name.trim(), e, bcrypt.hashSync(password, 10))
  const id = Number(info.lastInsertRowid)
  res.status(201).json({ token: signToken(id), user: { id, name: name.trim(), email: e } })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ error: 'Email and password required.' })
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase())
  if (!row || !bcrypt.compareSync(password, row.password_hash)) return res.status(401).json({ error: 'Incorrect email or password.' })
  res.json({ token: signToken(row.id), user: { id: row.id, name: row.name, email: row.email } })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.userId)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  res.json({ user: { id: user.id, name: user.name, email: user.email } })
})

// ---------- Designs ----------
const toDesign = (r) => ({
  id: String(r.id), name: r.name, motif: r.motif, vessel: r.vessel,
  palette: r.palette, finish: r.finish, prompt: r.prompt, createdAt: r.created_at,
})

app.get('/api/designs', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM designs WHERE user_id = ? ORDER BY id DESC').all(req.userId)
  res.json({ designs: rows.map(toDesign) })
})

app.post('/api/designs', requireAuth, (req, res) => {
  const { name, motif, vessel = 'vase', palette, finish, prompt = '' } = req.body || {}
  if (!MOTIFS.includes(motif)) return res.status(400).json({ error: 'Invalid motif.' })
  if (!VESSELS.includes(vessel)) return res.status(400).json({ error: 'Invalid vessel.' })
  if (!PALETTES.includes(palette)) return res.status(400).json({ error: 'Invalid palette.' })
  if (!FINISHES.includes(finish)) return res.status(400).json({ error: 'Invalid finish.' })
  if (typeof prompt !== 'string' || prompt.length > 120) return res.status(400).json({ error: 'Prompt max 120 characters.' })

  const n = typeof name === 'string' && name.trim() ? name.trim().slice(0, 80) : 'Untitled Design'
  const info = db.prepare('INSERT INTO designs (user_id, name, motif, vessel, palette, finish, prompt) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(req.userId, n, motif, vessel, palette, finish, prompt.trim())
  const row = db.prepare('SELECT * FROM designs WHERE id = ?').get(Number(info.lastInsertRowid))
  res.status(201).json({ design: toDesign(row) })
})

app.delete('/api/designs/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM designs WHERE id = ? AND user_id = ?').run(Number(req.params.id), req.userId)
  if (info.changes === 0) return res.status(404).json({ error: 'Design not found.' })
  res.json({ ok: true })
})

// ---------- AI preview (keyword based, not real generative AI) ----------
const MOTIF_WORDS = {
  dragon: ['dragon', 'loong', '龙'],
  lotus: ['lotus', 'water lily', '莲'],
  bamboo: ['bamboo', 'panda', '竹'],
  peony: ['peony', 'royal', '牡丹'],
  cloud: ['cloud', 'sky', 'wind', '云'],
  floral: ['flower', 'floral', 'blossom', 'vine', '花'],
}
const PALETTE_WORDS = {
  jade: ['green', 'jade', 'celadon', 'nature'],
  rose: ['pink', 'rose', 'red', 'soft'],
  gold: ['gold', 'golden', 'yellow', 'antique'],
  cobalt: ['blue', 'cobalt', 'navy', 'imperial'],
}
const FINISH_WORDS = {
  matte: ['matte', 'modern', 'quiet', 'flat'],
  satin: ['satin', 'elegant'],
  gloss: ['gloss', 'shiny', 'glossy', 'polished'],
}
const pick = (text, table, fallback) => {
  for (const [key, words] of Object.entries(table)) if (words.some((w) => text.includes(w))) return key
  return fallback
}

app.post('/api/ai/preview', (req, res) => {
  const { prompt } = req.body || {}
  if (typeof prompt !== 'string' || !prompt.trim()) return res.status(400).json({ error: 'Enter a design idea first.' })
  if (prompt.length > 120) return res.status(400).json({ error: 'Prompt too long (max 120).' })
  const t = prompt.toLowerCase()
  res.json({
    suggestion: {
      motif: pick(t, MOTIF_WORDS, 'floral'),
      palette: pick(t, PALETTE_WORDS, 'cobalt'),
      finish: pick(t, FINISH_WORDS, 'gloss'),
      prompt: prompt.trim(),
    },
  })
})

app.use((_req, res) => res.status(404).json({ error: 'Not found.' }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error.' })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`JingCraft API running on http://localhost:${port}`))