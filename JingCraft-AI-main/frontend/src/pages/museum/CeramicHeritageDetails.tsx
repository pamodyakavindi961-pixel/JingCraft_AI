
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'

const traditions = [
  {
    key: 'tang',
    image: '/images/museum/tang-sancai.jpg',
    number: '01',
    period: 'TANG DYNASTY',
    title: 'Tang Sancai',
    chineseTitle: '唐三彩',
    description:
      'Known for its vibrant lead-glazed decoration, Tang Sancai commonly features combinations of green, amber and cream tones.',
    chineseDescription:
      '唐三彩以鲜明的铅釉装饰著称，常见绿色、琥珀色与乳白色等色彩组合。',
    detail: 'MULTI-COLOUR GLAZING',
    chineseDetail: '多彩釉饰',
  },
  {
    key: 'song',
    image: '/images/museum/song-celadon.jpg',
    number: '02',
    period: 'SONG DYNASTY',
    title: 'Song Celadon',
    chineseTitle: '宋代青瓷',
    description:
      'Song celadon is admired for its calm jade-like glaze, subtle surface qualities and elegant ceramic forms.',
    chineseDescription:
      '宋代青瓷以温润如玉的釉色、细腻的表面质感与优雅的器形受到赞赏。',
    detail: 'JADE-LIKE GLAZE',
    chineseDetail: '如玉釉色',
  },
  {
    key: 'blueWhite',
    image: '/images/museum/blue-white.jpg',
    number: '03',
    period: 'BLUE & WHITE PORCELAIN',
    title: 'Blue & White',
    chineseTitle: '青花瓷',
    description:
      'Cobalt-blue decoration painted beneath a transparent glaze gives blue-and-white porcelain its distinctive visual identity.',
    chineseDescription:
      '青花瓷以钴料绘制纹饰，再施透明釉烧制，形成鲜明而独特的蓝白视觉风格。',
    detail: 'UNDERGLAZE COBALT',
    chineseDetail: '釉下钴蓝彩绘',
  },
  {
    key: 'familleRose',
    image: '/images/museum/famille-rose.jpg',
    number: '04',
    period: 'QING DYNASTY',
    title: 'Famille Rose',
    chineseTitle: '粉彩瓷',
    description:
      'Famille rose porcelain is recognised for its delicate overglaze enamels, soft colours and richly detailed decoration.',
    chineseDescription:
      '粉彩瓷以细腻的釉上彩、柔和的色调与丰富精致的装饰而闻名。',
    detail: 'OVERGLAZE ENAMELS',
    chineseDetail: '釉上彩绘',
  },
]

export default function CeramicHeritageDetails() {
  const { i18n } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const isChinese = i18n.language.startsWith('zh')

  const content = isChinese
    ? {
        eyebrow: '陶瓷艺术与工艺',
        title: '探索不同的陶瓷艺术传统',
        description:
          '从绚丽的釉彩到精致的绘饰，了解中国陶瓷在不同历史时期展现出的独特艺术语言。',
        explore: '探索艺术特色',
        footer: '中国陶瓷艺术 · 文化遗产',
      }
    : {
        eyebrow: 'ARTISTRY & CRAFT',
        title: 'A World of Distinct Ceramic Traditions',
        description:
          'From expressive glazes to intricate painted decoration, discover the artistic languages that distinguish Chinese ceramics across different periods.',
        explore: 'ARTISTIC CHARACTERISTICS',
        footer: 'CHINESE CERAMIC ART · CULTURAL HERITAGE',
      }

  return (
    <section
      id="ceramic-heritage-details"
      className="overflow-hidden bg-[#F5F2E9] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl sm:mb-16"
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

        {/* Ceramic Tradition Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {traditions.map((item, index) => (
            <motion.article
              key={item.key}
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="group min-w-0 border border-[#193C67]/10 bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE5D8]">
                <img
                  src={item.image}
                  alt={isChinese ? item.chineseTitle : item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2C]/55 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 font-serif text-2xl text-white/90">
                  {item.number}
                </span>

                <span className="absolute bottom-5 left-5 right-5 text-[9px] font-semibold tracking-[0.18em] text-[#F0D8A4]">
                  {item.period}
                </span>
              </div>

              <div className="flex min-h-[255px] flex-col p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-semibold tracking-[0.15em] text-[#B69A62]">
                    {content.explore}
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[#193C67] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#193C67]">
                  {isChinese ? item.chineseTitle : item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#747B84]">
                  {isChinese ? item.chineseDescription : item.description}
                </p>

                <div className="mt-auto border-t border-[#193C67]/10 pt-5">
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-[#66877A]">
                    {isChinese ? item.chineseDetail : item.detail}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-12 flex items-center justify-between border-t border-[#193C67]/15 pt-6 sm:mt-16">
          <span className="text-[9px] font-semibold tracking-[0.18em] text-[#8B8B83]">
            {content.footer}
          </span>

          <span className="h-px w-12 bg-[#B69A62] sm:w-20" />
        </div>
      </div>
    </section>
  )
}
