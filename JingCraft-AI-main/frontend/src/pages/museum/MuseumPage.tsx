import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Sparkles } from 'lucide-react'
import CulturalStories from './CulturalStories'
import ArtifactDiscovery from './ArtifactDiscovery'
import CeramicHeritageDetails from './CeramicHeritageDetails'

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
    1. DIGITAL MUSEUM HERO
====================================================== */}
<section className="relative isolate overflow-hidden bg-[#193C67]">

  {/* Background Decorations */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full border border-white/10"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-20 -top-20 size-[440px] rounded-full border border-[#B69A62]/20"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-40 -left-40 size-[500px] rounded-full bg-[#66877A]/20 blur-3xl"
  />

  <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12 lg:py-28">

    {/* Museum Introduction */}
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >

      {/* Breadcrumb */}
      <div className="mb-9 flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-white/55">
        <span>JINGCRAFT AI</span>
        <span className="text-[#B69A62]">/</span>
        <span className="text-[#D7C69F]">VIRTUAL MUSEUM</span>
      </div>

      {/* Eyebrow */}
      <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-[#B69A62] pl-4">
        <Sparkles size={15} className="text-[#B69A62]" />

        <span className="text-[10px] font-semibold tracking-[0.24em] text-[#D7C69F] sm:text-xs">
          {t('museumPage.eyebrow')}
        </span>
      </div>

      {/* Heading */}
      <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.18] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
        {t('museumPage.title')}
      </h1>

      {/* Description */}
      <p className="mt-7 max-w-xl text-sm leading-8 text-white/65 sm:text-base sm:leading-9">
        {t('museumPage.description')}
      </p>

      {/* Collection Information */}
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
        <div>
          <p className="font-serif text-2xl text-[#D7C69F]">04</p>
          <p className="mt-1 text-[9px] tracking-[0.17em] text-white/50">
            CERAMIC TRADITIONS
          </p>
        </div>

        <div className="h-10 w-px bg-white/15" />

        <div>
          <p className="font-serif text-2xl text-[#D7C69F]">1000+</p>
          <p className="mt-1 text-[9px] tracking-[0.17em] text-white/50">
            YEARS OF HERITAGE
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">

        <a
          href="#collections"
          className="group inline-flex items-center justify-center gap-3 rounded-md bg-[#B69A62] px-7 py-4 text-sm font-semibold text-[#193C67] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D0B77D]"
        >
          {t('museumPage.exploreButton')}

          <ArrowDown
            size={17}
            className="transition-transform group-hover:translate-y-1"
          />
        </a>

        <Link
          to="/heritage"
          className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-[#B69A62] hover:bg-white/5"
        >
          {t('museumPage.heritageButton')}
        </Link>

      </div>

    </motion.div>

    {/* Featured Ceramic Photography */}
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.15 }}
      className="relative mx-auto w-full max-w-[540px]"
    >
      {/* Artifact Image */}
      <div className="relative overflow-hidden rounded-t-full border border-[#B69A62]/35 bg-[#E8E4D9] p-3 shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
          <img
            src="/images/museum/blue-white.jpg"
            alt="Chinese blue and white porcelain ceramic artifact"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Minimal Artifact Caption */}
      <div className="mt-6 flex items-center gap-4 border-b border-white/20 pb-5">
        <div className="h-12 w-1 shrink-0 rounded-full bg-[#B69A62]" />

        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold tracking-[0.2em] text-[#D7C69F]">
            {t('museumPage.collectionLabel')} · 03
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium text-white sm:text-2xl">
            {t('museumPage.collections.blueWhite.name')}
          </h2>

          <p className="mt-2 text-xs text-white/60">
            {t('museumPage.collections.blueWhite.period')}
          </p>
        </div>

        <Sparkles
          size={20}
          className="shrink-0 text-[#B69A62]"
        />
      </div>
    </motion.div>


  </div>

  {/* Bottom Decorative Line */}
  <div className="h-px bg-gradient-to-r from-transparent via-[#B69A62]/50 to-transparent" />

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

                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <p className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-[#B69A62]">
                    {item.number} / COLLECTION
                  </p>
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

{/* =====================================================
    3. FEATURED HISTORICAL ARTIFACT
====================================================== */}
<section className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">

  <div className="mx-auto max-w-[1440px]">

    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

      {/* Artifact Image */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#EAE5D8] shadow-lg">
          <img
            src="/images/museum/blue-white.jpg"
            alt="Blue and white Chinese porcelain artifact"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 -right-5 -z-10 size-32 rounded-full border border-[#B69A62]/40"
        />
      </motion.div>

      {/* Artifact Information */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative"
      >

        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-9 bg-[#B69A62]" />

          <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B69A62]">
            {t('museumPage.featuredArtifact.eyebrow')}
          </span>
        </div>

        {/* Heading */}
        <h2 className="max-w-xl font-serif text-3xl font-semibold leading-tight text-[#193C67] sm:text-4xl lg:text-5xl">
          {t('museumPage.featuredArtifact.title')}
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-xl text-sm leading-8 text-[#747B84] sm:text-base">
          {t('museumPage.featuredArtifact.description')}
        </p>

        {/* Artifact Name and Period */}
        <div className="mt-8 border-y border-[#193C67]/10 py-6">
          <h3 className="font-serif text-2xl font-semibold text-[#193C67]">
            {t('museumPage.featuredArtifact.artifactName')}
          </h3>

          <p className="mt-2 text-xs font-medium tracking-wide text-[#B69A62]">
            {t('museumPage.featuredArtifact.period')}
          </p>
        </div>

        {/* Artistic Details */}
        <div className="mt-8">

          <p className="mb-6 text-[10px] font-semibold tracking-[0.2em] text-[#B69A62]">
            {t('museumPage.featuredArtifact.sectionLabel')}
          </p>

          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#193C67]/5 font-serif text-sm text-[#193C67]">
                01
              </div>

              <div>
                <h4 className="font-semibold text-[#193C67]">
                  {t('museumPage.featuredArtifact.featureOneTitle')}
                </h4>

                <p className="mt-2 text-sm leading-7 text-[#747B84]">
                  {t('museumPage.featuredArtifact.featureOneDescription')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#66877A]/10 font-serif text-sm text-[#66877A]">
                02
              </div>

              <div>
                <h4 className="font-semibold text-[#193C67]">
                  {t('museumPage.featuredArtifact.featureTwoTitle')}
                </h4>

                <p className="mt-2 text-sm leading-7 text-[#747B84]">
                  {t('museumPage.featuredArtifact.featureTwoDescription')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#B69A62]/10 font-serif text-sm text-[#B69A62]">
                03
              </div>

              <div>
                <h4 className="font-semibold text-[#193C67]">
                  {t('museumPage.featuredArtifact.featureThreeTitle')}
                </h4>

                <p className="mt-2 text-sm leading-7 text-[#747B84]">
                  {t('museumPage.featuredArtifact.featureThreeDescription')}
                </p>
              </div>
            </div>

          </div>
        </div>

      </motion.div>

    </div>
  </div>
</section>


    {/* =====================================================
        4. TRADITIONAL CERAMIC CRAFTSMANSHIP
    ====================================================== */}
    <section className="relative scroll-mt-24 overflow-hidden bg-[#F5F2E9] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-36 lg:pb-28">

      <div className="mx-auto max-w-[1440px]">

        {/* Section Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#B69A62]" />

            <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B69A62]">
              {t('museumPage.craftsmanship.eyebrow')}
            </span>

            <span className="h-px w-9 bg-[#B69A62]" />
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#193C67] sm:text-4xl lg:text-5xl">
            {t('museumPage.craftsmanship.title')}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#747B84] sm:text-base">
            {t('museumPage.craftsmanship.description')}
          </p>
        </motion.div>

        {/* Craftsmanship Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              key: 'shaping',
              image: '/images/craft/ceramic-shaping.png',
            },
            {
              key: 'painting',
              image: '/images/craft/hand-painting.png',
            },
            {
              key: 'glazing',
              image: '/images/craft/glazing.png',
            },
            {
              key: 'firing',
              image: '/images/craft/kiln-firing.png',
            },
          ].map((item, index) => (
            <motion.article
              key={item.key}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.12,
              }}
              className="group overflow-hidden rounded-xl border border-[#193C67]/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`museumPage.craftsmanship.steps.${item.key}.title`)}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Number */}
                  <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/70 bg-[#F5F2E9]/95 font-serif text-sm font-semibold text-[#193C67] shadow-sm">
                    {t(`museumPage.craftsmanship.steps.${item.key}.number`)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">

                  <div className="mb-5 h-1 w-10 rounded-full bg-[#B69A62] transition-all duration-300 group-hover:w-16" />

                  <h3 className="font-serif text-xl font-semibold text-[#193C67]">
                    {t(`museumPage.craftsmanship.steps.${item.key}.title`)}
                  </h3>

                  <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#747B84]">
                    {t(`museumPage.craftsmanship.steps.${item.key}.description`)}
                  </p>

                  <div className="mt-6 border-t border-[#193C67]/10 pt-4">
                    <span className="text-[9px] font-semibold tracking-[0.18em] text-[#B69A62]">
                      JINGCRAFT AI
                    </span>
                  </div>

                </div>
              </motion.article>
            ))}

          </div>

          {/* Bottom Decorative Line */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[#B69A62]/50 to-transparent" />

        </div>
      </section>

      <CulturalStories />

      <ArtifactDiscovery />
      
      <CeramicHeritageDetails />

    </main>
  )
}

export default MuseumPage
