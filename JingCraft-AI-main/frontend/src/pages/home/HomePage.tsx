
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

// Lazy-load the 3D scene to keep the initial homepage bundle lighter.
const PorcelainVase3D = lazy(
  () => import('../../components/museum/PorcelainVase3D')
)

function HomePage() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  // Collection metadata controls the visual presentation of each ceramic card.
  const collections = [
    {
      key: 'blueWhite',
      symbol: '青',
      theme: 'bg-[#DCE6E9]',
      symbolColor: 'text-[#193C67]',
      accent: 'bg-[#193C67]',
    },
    {
      key: 'celadon',
      symbol: '瓷',
      theme: 'bg-[#E1E9DF]',
      symbolColor: 'text-[#66877A]',
      accent: 'bg-[#66877A]',
    },
    {
      key: 'familleRose',
      symbol: '彩',
      theme: 'bg-[#F0E2DC]',
      symbolColor: 'text-[#A66F70]',
      accent: 'bg-[#B69A62]',
    },
  ] as const

  return (
    <>
        

            {/* =====================================================
          HERO SECTION — HUMANIZED JINGCRAFT AI
          Desktop: Left aligned
          Tablet: Centered
          Mobile: Centered
          Responsive | Balanced | Editorial
      ====================================================== */}

      <section className="relative isolate min-h-[calc(100svh-68px)] w-full overflow-hidden bg-[#F5F2E9] antialiased">

        {/* =====================================================
            BACKGROUND IMAGE
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <img
            src="https://assets.watermelon.sh/hero-11-bg.avif"
            alt=""
            className="h-full w-full object-cover object-center max-md:object-[65%_center]"
          />
        </motion.div>

        {/* =====================================================
            BALANCED CONTINUOUS HORIZONTAL OVERLAY
            Avoid abrupt breakpoint changes
        ====================================================== */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,242,233,0.72)_0%,rgba(245,242,233,0.52)_35%,rgba(245,242,233,0.12)_70%,rgba(245,242,233,0)_100%)] max-md:bg-[linear-gradient(90deg,rgba(245,242,233,0.82)_0%,rgba(245,242,233,0.62)_55%,rgba(245,242,233,0.25)_100%)]"
        />

        {/* =====================================================
            SUBTLE VERTICAL BLENDING
        ====================================================== */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,242,233,0.04)_0%,rgba(245,242,233,0)_70%,rgba(245,242,233,0.08)_100%)]"
        />

        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-68px)] w-full max-w-[1440px] items-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12">

          {/* =====================================================
              CONTENT WRAPPER
              Desktop: Left
              Tablet/Mobile: Center
          ====================================================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.13 },
              },
            }}
            className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center lg:mx-0 lg:max-w-[680px] lg:items-start lg:text-left"
          >

            {/* =====================================================
                EYEBROW
            ====================================================== */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65 },
                },
              }}
              className="mb-7 inline-flex items-center rounded-full border border-[#B69A62]/35 bg-[#F5F2E9]/50 px-4 py-2 sm:mb-8"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#193C67]/85 sm:text-xs">
                {t('home.eyebrow')}
              </span>
            </motion.div>

            {/* =====================================================
                MAIN HEADING
            ====================================================== */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7 },
                },
              }}
              className="w-full max-w-[760px] text-[clamp(2.5rem,7vw,5.35rem)] leading-[1.08] font-medium tracking-[-0.045em] text-balance text-[#193C67] sm:text-[clamp(3rem,6vw,5rem)] lg:text-[clamp(3.6rem,5vw,5.2rem)]"
            >
              {t('home.title')}
            </motion.h1>

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7 },
                },
              }}
              className="mt-5 w-full max-w-[560px] text-[15px] leading-[1.8] text-pretty text-[#193C67]/80 sm:mt-6 sm:text-lg sm:leading-[1.75]"
            >
              {t('home.description')}
            </motion.p>

            {/* =====================================================
                CTA BUTTONS
            ====================================================== */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7 },
                },
              }}
              className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start"
            >

              {/* EXPLORE MUSEUM */}
              <Link
                to="/museum"
                className="group inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-sm border border-[#193C67] bg-[#193C67] px-7 text-sm font-medium !text-[#F5F2E9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#244D7D] hover:shadow-lg sm:w-auto"
              >
                <span className="!text-[#F5F2E9]">
                  {t('home.explore')}
                </span>

                <ArrowRight
                  size={17}
                  className="shrink-0 !text-[#F5F2E9] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* AI DESIGN STUDIO */}
              <Link
                to="/design-studio"
                className="inline-flex min-h-[54px] w-full items-center justify-center rounded-sm border border-[#193C67]/30 bg-[#F5F2E9]/65 px-7 text-sm font-medium !text-[#193C67] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#193C67] hover:bg-[#F5F2E9]/90 hover:shadow-md sm:w-auto"
              >
                <span className="!text-[#193C67]">
                  {t('home.create')}
                </span>
              </Link>

            </motion.div>

            {/* =====================================================
                BRAND SIGNATURE
            ====================================================== */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7 },
                },
              }}
              className="mt-9 flex w-full items-center justify-center border-t border-[#193C67]/15 pt-5 sm:mt-12 lg:justify-start"
            >
              <p className="text-[11px] tracking-wide text-[#193C67]/65 sm:text-xs">
                {t('brand.tagline')}
              </p>
            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          2. FEATURED CHINESE CERAMIC HERITAGE
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F5F2E9] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

          {/* Section heading */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-accent">
              {t('featured.eyebrow')}
            </span>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              {t('featured.title')}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
              {t('featured.description')}
            </p>
          </motion.div>

          {/* Ceramic collection cards */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.article
                key={collection.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="group overflow-hidden rounded-2xl border border-[#D8D0C0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Decorative collection artwork */}
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden ${collection.theme}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute size-[72%] rounded-full border border-current/15"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute size-[55%] rounded-full border border-current/10"
                  />

                  <span
                    className={`relative z-10 font-serif text-[110px] font-light leading-none opacity-80 transition-transform duration-700 group-hover:scale-110 sm:text-[150px] lg:text-[160px] ${collection.symbolColor}`}
                    aria-hidden="true"
                  >
                    {collection.symbol}
                  </span>
                </div>

                {/* Collection information */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        {t(`featured.items.${collection.key}.name`)}
                      </h3>

                      <p className="mt-1 font-serif text-sm text-accent">
                        {t(`featured.items.${collection.key}.chineseName`)}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-[#F5F2E9] px-3 py-1 text-[10px] font-medium tracking-wide text-primary">
                        {t(`featured.items.${collection.key}.period`)}
                      </span>
                    </div>

                    <span
                      className={`mt-1 size-2.5 shrink-0 rounded-full ${collection.accent}`}
                    />
                  </div>

                  <p className="mt-5 min-h-[72px] text-sm leading-7 text-muted">
                    {t(`featured.items.${collection.key}.description`)}
                  </p>

                  <Link
                    to="/museum"
                    className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    {t('featured.discover')}

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Explore all collections */}
          <div className="mt-12 text-center">
            <Link
              to="/museum"
              className="group inline-flex items-center gap-3 rounded-lg border border-primary/20 px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:!text-white"
            >
              {t('featured.viewAll')}

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. VISUAL TRANSITION
          Connects the heritage collection with the 3D museum.
      ====================================================== */}
      <div
        aria-hidden="true"
        className="relative h-20 bg-gradient-to-b from-[#F5F2E9] via-[#F0EBDD] to-[#EAE5D8] sm:h-24 lg:h-28"
      >
        <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B69A62]/50 to-transparent" />
      </div>

      {/* =====================================================
          4. VIRTUAL MUSEUM 3D EXPERIENCE
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#EAE5D8] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Museum introduction */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-semibold tracking-[0.25em] text-accent">
                {t('museumPreview.eyebrow')}
              </span>

              <h2 className="mt-5 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
                {t('museumPreview.title')}
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-8 text-muted sm:text-base">
                {t('museumPreview.description')}
              </p>

              {/* Cultural highlights */}
              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {(['history', 'craftsmanship', 'artistry'] as const).map(
                  (item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-antique-gold/40 bg-white/70 text-accent">
                        <Sparkles size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-primary">
                          {t(`museumPreview.highlights.${item}.title`)}
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-muted">
                          {t(`museumPreview.highlights.${item}.description`)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Open the full virtual museum */}
              <Link
                to="/museum"
                className="group mt-10 inline-flex items-center gap-3 rounded-lg bg-[#193C67] px-7 py-4 text-sm font-medium !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#244D7D]"
              >
                {t('museumPreview.explore')}

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Interactive 3D porcelain exhibition */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-w-0 overflow-hidden rounded-[28px] border border-antique-gold/30 bg-gradient-to-br from-[#DCE6E9] via-[#F5F2E9] to-[#D5DFDF] shadow-xl"
            >
              {/* 3D artifact preview label */}
              <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
                <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-primary backdrop-blur-md">
                  {t('museumPreview.artifactLabel')}
                </span>
              </div>

              {/* Lazy-loaded 3D scene with a loading fallback */}
              <Suspense
                fallback={
                  <div className="flex h-[360px] items-center justify-center sm:h-[460px] lg:h-[540px]">
                    <div className="text-center">
                      <div className="mx-auto size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

                      <p className="mt-4 text-xs text-muted">
                        {t('museumPreview.loading')}
                      </p>
                    </div>
                  </div>
                }
              >
              <PorcelainVase3D artifactName={t('museumPreview.artifactName')} />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
      
{/* =====================================================
    5. AI DESIGN STUDIO PREVIEW
====================================================== */}
<section className="relative overflow-hidden bg-[#F5F2E9] py-20 sm:py-24 lg:py-28">
  <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">

    {/* Design Studio Introduction */}
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className="text-xs font-semibold tracking-[0.25em] text-accent">
        {t('designPreview.eyebrow')}
      </span>

      <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
        {t('designPreview.title')}
      </h2>

      <p className="mt-6 max-w-xl text-sm leading-8 text-muted sm:text-base">
        {t('designPreview.description')}
      </p>

      <div className="mt-9 space-y-5">
        {([
          'featureOne',
          'featureTwo',
          'featureThree',
        ] as const).map((feature) => (
          <div key={feature} className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-antique-gold/40 bg-white text-accent">
              <Sparkles size={17} />
            </div>

            <p className="text-sm font-medium text-primary">
              {t(`designPreview.${feature}`)}
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/design-studio"
        className="group mt-10 inline-flex items-center justify-center gap-3 rounded-lg bg-[#193C67] px-7 py-4 text-sm font-medium !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#244D7D]"
      >
        {t('designPreview.button')}
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </motion.div>

    {/* Cultural Design Inspiration Preview */}
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative min-w-0"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-antique-gold/30 bg-gradient-to-br from-[#DCE6E9] via-[#F7F3E9] to-[#E5E9DF] p-5 shadow-xl sm:p-8">

        {/* Preview Label */}
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-white/70 bg-white/75 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-primary backdrop-blur-md">
            {t('designPreview.previewLabel')}
          </span>
        </div>

        {/* Decorative Chinese-inspired design */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { rotate: 360 }
            }
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute size-[88%] rounded-full border border-[#B69A62]/40"
          />

          <div className="absolute size-[72%] rounded-full border border-[#193C67]/20" />

          <div className="relative flex size-[58%] items-center justify-center rounded-full border border-[#B69A62]/40 bg-white/50 shadow-inner backdrop-blur-sm">
            <div className="absolute inset-3 rounded-full border border-[#193C67]/20" />

            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.05, 1] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative font-serif text-[clamp(5rem,18vw,9rem)] font-light text-[#193C67]"
            >
              瓷
            </motion.span>
          </div>

          {/* Small decorative elements */}
          <span className="absolute left-[12%] top-[28%] size-3 rounded-full bg-[#B69A62]" />
          <span className="absolute right-[15%] top-[38%] size-2 rounded-full bg-[#193C67]" />
          <span className="absolute bottom-[20%] left-[25%] size-2 rounded-full bg-[#66877A]" />
        </div>

        {/* Preview Caption */}
        <div className="relative z-10 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-md sm:p-5">
          <h3 className="text-base font-semibold text-primary sm:text-lg">
            {t('designPreview.previewTitle')}
          </h3>

          <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">
            {t('designPreview.previewCaption')}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>


{/* =====================================================
    6. CHINESE CERAMIC HERITAGE TIMELINE
====================================================== */}
<section className="relative overflow-hidden bg-[#EAE5D8] py-20 sm:py-24 lg:py-28">

  <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

    {/* Section Heading */}
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="text-[10px] font-semibold tracking-[0.25em] text-accent sm:text-xs">
        {t('heritageJourney.eyebrow')}
      </span>

      <h2 className="mt-5 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
        {t('heritageJourney.title')}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-muted sm:text-base">
        {t('heritageJourney.description')}
      </p>
    </motion.div>

    {/* Historical Timeline */}
    <div className="relative mt-16 lg:mt-24">

      {/* Desktop Timeline Line */}
      <div
        aria-hidden="true"
        className="absolute left-[12.5%] right-[12.5%] top-[7px] hidden h-px bg-antique-gold/50 md:block"
      />

      <div className="grid gap-10 md:grid-cols-4 md:gap-6">

        {([
          { key: 'tang', number: '01', symbol: '唐' },
          { key: 'song', number: '02', symbol: '宋' },
          { key: 'ming', number: '03', symbol: '明' },
          { key: 'qing', number: '04', symbol: '清' },
        ] as const).map((item, index) => (
          <motion.div
            key={item.key}
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 25 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
            }}
            className="relative min-w-0"
          >

            {/* Timeline Marker */}
            <div className="relative z-10 flex items-center gap-4 md:mb-9 md:justify-center">

              <div className="flex size-[15px] shrink-0 items-center justify-center rounded-full border-[3px] border-[#EAE5D8] bg-[#193C67] ring-1 ring-antique-gold/60" />

              <span className="text-xs font-semibold tracking-[0.15em] text-accent md:hidden">
                {t(`heritageJourney.periods.${item.key}.period`)}
              </span>
            </div>

            {/* Timeline Card */}
            <div className="ml-7 min-w-0 border-l border-antique-gold/40 pl-5 md:ml-0 md:border-l-0 md:pl-0">

              <div className="relative overflow-hidden rounded-2xl border border-antique-gold/25 bg-white/75 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:min-h-[285px]">

                {/* Decorative Background Number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-5 select-none font-serif text-8xl text-primary/[0.045]"
                >
                  {item.number}
                </span>

                {/* Dynasty Symbol */}
                <div className="relative flex size-14 items-center justify-center rounded-full border border-antique-gold/35 bg-[#F5F2E9]">
                  <span className="font-serif text-3xl text-primary">
                    {item.symbol}
                  </span>
                </div>

                {/* Period */}
                <p className="mt-6 hidden text-[10px] font-semibold tracking-[0.2em] text-accent md:block">
                  {t(`heritageJourney.periods.${item.key}.period`)}
                </p>

                {/* Dynasty Name */}
                <h3 className="mt-3 text-xl font-semibold text-primary">
                  {t(`heritageJourney.periods.${item.key}.name`)}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#B69A62]">
                  {t(`heritageJourney.periods.${item.key}.title`)}
                </p>

                <p className="mt-4 text-xs leading-7 text-muted sm:text-sm">
                  {t(`heritageJourney.periods.${item.key}.description`)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </div>

    {/* Explore Heritage Button */}
    <div className="mt-14 flex justify-center">
      <Link
        to="/heritage"
        className="group inline-flex items-center justify-center gap-3 rounded-lg border border-primary/25 bg-white/60 px-7 py-4 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-white"
      >
        {t('heritageJourney.explore')}

        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>

  </div>
</section>


      {/* =====================================================
          7. FINAL CALL TO ACTION
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-[#193C67] py-20 sm:py-24 lg:py-28">

        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full border border-white/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-24 size-[450px] rounded-full border border-[#B69A62]/20"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#193C67] via-[#193C67] to-[#102B4B]"
        />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8"
        >
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#B69A62]/40 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
            <Sparkles size={15} className="text-[#D7BC83]" />

            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D7BC83] sm:text-xs">
              {t('finalCta.eyebrow')}
            </span>
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#F5F2E9] sm:text-4xl lg:text-6xl">
            {t('finalCta.title')}
          </h2>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/70 sm:text-base sm:leading-9">
            {t('finalCta.description')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/museum"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#F5F2E9] px-7 py-4 text-sm font-semibold text-[#193C67] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto"
            >
              {t('finalCta.museumButton')}

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/design-studio"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D7BC83] hover:bg-white/10 sm:w-auto"
            >
              <Sparkles size={17} className="text-[#D7BC83]" />

              {t('finalCta.studioButton')}
            </Link>

          </div>

          {/* Decorative Bottom Ornament */}
          <div className="mx-auto mt-16 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B69A62]/70" />

            <span className="font-serif text-2xl text-[#B69A62]">
              瓷
            </span>

            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B69A62]/70" />
          </div>

        </motion.div>
      </section>

      
    </>
  )
}

export default HomePage
