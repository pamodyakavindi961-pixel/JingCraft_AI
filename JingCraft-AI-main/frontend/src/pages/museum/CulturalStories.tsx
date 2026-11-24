
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'

const stories = [
  {
    key: 'culture',
    image: '/images/museum/tang-sancai.jpg',
    imageAlt: 'Traditional Tang Sancai ceramic artwork',
  },
  {
    key: 'craft',
    image: '/images/craft/hand-painting.png',
    imageAlt: 'Traditional ceramic hand painting process',
  },
  {
    key: 'exchange',
    image: '/images/museum/blue-white.jpg',
    imageAlt: 'Traditional blue and white Chinese porcelain',
  },
]

export default function CulturalStories() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="cultural-stories"
      className="scroll-mt-24 bg-[#F5F2E9] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-[#9B8050]">
            {t('museumPage.culturalStory.eyebrow')}
          </span>

          <h2 className="font-serif text-3xl font-medium leading-tight text-[#193C67] sm:text-4xl lg:text-5xl">
            {t('museumPage.culturalStory.title')}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#68675F] sm:text-base sm:leading-8">
            {t('museumPage.culturalStory.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.key}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.12,
              }}
              className="group overflow-hidden rounded-sm border border-[#DCD5C7] bg-[#FAF8F2] transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(25,60,103,0.10)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#172B40]/25 to-transparent opacity-60" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-[0.2em] text-[#A58B5A]">
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.5}
                    className="text-[#8B7957] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

                <h3 className="font-serif text-xl font-medium text-[#193C67] sm:text-2xl">
                  {t(`museumPage.culturalStory.stories.${story.key}.title`)}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#68675F]">
                  {t(`museumPage.culturalStory.stories.${story.key}.description`)}
                </p>

                <div className="mt-7 h-px w-full bg-[#DED7C9]" />

                <span className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9B8050]">
                  JINGCRAFT AI
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
