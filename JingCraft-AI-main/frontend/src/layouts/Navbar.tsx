
import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getSavedUser, logout } from '../api'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Menu,
  X,
  ChevronDown,
  Languages,
  Sparkles,
} from 'lucide-react'

const navigationItems = [
  { key: 'home', path: '/' },
  { key: 'museum', path: '/museum' },
  { key: 'designStudio', path: '/design-studio' },
  { key: 'heritage', path: '/heritage' },
  { key: 'about', path: '/about' },
] as const

function Navbar() {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  useLocation()
    const navigate = useNavigate()
    const user = getSavedUser()

  const currentLanguage = i18n.language.startsWith('zh')
    ? 'zh-CN'
    : 'en'

  const changeLanguage = async (language: 'en' | 'zh-CN') => {
    await i18n.changeLanguage(language)
    window.localStorage.setItem('jingcraft-language', language)
    setLanguageMenuOpen(false)
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary'
        : 'text-ink/70 hover:text-primary'
    }`

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label="JingCraft AI Home"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white transition-transform duration-300 group-hover:scale-105">
            <Sparkles size={21} strokeWidth={1.7} />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight tracking-tight text-ink">
              {t('brand.name')}
            </span>
            <span className="hidden text-[10px] tracking-[0.12em] text-muted sm:block">
              {t('brand.tagline')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navigationItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={navLinkClasses}
            >
              {({ isActive }) => (
                <>
                  {t(`navigation.${item.key}`)}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute -bottom-[27px] left-0 h-[2px] w-full bg-accent"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="text-sm font-medium text-ink/80">{user.name}</span>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/70"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Log in
            </Link>
          )}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageMenuOpen((open) => !open)}
              aria-expanded={languageMenuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/70"
            >
              <Languages size={17} />
              <span>
                {currentLanguage === 'en' ? 'EN' : '中文'}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  languageMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {languageMenuOpen && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-border bg-white p-1 shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage('en')}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-porcelain ${
                      currentLanguage === 'en'
                        ? 'font-semibold text-primary'
                        : 'text-ink'
                    }`}
                  >
                    English
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage('zh-CN')}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-porcelain ${
                      currentLanguage === 'zh-CN'
                        ? 'font-semibold text-primary'
                        : 'text-ink'
                    }`}
                  >
                    简体中文
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-white/70 lg:hidden"
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col px-5 py-5 sm:px-8">
              <div className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/5 text-primary'
                          : 'text-ink/75 hover:bg-white/70 hover:text-primary'
                      }`
                    }
                  >
                    {t(`navigation.${item.key}`)}
                  </NavLink>
                ))}
              </div>

              <div className="my-4 border-t border-border" />

              <div className="flex items-center justify-between px-4">
                <span className="flex items-center gap-2 text-sm text-muted">
                  <Languages size={17} />
                  Language
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    aria-pressed={currentLanguage === 'en'}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      currentLanguage === 'en'
                        ? 'bg-primary text-white'
                        : 'bg-white text-ink'
                    }`}
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage('zh-CN')}
                    aria-pressed={currentLanguage === 'zh-CN'}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      currentLanguage === 'zh-CN'
                        ? 'bg-primary text-white'
                        : 'bg-white text-ink'
                    }`}
                  >
                    中文
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
