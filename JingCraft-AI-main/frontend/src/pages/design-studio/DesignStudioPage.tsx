import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { motion } from 'motion/react'
import { Check, Download, RotateCcw, Sparkles, WandSparkles, ZoomIn, ZoomOut, Bookmark, Trash2, Play, Pause } from 'lucide-react'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { createDesign, deleteDesign, getToken, listDesigns, previewConcept } from '../../api'

type Motif = 'dragon' | 'floral' | 'cloud' | 'lotus' | 'bamboo' | 'peony'
type Palette = 'cobalt' | 'jade' | 'rose' | 'gold'
type Finish = 'gloss' | 'satin' | 'matte'
type Vessel = 'vase' | 'teacup' | 'plate' | 'noodleBowl'

const vessels: { id: Vessel; name: string; description: string }[] = [
  { id: 'vase', name: 'Classic Vase', description: 'Traditional decorative porcelain vase' },
  { id: 'teacup', name: 'Tea Cup', description: 'Small cup with a curved handle' },
  { id: 'plate', name: 'Rice Plate', description: 'Wide, shallow serving plate' },
  { id: 'noodleBowl', name: 'Noodle Bowl', description: 'Deep bowl for noodles and soup' },
]

type SavedDesign = {
  id: string
  name: string
  motif: Motif
  vessel: Vessel
  palette: Palette
  finish: Finish
  prompt: string
  createdAt: string
}

const motifs: { id: Motif; name: string; chinese: string; description: string; category: string }[] = [
  { id: 'dragon', name: 'Azure Dragon', chinese: '青龙纹', description: 'A flowing dragon-inspired ornament in classic cobalt blue.', category: 'Heritage' },
  { id: 'floral', name: 'Blue Blossom', chinese: '缠枝花卉', description: 'Delicate blossoms and scrolling vines inspired by porcelain.', category: 'Botanical' },
  { id: 'cloud', name: 'Cloud Scroll', chinese: '祥云纹', description: 'Rhythmic cloud forms inspired by traditional decorative borders.', category: 'Heritage' },
  { id: 'lotus', name: 'Lotus Bloom', chinese: '莲花纹', description: 'A serene lotus motif symbolising purity and harmony.', category: 'Botanical' },
  { id: 'bamboo', name: 'Bamboo Garden', chinese: '竹纹', description: 'Elegant bamboo stems and leaves with a quiet natural rhythm.', category: 'Botanical' },
  { id: 'peony', name: 'Royal Peony', chinese: '牡丹纹', description: 'Layered peonies inspired by the richness of Chinese decorative arts.', category: 'Botanical' },
]

const palettes: { id: Palette; name: string; main: string; light: string; accent: string }[] = [
  { id: 'cobalt', name: 'Imperial Cobalt', main: '#193C67', light: '#9DB8C7', accent: '#B69A62' },
  { id: 'jade', name: 'Celadon Jade', main: '#66877A', light: '#C5D5C8', accent: '#B69A62' },
  { id: 'rose', name: 'Rose Porcelain', main: '#985D62', light: '#E8C9C5', accent: '#B69A62' },
  { id: 'gold', name: 'Antique Gold', main: '#A27B3F', light: '#E5D5AE', accent: '#66877A' },
]

const finishes: { id: Finish; name: string; description: string; roughness: number }[] = [
  { id: 'gloss', name: 'Gloss', description: 'Polished reflective glaze', roughness: 0.18 },
  { id: 'satin', name: 'Satin', description: 'Soft, elegant sheen', roughness: 0.38 },
  { id: 'matte', name: 'Matte', description: 'Quiet contemporary finish', roughness: 0.68 },
]

