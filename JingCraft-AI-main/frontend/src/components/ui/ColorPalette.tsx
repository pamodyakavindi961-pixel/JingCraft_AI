
import type { CSSProperties } from 'react'

// Defines the structure of each color displayed in the palette.
interface ColorToken {
  name: string
  variable: string
  value: string
  description: string
  usage: string
}

// Brand colors establish the visual identity of JingCraft AI.
const brandColors: ColorToken[] = [
  {
    name: 'Porcelain Ivory',
    variable: '--color-porcelain',
    value: '#F5F2E9',
    description: 'Inspired by traditional porcelain.',
    usage: 'Main page background',
  },
  {
    name: 'Imperial Blue',
    variable: '--color-imperial-blue',
    value: '#193C67',
    description: 'Represents heritage and elegance.',
    usage: 'Primary buttons and headings',
  },
  {
    name: 'Jade Green',
    variable: '--color-jade',
    value: '#66877A',
    description: 'Inspired by traditional Chinese jade.',
    usage: 'Secondary elements',
  },
  {
    name: 'Antique Gold',
    variable: '--color-antique-gold',
    value: '#B69A62',
    description: 'Adds a subtle heritage accent.',
    usage: 'Decorative accents and highlights',
  },
]

// Neutral colors maintain readability and visual balance.
const neutralColors: ColorToken[] = [
  {
    name: 'White',
    variable: '--color-white',
    value: '#FFFFFF',
    description: 'Clean and minimal surface color.',
    usage: 'Cards and elevated surfaces',
  },
  {
    name: 'Ink',
    variable: '--color-ink',
    value: '#202A35',
    description: 'Primary text color.',
    usage: 'Body text and headings',
  },
  {
    name: 'Muted',
    variable: '--color-muted',
    value: '#747B84',
    description: 'Secondary text color.',
    usage: 'Descriptions and supporting text',
  },
  {
    name: 'Border',
    variable: '--color-border',
    value: '#E5E0D5',
    description: 'Subtle visual separation.',
    usage: 'Card borders and dividers',
  },
]

// Semantic colors communicate application states and feedback.
const semanticColors: ColorToken[] = [
  {
    name: 'Success',
    variable: '--color-success',
    value: '#2F6B4F',
    description: 'Indicates successful operations.',
    usage: 'Success messages and indicators',
  },
  {
    name: 'Warning',
    variable: '--color-warning',
    value: '#A66A1F',
    description: 'Highlights important warnings.',
    usage: 'Warning messages',
  },
  {
    name: 'Error',
    variable: '--color-error',
    value: '#B54747',
    description: 'Indicates errors or failed actions.',
    usage: 'Validation and error messages',
  },
  {
    name: 'Info',
    variable: '--color-info',
    value: '#3C6E91',
    description: 'Provides informational feedback.',
    usage: 'Information messages',
  },
]

// Reusable section for displaying a group of color tokens.
interface ColorGroupProps {
  title: string
  description: string
  colors: ColorToken[]
}

function ColorGroup({
  title,
  description,
  colors,
}: ColorGroupProps) {
  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-xl font-semibold text-ink">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {colors.map((color) => {
          // Uses the actual design token value for the color preview.
          const swatchStyle: CSSProperties = {
            backgroundColor: color.value,
          }

          return (
            <article
              key={color.variable}
              className="
                group overflow-hidden rounded-xl border border-border bg-white
                transition-[transform,box-shadow,border-color]
                duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg
                hover:border-antique-gold/50
                motion-reduce:transition-none
                motion-reduce:hover:transform-none
              "
            >
              {/*
                Interaction:
                - Lift the card slightly on hover.
                - Reveal a soft shadow and subtle gold border.
                - Keep the interaction lightweight.
                - Respect users who prefer reduced motion.
              */}

              {/* Color swatch with a subtle hover zoom effect. */}
              <div
                className="
                  h-28 w-full
                  transition-transform duration-500 ease-out
                  group-hover:scale-[1.03]
                  motion-reduce:transition-none
                  motion-reduce:group-hover:transform-none
                "
                style={swatchStyle}
                role="img"
                aria-label={`${color.name} color swatch`}
              />

              {/* Displays color information and design token details. */}
              <div className="space-y-2 p-4">
                <h4 className="font-semibold text-ink">
                  {color.name}
                </h4>

                <p className="font-mono text-xs text-muted">
                  {color.value}
                </p>

                <p className="text-sm text-muted">
                  {color.description}
                </p>

                <div className="border-t border-border pt-2">
                  <p className="text-xs text-muted">
                    <span className="font-semibold text-ink">
                      Token:
                    </span>{' '}
                    {color.variable}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    <span className="font-semibold text-ink">
                      Usage:
                    </span>{' '}
                    {color.usage}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

// Main ColorPalette component used by the design system preview.
export default function ColorPalette() {
  return (
    <div className="space-y-12">
      <ColorGroup
        title="Brand Colors"
        description="The core colors that define the JingCraft AI identity."
        colors={brandColors}
      />

      <ColorGroup
        title="Neutral Colors"
        description="Supporting colors for readable and balanced interfaces."
        colors={neutralColors}
      />

      <ColorGroup
        title="Semantic Colors"
        description="Colors used to communicate application feedback."
        colors={semanticColors}
      />
    </div>
  )
}
