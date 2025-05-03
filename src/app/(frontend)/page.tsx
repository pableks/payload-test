import { LandingPage } from '@/Landing/Component'
import { Metadata } from 'next'

export default function Home() {
  return (
    <main className="flex-1">
      <LandingPage />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SAVA Servicios Financieros - Soluciones financieras a tu alcance',
    description:
      'Ofrecemos servicios financieros de calidad para impulsar tu crecimiento económico. Asesoría financiera, préstamos personales, inversiones y más.',
  }
}