function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, gold: string, scale = 1) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.strokeStyle = color
  ctx.fillStyle = '#E7E9DF'
  ctx.lineWidth = 6
  for (let i = 0; i < 8; i++) {
    ctx.save()
    ctx.rotate(i * Math.PI / 4)
    ctx.beginPath()
    ctx.ellipse(0, -28, 15, 31, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(0, 0, 12, 0, Math.PI * 2)
  ctx.fillStyle = gold
  ctx.fill()
  ctx.restore()
}

function createTexture(motif: Motif, palette: Palette, prompt = '') {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!
  const colors = palettes.find(item => item.id === palette)!
  const blue = colors.main
  const light = colors.light
  const gold = colors.accent

  ctx.fillStyle = '#F8F5ED'
  ctx.fillRect(0, 0, 1024, 1024)
  ctx.strokeStyle = gold
  ctx.lineWidth = 8
  ctx.strokeRect(22, 22, 980, 980)
  ctx.strokeStyle = blue
  ctx.lineWidth = 3
  ctx.strokeRect(42, 42, 940, 940)

  if (motif === 'dragon') {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        ctx.save()
        ctx.translate(170 + col * 345, 145 + row * 235)
        ctx.rotate(row % 2 ? 0.14 : -0.12)
        ctx.strokeStyle = blue
        ctx.fillStyle = light
        ctx.lineWidth = 12
        ctx.beginPath()
        ctx.moveTo(-95, 25)
        ctx.bezierCurveTo(-140, -90, 15, -125, 70, -40)
        ctx.bezierCurveTo(125, 20, 20, 110, -45, 48)
        ctx.bezierCurveTo(-5, 10, 45, 25, 40, 60)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(82, -43, 19, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(91, -58)
        ctx.lineTo(128, -87)
        ctx.lineTo(113, -48)
        ctx.moveTo(72, -60)
        ctx.lineTo(60, -91)
        ctx.lineTo(94, -66)
        ctx.stroke()
        ctx.restore()
      }
    }
  } else if (motif === 'floral' || motif === 'peony' || motif === 'lotus') {
    const step = motif === 'peony' ? 270 : 310
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const x = 125 + col * step + (row % 2) * 45
        const y = 140 + row * 245
        drawFlower(ctx, x, y, blue, gold, motif === 'peony' ? 1.25 : motif === 'lotus' ? 0.9 : 0.75)
        ctx.strokeStyle = blue
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(x, y + 35)
        ctx.bezierCurveTo(x + 45, y + 95, x - 45, y + 125, x + 5, y + 175)
        ctx.stroke()
        if (motif === 'lotus') {
          ctx.beginPath()
          ctx.ellipse(x + 65, y + 105, 22, 48, 0.8, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }
  } else if (motif === 'cloud') {
    for (let row = 0; row < 8; row++) {
      const y = 95 + row * 125
      ctx.strokeStyle = row % 2 ? light : blue
      ctx.lineWidth = 10
      for (let col = -1; col < 5; col++) {
        const x = col * 250
        ctx.beginPath()
        ctx.moveTo(x, y + 25)
        ctx.bezierCurveTo(x + 25, y - 45, x + 90, y - 45, x + 105, y + 20)
        ctx.bezierCurveTo(x + 120, y + 75, x + 190, y + 65, x + 195, y + 10)
        ctx.bezierCurveTo(x + 205, y - 35, x + 250, y - 30, x + 260, y + 20)
        ctx.stroke()
      }
    }
  } else {
    for (let col = 0; col < 7; col++) {
      const x = 95 + col * 140
      ctx.strokeStyle = blue
      ctx.lineWidth = 12
      ctx.beginPath()
      ctx.moveTo(x, 80)
      ctx.bezierCurveTo(x - 45, 320, x + 45, 650, x - 5, 950)
      ctx.stroke()
      for (let row = 0; row < 5; row++) {
        const y = 180 + row * 155
        ctx.beginPath()
        ctx.ellipse(x + (row % 2 ? 45 : -45), y, 22, 75, row % 2 ? -0.7 : 0.7, 0, Math.PI * 2)
        ctx.fillStyle = light
        ctx.fill()
        ctx.stroke()
      }
    }
  }

  if (prompt.trim()) {
    ctx.fillStyle = 'rgba(248,245,237,0.94)'
    ctx.fillRect(100, 875, 824, 72)
    ctx.fillStyle = blue
    ctx.font = 'bold 27px Georgia'
    ctx.textAlign = 'center'
    ctx.fillText(`Concept · ${prompt.trim().slice(0, 38)}`, 512, 920)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.anisotropy = 8
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function MotifArtwork({ motif, color }: { motif: Motif; color: string }) {
  return (
    <svg viewBox="0 0 180 92" className="h-full w-full" aria-hidden="true">
      <rect width="180" height="92" rx="9" fill="#F2EEE5" />
      <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {motif === 'dragon' && (
          <>
            <path d="M15 49 C22 15 58 13 68 37 C77 59 48 75 34 56 C23 41 45 31 55 42" />
            <path d="M54 29 L68 18 L65 36 M48 26 L45 13 L59 27" />
            <path d="M86 49 C93 15 129 13 139 37 C148 59 119 75 105 56 C94 41 116 31 126 42" />
            <path d="M125 29 L139 18 L136 36 M119 26 L116 13 L130 27" />
          </>
        )}
        {(motif === 'floral' || motif === 'lotus' || motif === 'peony') && [0, 1, 2].map((v) => (
          <g key={v} transform={`translate(${36 + v * 54} 45) scale(${motif === 'peony' ? 0.9 : 0.72})`}>
            {Array.from({ length: motif === 'lotus' ? 5 : 8 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-17" rx="7" ry="14" transform={`rotate(${i * (motif === 'lotus' ? 72 : 45)})`} />
            ))}
            <circle r="5" fill="#B69A62" stroke="none" />
          </g>
        ))}
        {motif === 'cloud' && [0, 1, 2].map((v) => (
          <path key={v} d={`M${8 + v * 57} 52 C${14 + v * 57} 25 ${34 + v * 57} 25 ${40 + v * 57} 48 C${46 + v * 57} 68 ${67 + v * 57} 64 ${69 + v * 57} 43`} />
        ))}
        {motif === 'bamboo' && [0, 1, 2].map((v) => (
          <g key={v}>
            <path d={`M${30 + v * 58} 10 Q${22 + v * 58} 45 ${34 + v * 58} 82`} />
            <path d={`M${30 + v * 58} 34 q-20 -22 -25 -8 q8 18 25 8 M${31 + v * 58} 52 q22 -22 27 -8 q-8 18 -27 8`} />
          </g>
        ))}
      </g>
    </svg>
  )
}

function CeramicVase({ vessel, motif, palette, prompt, finish }: { vessel: Vessel; motif: Motif; palette: Palette; prompt: string; finish: Finish }) {
  const geometry = useMemo(() => {
    const profiles: Record<Vessel, [number, number][]> = {
      vase: [
        [0, 0.08], [0.42, 0.08], [0.66, 0.18], [0.82, 0.48],
        [0.9, 0.92], [0.86, 1.35], [0.7, 1.78], [0.48, 2.12],
        [0.38, 2.38], [0.4, 2.58], [0.48, 2.62], [0.48, 2.72],
        [0.3, 2.74], [0.3, 2.58], [0.32, 2.35], [0.45, 2.08],
        [0.66, 1.72], [0.78, 1.32], [0.8, 0.92], [0.7, 0.52],
        [0.54, 0.28], [0, 0.22],
      ],
      teacup: [
        [0, 0.12], [0.48, 0.12], [0.58, 0.2], [0.68, 0.48],
        [0.72, 0.95], [0.7, 1.12], [0.62, 1.12], [0.58, 0.94],
        [0.52, 0.48], [0.42, 0.3], [0, 0.28],
      ],
      plate: [
        [0, 0.18], [0.42, 0.18], [0.82, 0.2], [1.12, 0.25],
        [1.28, 0.34], [1.32, 0.43], [1.26, 0.49], [1.16, 0.42],
        [0.98, 0.34], [0.68, 0.29], [0.3, 0.28], [0, 0.28],
      ],
      noodleBowl: [
        [0, 0.12], [0.48, 0.12], [0.78, 0.2], [1.02, 0.42],
        [1.12, 0.78], [1.1, 1.08], [1.02, 1.12], [0.94, 0.96],
        [0.88, 0.68], [0.7, 0.42], [0.42, 0.3], [0, 0.28],
      ],
    }
    const geometry = new THREE.LatheGeometry(
      profiles[vessel].map(([radius, height]) => new THREE.Vector2(radius, height)),
      160,
    )
    geometry.computeVertexNormals()
    return geometry
  }, [vessel])
  const texture = useMemo(() => createTexture(motif, palette, prompt), [motif, palette, prompt])

  // Release replaced GPU textures when the selected design changes or the page unmounts.
  useEffect(() => {
    return () => texture.dispose()
  }, [texture])
  const finishSettings = finishes.find(item => item.id === finish)!
  const objectOffset = vessel === 'vase' ? -1.38 : vessel === 'plate' ? -1.58 : -1.52
  return (
    <group position={[0, objectOffset, 0]}>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial
          map={texture}
          color="#FFFFFF"
          roughness={finishSettings.roughness}
          metalness={0}
          clearcoat={finish === 'gloss' ? 1 : finish === 'satin' ? 0.65 : 0.2}
          clearcoatRoughness={finish === 'gloss' ? 0.1 : finish === 'satin' ? 0.24 : 0.42}
          envMapIntensity={finish === 'gloss' ? 1.35 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {vessel === 'vase' && <>
        <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.48, 0.045, 12, 96]} />
          <meshStandardMaterial color="#B69A62" />
        </mesh>
        <mesh position={[0, 2.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.39, 0.025, 10, 96]} />
          <meshStandardMaterial color="#B69A62" />
        </mesh>
      </>}
      {vessel === 'teacup' && (
        <mesh position={[0.68, 0.82, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.34, 0.075, 18, 64, Math.PI * 1.8]} />
          <meshPhysicalMaterial color="#F8F5ED" roughness={finishSettings.roughness} clearcoat={0.8} />
        </mesh>
      )}
    </group>
  )
}

function Scene({ vessel, motif, palette, prompt, finish, autoRotate, controlsRef }: { vessel: Vessel; motif: Motif; palette: Palette; prompt: string; finish: Finish; autoRotate: boolean; controlsRef: RefObject<OrbitControlsImpl | null> }) {
  return (
    <>
      <color attach="background" args={['#F2EFE7']} />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={['#FFFDF8', '#B7B0A2', 1.35]} />
      <directionalLight position={[4, 7, 5]} intensity={2.6} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 3, -4]} intensity={1.35} color="#D7E6E9" />
      <spotLight position={[0, 6, 3]} angle={0.42} penumbra={0.8} intensity={1.15} color="#FFF5E5" />
      <Environment preset="studio" />
      <CeramicVase vessel={vessel} motif={motif} palette={palette} prompt={prompt} finish={finish} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <circleGeometry args={[3.4, 96]} />
        <meshStandardMaterial color="#E8E3D8" roughness={0.96} />
      </mesh>
      <ContactShadows position={[0, -1.385, 0]} opacity={0.28} scale={4.8} blur={2.8} far={2.2} />
      <OrbitControls ref={controlsRef} makeDefault target={[0, -0.05, 0]} enablePan={false} enableZoom minDistance={3.7} maxDistance={8.5} enableDamping dampingFactor={0.07} autoRotate={autoRotate} autoRotateSpeed={0.3} />
    </>
  )
}

