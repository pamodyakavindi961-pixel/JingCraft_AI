
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

const collections = [
  {
    key: 'tang',
    image: '/images/museum/tang-sancai.jpg',
    alt: 'Traditional Tang Dynasty Sancai ceramic pottery',
    number: '01',
    accent: '#B69A62',
  },
  {
    key: 'celadon',
    image: '/images/museum/song-celadon.jpg',
    alt: 'Traditional Song Dynasty celadon ceramic',
    number: '02',
    accent: '#66877A',
  },
  {
    key: 'blueWhite',
    image: '/images/museum/blue-white.jpg',
    alt: 'Traditional Chinese blue and white porcelain',
    number: '03',
    accent: '#193C67',
  },
  {
    key: 'familleRose',
    image: '/images/museum/famille-rose.jpg',
    alt: 'Traditional Qing Dynasty famille rose porcelain',
    number: '04',
    accent: '#B69A62',
  },
] as const

function MuseumPage() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <main className="overflow-hidden bg-[#F5F2E9]">

      {/* =====================================================
          1. MUSEUM HERO SECTION
      ====================================================== */}
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#F5F2E9] py-20 sm:py-24 lg:py-28">

        {/* Background Decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 size-[420px] rounded-full bg-[#66877A]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 size-[420px] rounded-full bg-[#B69A62]/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">

          {/* Hero Content */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#B69A62]/30 bg-white/70 px-4 py-2.5">
              <Sparkles size={15} className="text-[#B69A62]" />

              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#193C67] sm:text-xs">
                {t('museumPage.eyebrow')}
              </span>
            </div>

            <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.2] tracking-tight text-[#193C67] sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('museumPage.title')}
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-8 text-[#747B84] sm:text-base sm:leading-9">
              {t('museumPage.description')}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/museum"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#193C67] px-7 py-4 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#244D7D]"
              >
                {t('museumPage.exploreButton')}

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/heritage"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#193C67]/20 bg-white/60 px-7 py-4 text-sm font-semibold text-[#193C67] transition-all duration-300 hover:-translate-y-1 hover:border-[#193C67] hover:bg-white"
              >
                {t('museumPage.heritageButton')}
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4 border-t border-[#193C67]/10 pt-7">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#66877A]/10 text-[#66877A]">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-[#B69A62]">
                  JINGCRAFT AI
                </p>

                <p className="mt-1 text-xs text-[#747B84]">
                  {t('brand.tagline')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Museum Visual */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_48%_16px_16px] border border-[#B69A62]/30 bg-gradient-to-br from-[#DCE6E9] via-[#EAE5D8] to-[#D5DFDF] shadow-xl">

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B69A62]/40"
              />

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#193C67]/15"
              />

              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -10, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 360 440"
                  className="relative z-10 h-[78%] w-auto drop-shadow-2xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Chinese blue and white porcelain vase illustration"
                >
                  <defs>
                    <linearGradient
                      id="museumPorcelain"
                      x1="70"
                      y1="50"
                      x2="290"
                      y2="400"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFFFFF" />
                      <stop offset="0.5" stopColor="#E9EEF0" />
                      <stop offset="1" stopColor="#C5D5DF" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M145 44 L215 44 L219 108 C220 130 238 145 252 171 C272 208 280 263 270 318 C264 356 238 380 180 384 C122 380 96 356 90 318 C80 263 88 208 108 171 C122 145 140 130 141 108 Z"
                    fill="url(#museumPorcelain)"
                    stroke="#A8B8C3"
                    strokeWidth="2"
                  />

                  <path
                    d="M140 43 Q180 34 220 43 L217 55 Q180 62 143 55 Z"
                    fill="#D7E2E7"
                    stroke="#A8B8C3"
                    strokeWidth="2"
                  />

                  <path
                    d="M145 43 Q180 35 215 43"
                    stroke="#193C67"
                    strokeWidth="3"
                  />

                  <g
                    stroke="#193C67"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M113 233 Q180 200 247 233" />
                    <path d="M107 265 Q180 231 253 265" opacity="0.7" />

                    <path d="M145 210 Q128 190 145 175 Q163 191 145 210Z" />
                    <path d="M180 202 Q164 180 180 164 Q196 180 180 202Z" />
                    <path d="M215 210 Q198 190 215 175 Q232 191 215 210Z" />

                    <path d="M180 214 C158 236 150 248 180 258 C210 248 202 236 180 214Z" />
                    <path d="M180 214 L180 260" />

                    <path d="M130 292 Q180 320 230 292" />
                    <path d="M143 321 Q180 341 217 321" opacity="0.7" />
                  </g>

                  <g fill="#B69A62">
                    <circle cx="180" cy="277" r="4" />
                    <circle cx="151" cy="275" r="2.5" />
                    <circle cx="209" cy="275" r="2.5" />
                  </g>

                  <path
                    d="M120 352 Q180 369 240 352"
                    stroke="#193C67"
                    strokeWidth="2"
                    opacity="0.45"
                  />
                </svg>
              </motion.div>

              <span className="absolute left-[12%] top-[27%] font-serif text-3xl text-[#193C67]/35">
                青
              </span>

              <span className="absolute right-[12%] top-[40%] font-serif text-2xl text-[#B69A62]/70">
                瓷
              </span>

              <div className="absolute inset-x-5 bottom-5 z-20 rounded-xl border border-white/80 bg-white/85 p-4 shadow-lg backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-5">
                <p className="text-[9px] font-semibold tracking-[0.2em] text-[#B69A62]">
                  {t('museumPage.collectionLabel')}
                </p>

                <p className="mt-2 text-sm font-semibold text-[#193C67] sm:text-base">
                  {t('museumPage.artifactLabel')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          2. CERAMIC COLLECTION GALLERY
      ====================================================== */}
      <section
        id="collections"
        className="relative bg-[#F5F2E9] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px]">

          {/* Section Heading */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          >
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-[#B69A62] sm:text-xs">
              <span className="h-px w-8 bg-[#B69A62]" />
              {t('museumPage.collectionLabel')}
              <span className="h-px w-8 bg-[#B69A62]" />
            </div>

            <h2 className="font-serif text-3xl font-semibold leading-tight text-[#193C67] sm:text-4xl lg:text-5xl">
              {t('museumPage.galleryTitle')}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#747B84] sm:text-base">
              {t('museumPage.galleryDescription')}
            </p>
          </motion.div>

          {/* Collection Cards */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {collections.map((item, index) => (
              <motion.article
                key={item.key}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 35 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.12,
                }}
                className="group relative overflow-hidden rounded-2xl border border-[#193C67]/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Artifact Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE5D8]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D2C]/65 via-transparent to-transparent" />

                  {/* Collection Number */}
                  <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#193C67] backdrop-blur-md">
                    COLLECTION {item.number}
                  </span>

                  {/* Chinese Name */}
                  <span className="absolute bottom-5 right-5 font-serif text-4xl text-white/90 drop-shadow-lg">
                    {t(`museumPage.collections.${item.key}.chineseName`)}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <div
                    className="mb-4 h-1 w-10 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B69A62]">
                    {t(`museumPage.collections.${item.key}.period`)}
                  </p>

                  <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#193C67]">
                    {t(`museumPage.collections.${item.key}.name`)}
                  </h3>

                  <p className="mt-3 min-h-[88px] text-sm leading-7 text-[#747B84]">
                    {t(`museumPage.collections.${item.key}.description`)}
                  </p>

                  <div className="mt-5 border-t border-[#193C67]/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#193C67]">
                      JINGCRAFT AI
                      <Sparkles size={13} className="text-[#B69A62]" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}

export default MuseumPage
