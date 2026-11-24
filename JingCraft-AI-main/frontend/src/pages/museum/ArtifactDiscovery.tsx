import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const artifacts = [
  {
    key: 'tang',
    image: '/images/museum/tang-sancai.jpg',
    alt: 'Tang Dynasty sancai ceramic artifact',
    periodLabel: 'TANG DYNASTY',
    color: '#B69A62',
  },
  {
    key: 'celadon',
    image: '/images/museum/song-celadon.jpg',
    alt: 'Song Dynasty celadon ceramic artifact',
    periodLabel: 'SONG DYNASTY',
    color: '#66877A',
  },
  {
    key: 'blueWhite',
    image: '/images/museum/blue-white.jpg',
    alt: 'Chinese blue and white porcelain artifact',
    periodLabel: 'BLUE & WHITE PORCELAIN',
    color: '#193C67',
  },
  {
    key: 'familleRose',
    image: '/images/museum/famille-rose.jpg',
    alt: 'Qing Dynasty famille rose porcelain artifact',
    periodLabel: 'QING DYNASTY',
    color: '#B69A62',
  },
] as const

export default function ArtifactDiscovery() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const activeArtifact = artifacts[activeIndex]

  const content = {
    eyebrow: t('museumPage.artifactDiscovery.eyebrow', {
      defaultValue: 'DISCOVER THE COLLECTION',
    }),
    title: t('museumPage.artifactDiscovery.title', {
      defaultValue: 'Explore the Art of Chinese Ceramics',
    }),
    description: t('museumPage.artifactDiscovery.description', {
      defaultValue:
        'Select an artifact to discover its historical background, artistic characteristics, and cultural significance.',
    }),
    collection: t('museumPage.artifactDiscovery.collection', {
      defaultValue: 'CURATED COLLECTION',
    }),
    explore: t('museumPage.artifactDiscovery.explore', {
      defaultValue: 'EXPLORE ARTIFACT',
    }),
    previous: t('museumPage.artifactDiscovery.previous', {
      defaultValue: 'Previous artifact',
    }),
    next: t('museumPage.artifactDiscovery.next', {
      defaultValue: 'Next artifact',
    }),
    details: t('museumPage.artifactDiscovery.details', {
      defaultValue: 'ABOUT THIS ARTIFACT',
    }),
    count: t('museumPage.artifactDiscovery.count', {
      defaultValue: 'CURATED ARTIFACTS',
    }),
  }

  const selectPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? artifacts.length - 1 : current - 1,
    )
  }

  const selectNext = () => {
    setActiveIndex((current) =>
      current === artifacts.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <section
      id="artifact-discovery"
      className="scroll-mt-24 overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Introduction */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl sm:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#B69A62]" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-[#B69A62] sm:text-xs">
              {content.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#193C67] sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#747B84] sm:text-base">
            {content.description}
          </p>
        </motion.div>

        {/* Artifact Explorer */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Artifact Image and Responsive Navigation */}
          <div className="flex min-w-0 flex-col">
            <motion.div
              key={activeArtifact.key}
              initial={prefersReducedMotion ? false : { opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="relative min-h-[420px] overflow-hidden bg-[#F0EDE5] sm:min-h-[500px] lg:min-h-[600px]"
            >
              <img
                src={activeArtifact.image}
                alt={activeArtifact.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2C]/75 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 border border-white/50 bg-[#F5F2E9]/95 px-4 py-2 sm:left-8 sm:top-8">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#193C67]">
                  {content.collection}
                </span>
              </div>

              {/* Desktop navigation stays over the image */}
              <div className="absolute right-8 top-8 hidden gap-2 lg:flex">
                <button
                  type="button"
                  onClick={selectPrevious}
                  aria-label={content.previous}
                  className="flex size-11 items-center justify-center border border-white/70 bg-[#193C67]/75 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-[#B69A62]"
                >
                  <ChevronLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={selectNext}
                  aria-label={content.next}
                  className="flex size-11 items-center justify-center border border-white/70 bg-[#193C67]/75 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-[#B69A62]"
                >
                  <ChevronRight size={19} />
                </button>
              </div>

              {/* Artifact title and period */}
              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-10 lg:left-10 lg:right-10">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#E0C58F]">
                  {activeArtifact.periodLabel}
                </span>

                <h3 className="mt-3 max-w-xl font-serif text-3xl font-medium sm:text-4xl lg:text-5xl">
                  {t(`museumPage.collections.${activeArtifact.key}.name`)}
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-7 text-white/75">
                  {t(`museumPage.collections.${activeArtifact.key}.period`)}
                </p>
              </div>
            </motion.div>

            {/* Mobile and tablet navigation sits below the image */}
            <div className="mt-4 flex items-center justify-end gap-3 lg:hidden">
              <button
                type="button"
                onClick={selectPrevious}
                aria-label={content.previous}
                className="flex size-11 items-center justify-center border border-[#193C67]/20 bg-[#F5F2E9] text-[#193C67] transition-colors hover:bg-[#193C67] hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={selectNext}
                aria-label={content.next}
                className="flex size-11 items-center justify-center border border-[#193C67]/20 bg-[#F5F2E9] text-[#193C67] transition-colors hover:bg-[#193C67] hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Artifact Information and Selection */}
          <div className="flex min-w-0 flex-col justify-between py-2">
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-[#193C67]/10 pb-5">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#B69A62]">
                  {content.details}
                </span>

                <span className="font-serif text-lg text-[#193C67]">
                  0{activeIndex + 1}
                  <span className="text-[#A7A39A]"> / 0{artifacts.length}</span>
                </span>
              </div>

              <motion.div
                key={`${activeArtifact.key}-description`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-2xl font-semibold text-[#193C67] sm:text-3xl">
                  {t(`museumPage.collections.${activeArtifact.key}.name`)}
                </h3>

                <p className="mt-3 text-xs font-medium tracking-wide text-[#B69A62]">
                  {t(`museumPage.collections.${activeArtifact.key}.period`)}
                </p>

                <p className="mt-6 text-sm leading-8 text-[#747B84] sm:text-base">
                  {t(`museumPage.collections.${activeArtifact.key}.description`)}
                </p>
              </motion.div>
            </div>

            {/* Artifact Selector */}
            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#193C67]">
                  {content.explore}
                </span>

                <span className="text-[9px] tracking-wide text-[#8B8B83]">
                  {content.count}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {artifacts.map((artifact, index) => (
                  <button
                    key={artifact.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={t(`museumPage.collections.${artifact.key}.name`)}
                    aria-pressed={activeIndex === index}
                    className={`group relative aspect-square overflow-hidden border-2 transition-all duration-300 ${
                      activeIndex === index
                        ? 'border-[#B69A62] opacity-100'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={artifact.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <span
                      className="absolute bottom-0 left-0 h-1 w-full"
                      style={{
                        backgroundColor:
                          activeIndex === index ? artifact.color : 'transparent',
                      }}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#193C67]/10 pt-5">
                <span className="text-[9px] font-semibold tracking-[0.18em] text-[#8B8B83]">
                  JINGCRAFT AI · VIRTUAL MUSEUM
                </span>

                <span className="flex items-center gap-2 text-xs font-medium text-[#193C67]">
                  {content.explore}
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
