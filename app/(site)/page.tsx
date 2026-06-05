import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import EkosistemSection from '@/components/sections/EkosistemSection'
import ProgramHighlights from '@/components/sections/ProgramHighlights'
import EventList from '@/components/sections/EventList'
import CtaDark from '@/components/sections/CtaDark'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <EkosistemSection />
      <ProgramHighlights />
      <EventList />
      <section className="py-14 bg-white">
        <div className="container">
          <CtaDark
            eyebrow="Bergabung Sekarang"
            title="Menjadi Bagian dari Gerakan Nasional"
            description="Bergabunglah dengan ribuan pendidik dan inovator di seluruh Indonesia. Bersama-sama kita wujudkan ekosistem pembelajaran yang lebih baik."
            primaryCta={{ label: 'Daftar Sekarang', href: '/keanggotaan/daftar' }}
            secondaryCta={{ label: 'Bicara dengan Tim', href: '/kontak' }}
          />
        </div>
      </section>
    </>
  )
}