export default function DesignStudioPage() {
  const [vessel, setVessel] = useState<Vessel>('vase')
  const [motif, setMotif] = useState<Motif>('dragon')
  const [palette, setPalette] = useState<Palette>('cobalt')
  const [finish, setFinish] = useState<Finish>('gloss')
  const [prompt, setPrompt] = useState('')
  const [appliedPrompt, setAppliedPrompt] = useState('')
  const [sceneKey, setSceneKey] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const [status, setStatus] = useState('Your creative workspace is ready.')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<'All' | 'Heritage' | 'Botanical'>('All')
  const [designName, setDesignName] = useState('')
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([])

  useEffect(() => {
    if (!getToken()) return
    listDesigns()
      .then(items => setSavedDesigns(items as SavedDesign[]))
      .catch(() => setStatus('Could not load your saved designs.'))
  }, [])
  const selected = motifs.find(item => item.id === motif)!
  const visibleMotifs = motifs.filter(item => category === 'All' || item.category === category)

  async function previewPrompt() {
    if (!prompt.trim()) {
      setStatus('Please enter a short design idea first.')
      return
    }
    setLoading(true)
    setStatus('Composing your ceramic concept…')
    try {
      const suggestion = await previewConcept(prompt.trim())
      setMotif(suggestion.motif as Motif)
      setPalette(suggestion.palette as Palette)
      setFinish(suggestion.finish as Finish)
      setAppliedPrompt(suggestion.prompt)
      setStatus('Your concept preview is ready. It is matched from your keywords, not generated by AI.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not create the concept preview.')
    } finally {
      setLoading(false)
    }
  }

  async function saveCurrentDesign() {
    if (!getToken()) {
      setStatus('Please log in to save your designs.')
      return
    }
    try {
      const saved = await createDesign({
        name: designName.trim() || `${selected.name} Study`,
        motif,
        vessel,
        palette,
        finish,
        prompt: appliedPrompt || prompt.trim(),
      })
      setSavedDesigns(prev => [saved as SavedDesign, ...prev])
      setDesignName('')
      setStatus(`“${saved.name}” has been saved to your account.`)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not save your design.')
    }
  }

  async function removeSavedDesign(id: string) {
    try {
      await deleteDesign(id)
      setSavedDesigns(prev => prev.filter(item => item.id !== id))
      setStatus('Saved design removed.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Could not remove the design.')
    }
  }

  function loadSavedDesign(item: SavedDesign) {
    setMotif(item.motif)
    setVessel(item.vessel || 'vase')
    setPalette(item.palette)
    setFinish(item.finish)
    setPrompt(item.prompt)
    setAppliedPrompt(item.prompt)
    setStatus(`“${item.name}” loaded into the studio.`)
  }

  // Export the selected motif, palette, and applied prompt as a PNG pattern.
  function downloadPattern() {
    try {
      const texture = createTexture(motif, palette, appliedPrompt)
      const canvas = texture.image as HTMLCanvasElement
      const link = document.createElement('a')

      link.href = canvas.toDataURL('image/png')
      link.download = `jingcraft-${motif}-${palette}.png`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      texture.dispose()
      setStatus('Your ceramic pattern has been downloaded successfully.')
    } catch {
      setStatus('The pattern could not be downloaded. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F2E9] text-[#202A35]">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex flex-col justify-between gap-5 border-b border-[#DCD6C9] pb-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A7845]"><Sparkles size={13} /> JingCraft AI · Creative Atelier</div>
            <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#193C67] sm:text-5xl lg:text-6xl">The Art of <span className="italic text-[#66877A]">Creation.</span></h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#69727A] sm:text-base">Explore the beauty of Chinese ceramic artistry. Select a traditional motif, shape your idea, and bring your design to life in 3D.</p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-[#D8D0C1] bg-[#FBF9F4] px-4 py-2.5 text-xs text-[#65717D] md:self-auto"><span className="h-2 w-2 rounded-full bg-[#66877A]" /> Interactive design preview</div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.85fr)]">
          <section className="overflow-hidden rounded-3xl border border-[#E2DDD2] bg-[#F2EFE7] shadow-xl shadow-[#2A3136]/5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DED9CE] bg-[#FBF9F4]/80 px-5 py-4 sm:px-7">
              <div><p className="font-serif text-lg text-[#193C67]">Your ceramic canvas</p><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8A8D89]">3D studio · Live surface preview</p></div>
              <div className="flex items-center gap-2 text-[10px] text-[#737B7D]"><RotateCcw size={13} /> Drag to rotate <ZoomIn size={13} /> Scroll to zoom</div>
            </div>
            <div className="relative h-[390px] sm:h-[500px] lg:h-[590px]">
              <Canvas key={sceneKey} camera={{ position: [4.1, 2.2, 5.4], fov: 36 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, powerPreference: 'high-performance' }}>
                <Scene vessel={vessel} motif={motif} palette={palette} prompt={appliedPrompt} finish={finish} autoRotate={autoRotate} controlsRef={controlsRef} />
              </Canvas>
              <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/70 bg-[#FBF9F4]/90 p-1.5 shadow-sm backdrop-blur sm:right-6 sm:top-6">
                <button type="button" onClick={() => setAutoRotate(value => !value)} aria-label={autoRotate ? 'Pause automatic rotation' : 'Start automatic rotation'} title={autoRotate ? 'Pause rotation' : 'Start rotation'} className="rounded-full p-2 text-[#193C67] transition hover:bg-[#EAE6DC]">{autoRotate ? <Pause size={14} /> : <Play size={14} />}</button>
                <button type="button" onClick={() => { controlsRef.current?.dollyIn(1.2); controlsRef.current?.update() }} aria-label="Zoom in" title="Zoom in" className="rounded-full p-2 text-[#193C67] transition hover:bg-[#EAE6DC]"><ZoomIn size={14} /></button>
                <button type="button" onClick={() => { controlsRef.current?.dollyOut(1.2); controlsRef.current?.update() }} aria-label="Zoom out" title="Zoom out" className="rounded-full p-2 text-[#193C67] transition hover:bg-[#EAE6DC]"><ZoomOut size={14} /></button>
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="rounded-xl border border-white/70 bg-[#FBF9F4]/90 px-4 py-3 shadow-sm backdrop-blur"><p className="text-[9px] uppercase tracking-[0.2em] text-[#8C806D]">Current ceramic form</p><p className="mt-1 font-serif text-base text-[#193C67]">{vessels.find(item => item.id === vessel)?.name}</p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#8C806D]">Selected motif</p><p className="font-serif text-sm text-[#193C67]">{selected.name}</p><p className="text-[10px] text-[#7B817F]">{selected.chinese}</p></div>
                <span className="rounded-full border border-white/70 bg-[#FBF9F4]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-widest text-[#52636B]">JingCraft · 3D</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DED9CE] bg-[#FBF9F4]/70 px-5 py-4 sm:px-7">
              <p className="text-xs text-[#7A817F]">Interactive parametric ceramic study.</p>
              <button type="button" onClick={() => { setAutoRotate(true); setSceneKey(key => key + 1) }} className="inline-flex items-center gap-2 rounded-full border border-[#D8D0C1] px-4 py-2 text-xs font-semibold text-[#193C67] transition hover:border-[#193C67] hover:bg-white"><RotateCcw size={13} /> Reset view</button>
            </div>
          </section>

          <aside className="rounded-3xl border border-[#E2DDD2] bg-[#FBF9F4] p-5 shadow-xl shadow-[#2A3136]/5 sm:p-7">
            <div className="mb-6"><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7845]"><WandSparkles size={13} /> Design controls</div><h2 className="font-serif text-2xl text-[#193C67]">Create your own story.</h2><p className="mt-2 text-xs leading-6 text-[#7A817F]">Combine traditional motifs, colour palettes, and ceramic finishes to shape your own concept.</p></div>

            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">01 · Choose ceramic form</p>
              <span className="text-[10px] text-[#A19A8D]">4 forms</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {vessels.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setVessel(item.id); setStatus(`${item.name} selected for your 3D design.`) }}
                  aria-pressed={vessel === item.id}
                  className={`rounded-xl border px-3 py-3 text-left transition ${vessel === item.id ? 'border-[#193C67] bg-[#F0F1EB] ring-1 ring-[#193C67]/10' : 'border-[#E5E0D6] bg-white hover:border-[#AEBBB4]'}`}
                >
                  <span className="block text-xs font-semibold text-[#344451]">{item.name}</span>
                  <span className="mt-1 block text-[9px] leading-4 text-[#929188]">{item.description}</span>
                  {vessel === item.id && <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-[#193C67]"><Check size={10} /> Selected</span>}
                </button>
              ))}
            </div>

            <div className="my-5 border-t border-[#E8E2D8]" />
            <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">02 · Choose a motif</p><span className="text-[10px] text-[#A19A8D]">6 designs</span></div>
            <div className="mb-3 flex flex-wrap gap-2">
              {(['All', 'Heritage', 'Botanical'] as const).map(item => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${category === item ? 'bg-[#193C67] text-white' : 'border border-[#E2DDD2] bg-white text-[#778079] hover:border-[#66877A]'}`}>{item}</button>)}
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {visibleMotifs.map(item => {
                const active = motif === item.id
                const swatchColor = palettes.find(p => p.id === palette)!.main
                return <button key={item.id} type="button" onClick={() => { setMotif(item.id); setAppliedPrompt(''); setStatus(`${item.name} applied to the 3D vase.`) }} aria-pressed={active} className={`overflow-hidden rounded-xl border bg-white text-left transition duration-200 hover:-translate-y-0.5 ${active ? 'border-[#193C67] ring-2 ring-[#193C67]/10' : 'border-[#E5E0D6] hover:border-[#AEBBB4]'}`}>
                  <div className="relative h-[76px] p-1.5"><MotifArtwork motif={item.id} color={swatchColor} />{active && <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#193C67] text-white"><Check size={11} /></span>}</div>
                  <div className="px-2.5 pb-2.5 pt-1"><span className="block truncate text-[10px] font-semibold text-[#344451]">{item.name}</span><span className="mt-0.5 block text-[9px] text-[#9A978F]">{item.chinese}</span></div>
                </button>
              })}
            </div>
            <p className="mt-3 min-h-9 text-xs leading-5 text-[#7A817F]">{selected.description}</p>

            <div className="my-5 border-t border-[#E8E2D8]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">03 · Choose a colour palette</p>
            <div className="grid grid-cols-2 gap-2">
              {palettes.map(item => <button key={item.id} type="button" onClick={() => { setPalette(item.id); setStatus(`${item.name} palette applied.`) }} className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-left transition ${palette === item.id ? 'border-[#193C67] ring-1 ring-[#193C67]/10' : 'border-[#E5E0D6] hover:border-[#AEBBB4]'}`}><span className="flex shrink-0 -space-x-1"><span className="h-4 w-4 rounded-full border border-white" style={{ background: item.main }} /><span className="h-4 w-4 rounded-full border border-white" style={{ background: item.light }} /><span className="h-4 w-4 rounded-full border border-white" style={{ background: item.accent }} /></span><span className="truncate text-[10px] font-medium text-[#52606A]">{item.name}</span></button>)}
            </div>

            <div className="my-5 border-t border-[#E8E2D8]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">04 · Ceramic finish</p>
            <div className="grid grid-cols-3 gap-2">
              {finishes.map(item => <button key={item.id} type="button" onClick={() => { setFinish(item.id); setStatus(`${item.name} ceramic finish applied.`) }} className={`rounded-xl border px-2 py-3 text-center transition ${finish === item.id ? 'border-[#193C67] bg-[#F0F1EB]' : 'border-[#E5E0D6] bg-white hover:border-[#AEBBB4]'}`}><span className="mx-auto mb-2 block h-6 w-6 rounded-full border border-[#CFC8B9] bg-gradient-to-br from-white to-[#D7D0C2]" style={{ opacity: item.id === 'matte' ? 0.65 : 1 }} /><span className="block text-[10px] font-semibold text-[#344451]">{item.name}</span><span className="mt-0.5 block text-[8px] text-[#9A978F]">{item.description}</span></button>)}
            </div>

            <div className="my-5 border-t border-[#E8E2D8]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">05 · Describe your idea</p>
            <label htmlFor="design-prompt" className="mb-2 block text-xs text-[#737B7D]">Add a personal creative direction</label>
            <textarea id="design-prompt" value={prompt} onChange={event => setPrompt(event.target.value)} rows={3} maxLength={120} placeholder="e.g. Lotus flowers with delicate gold details…" className="w-full resize-none rounded-xl border border-[#DED9CE] bg-white px-4 py-3 text-xs leading-6 text-[#344451] outline-none transition placeholder:text-[#B0ACA3] focus:border-[#66877A] focus:ring-2 focus:ring-[#66877A]/10" />
            <div className="mt-1 flex justify-between text-[10px] text-[#A19A8D]"><span>Describe your creative direction</span><span>{prompt.length}/120</span></div>
            <button type="button" disabled={loading} onClick={previewPrompt} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#193C67] px-5 py-3.5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#193C67]/15 transition hover:-translate-y-0.5 hover:bg-[#244E68] disabled:cursor-wait disabled:opacity-70"><Sparkles size={14} />{loading ? 'Creating concept…' : 'Preview my concept'}</button>
            <button
              type="button"
              onClick={downloadPattern}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#D8D0C1] bg-white px-5 py-3 text-xs font-semibold text-[#193C67] transition hover:border-[#193C67] hover:bg-[#F0F1EB]"
            >
              <Download size={14} />
              Download ceramic pattern
            </button>
            <p className="mt-2 text-[10px] leading-5 text-[#A19A8D]">Local illustrative demo preview. Real AI generation can be connected in a future phase.</p>

            <div className="my-5 border-t border-[#E8E2D8]" />
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">06 · Save your design</p>
              <span className="text-[10px] text-[#A19A8D]">{savedDesigns.length}/8 saved</span>
            </div>
            <input
              type="text"
              value={designName}
              onChange={event => setDesignName(event.target.value)}
              maxLength={36}
              placeholder={`${selected.name} Study`}
              aria-label="Design name"
              className="w-full rounded-xl border border-[#DED9CE] bg-white px-4 py-3 text-xs text-[#344451] outline-none transition placeholder:text-[#B0ACA3] focus:border-[#66877A] focus:ring-2 focus:ring-[#66877A]/10"
            />
            <button
              type="button"
              onClick={saveCurrentDesign}
              disabled={savedDesigns.length >= 8}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#66877A] bg-[#EDF1EA] px-5 py-3 text-xs font-semibold text-[#456B5C] transition hover:bg-[#E2EADF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={14} /> Save my design
            </button>
            {savedDesigns.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8D89]">Saved designs</p>
                {savedDesigns.map(item => (
                  <div key={item.id} className="flex items-center gap-2 rounded-xl border border-[#E8E2D8] bg-white px-3 py-2.5">
                    <button type="button" onClick={() => loadSavedDesign(item)} className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-xs font-semibold text-[#344451]">{item.name}</span>
                      <span className="mt-0.5 block truncate text-[10px] text-[#929188]">
                        {vessels.find(v => v.id === item.vessel)?.name || 'Classic Vase'} · {motifs.find(m => m.id === item.motif)?.name} · {palettes.find(p => p.id === item.palette)?.name} · {item.finish}
                      </span>
                    </button>
                    <button type="button" onClick={() => removeSavedDesign(item.id)} aria-label={`Delete ${item.name}`} className="rounded-full p-2 text-[#9B8178] transition hover:bg-[#F7EEEA] hover:text-[#8A4438]">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 rounded-xl border border-[#E5E0D6] bg-[#F4F1E9] p-4" aria-live="polite"><div className="flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4E9E0] text-[#66877A]"><Sparkles size={13} /></span><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#65716D]">Studio status</p><p className="mt-1 text-xs leading-5 text-[#69727A]">{status}</p></div></div></div>
            <div className="mt-5 rounded-2xl border border-[#DCD6C9] bg-white/80 p-4">
              <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#68727B]">Design summary</p><span className="rounded-full bg-[#EDF1EA] px-2.5 py-1 text-[9px] font-semibold text-[#66877A]">Live</span></div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-[9px] uppercase tracking-wider text-[#A19A8D]">Motif</p><p className="mt-1 font-semibold text-[#344451]">{vessels.find(item => item.id === vessel)?.name}</p><p className="mt-1 font-semibold text-[#344451]">{selected.name}</p></div>
                <div><p className="text-[9px] uppercase tracking-wider text-[#A19A8D]">Palette</p><p className="mt-1 font-semibold text-[#344451]">{palettes.find(item => item.id === palette)?.name}</p></div>
                <div><p className="text-[9px] uppercase tracking-wider text-[#A19A8D]">Finish</p><p className="mt-1 font-semibold capitalize text-[#344451]">{finish}</p></div>
                <div><p className="text-[9px] uppercase tracking-wider text-[#A19A8D]">Prompt</p><p className="mt-1 truncate font-semibold text-[#344451]">{appliedPrompt || 'No prompt applied'}</p></div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E8E2D8] pt-5 text-[10px] text-[#9A978F]"><span>Concept workspace · Prototype</span><span className="text-[#66877A]">● Ready</span></div>
          </aside>
        </div>
      </section>
    </main>
  )
}
