import { SplitText } from './ui/SplitText'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'

export function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-[8%]">
      <SplitText
        as="h2"
        className="text-3xl md:text-5xl lg:text-7xl font-extralight tracking-tight mb-12"
        scrollTriggered
      >
        Vamos trabalhar juntos?
      </SplitText>

      <Reveal delay={0.2}>
        <MagneticButton>
          <a
            href="mailto:contato@rafaelvieira.dev"
            className="text-lg md:text-2xl text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            contato@rafaelvieira.dev
          </a>
        </MagneticButton>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex gap-8 mt-10">
          <a
            href="https://github.com/rafaelvieira"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors tracking-wider uppercase"
            data-cursor="expand"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rafaelvieira"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors tracking-wider uppercase"
            data-cursor="expand"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  )
}
