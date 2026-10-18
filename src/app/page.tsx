import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import AuthLogoutSection from '@/components/AuthLogoutSection'

export default function Home() {
  return (
    <main>
      <Slider/>
      <AuthLogoutSection />
      <Featured/>
      <Offer/>
    </main>
  )
}
