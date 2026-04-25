import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Problem from '../components/Problem'
import Services from '../components/Services'
import Process from '../components/Process'
import Sectors from '../components/Sectors'
import LeadForm from '../components/LeadForm'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Problem />
      <Services />
      <Process />
      <Sectors />
      <LeadForm />
    </main>
  )
}
