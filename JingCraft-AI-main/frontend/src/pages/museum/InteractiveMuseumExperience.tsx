import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Rotate3D, Sparkles } from 'lucide-react'
import PorcelainVase3D from '../../components/museum/PorcelainVase3D'

export default function InteractiveMuseumExperience() {
  const { i18n } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const isChinese = i18n.language.startsWith('zh')

  const content = isChinese
    ? {
        eyebrow: 'INTERACTIVE 3D EXPERIENCE',
        title: '从不同角度探索中国瓷器',
        description:
          '通过交互式三维展示，近距离欣赏中国传统陶瓷的造型、细节与艺术之美。',
        instruction: '拖动鼠标或触摸屏幕，旋转并探索瓷器',
        label: '3D CERAMIC EXPLORATION',
      }
    : {
        eyebrow: 'INTERACTIVE 3D EXPERIENCE',
        title: 'Explore Chinese Porcelain in 3D',
        description:
          'Discover the form, details, and artistic beauty of traditional Chinese ceramics through an interactive three-dimensional experience.',
        instruction:
          'Drag with your mouse or touch the screen to rotate and explore',
        label: '3D CERAMIC EXPLORATION',
      }

  return (
    <section className="relative overflow-hidden bg-[#193C67] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[500px] rounded-full border border-white/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-[450px] rounded-full bg-[#66877A]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <Sparkles size={16} className="text-[#B69A62]" />
              <span className="text-[10px] font-semibold tracking-[0.24em] text-[#D7C69F] sm:text-xs">
                {content.eyebrow}
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-white/65 sm:text-base sm:leading-9">
              {content.description}
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-white/15 pt-7">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#B69A62]/40 bg-white/5">
                <Rotate3D size={21} className="text-[#D7C69F]" />
              </div>
              <p className="max-w-sm text-xs leading-6 text-white/65 sm:text-sm">
                {content.instruction}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-[600px]"
          >
            <div className="overflow-hidden rounded-2xl border border-[#B69A62]/30 bg-[#F5F2E9] p-3 shadow-2xl sm:p-5">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#EAE5D8]">
                <PorcelainVase3D artifactName="Chinese Porcelain" />
              </div>

              <div className="flex items-center justify-between gap-3 px-2 pb-2 pt-5 sm:px-3">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#193C67] sm:text-[10px]">
                  {content.label}
                </span>
                <span className="flex items-center gap-2 text-[9px] font-medium tracking-wide text-[#66877A] sm:text-[10px]">
                  <span className="size-1.5 rounded-full bg-[#66877A]" />
                  INTERACTIVE MODEL
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-5 -z-10 size-28 rounded-full border border-[#B69A62]/40"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}