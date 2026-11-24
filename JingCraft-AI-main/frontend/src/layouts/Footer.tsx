
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sparkles, ArrowUpRight, ArrowUp } from 'lucide-react'

function Footer() {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { key: 'home', path: '/' },
    { key: 'museum', path: '/museum' },
    { key: 'designStudio', path: '/design-studio' },
    { key: 'heritage', path: '/heritage' },
    { key: 'about', path: '/about' },
  ] as const

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#142B49] text-white">

      {/* Subtle Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[500px] rounded-full bg-[#66877A]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12">

        {/* Main Footer Content */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white text-[#193C67] shadow-lg shadow-black/10">
                <Sparkles size={22} />
              </div>

              <span className="text-xl font-semibold tracking-tight text-white">
                {t('brand.name')}
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-[#C1CDDB]">
              {t('brand.tagline')}
            </p>

            <p className="max-w-sm text-sm leading-7 text-[#AEBFD2]">
              Exploring Chinese ceramic heritage through digital
              experiences and AI-assisted creativity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#D7C49B]">
              Explore
            </h3>

            <ul className="space-y-4">
              {footerLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-[#C1CDDB] transition-colors duration-300 hover:text-white"
                  >
                    {t(`navigation.${item.key}`)}

                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#D7C49B]">
              Our Vision
            </h3>

            <p className="max-w-sm text-sm leading-7 text-[#C1CDDB]">
              Connecting traditional Chinese craftsmanship with
              modern digital technology to make cultural heritage
              more accessible to the world.
            </p>

            <div className="mt-7 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#66877A]" />
              <span className="text-xs tracking-wide text-[#AEBFD2]">
                PRESERVING HERITAGE · INSPIRING INNOVATION
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/15 pt-6 sm:mt-20">

          {/* Copyright and Back to Top */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-[#AEBFD2]">
              © {currentYear} JingCraft AI. All rights reserved.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-xs font-medium text-white transition-all duration-300 hover:border-[#B69A62] hover:bg-white/5"
            >
              Back to top

              <ArrowUp
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* Oversized Brand Typography */}
        <div
          aria-label="JingCraft"
          className="relative mt-10 overflow-hidden pt-4 sm:mt-12 sm:pt-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-b from-transparent to-[#142B49]"
          />

          <h2 className="select-none whitespace-nowrap text-center text-[clamp(3.1rem,16vw,14rem)] font-bold leading-[0.85] tracking-[-0.075em] text-transparent bg-clip-text bg-gradient-to-b from-[#A9BBD2]/55 via-[#7089AA]/35 to-[#193C67]/5">
            JINGCRAFT
          </h2>
        </div>
      </div>
    </footer>
  )
}

export default Footer
