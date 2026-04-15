// FILE: src/app/[locale]/faq/page.tsx
// ROUTE: /faq
// PURPOSE: FAQ page — live search accordion, 15 seed questions (shown if
//          Sanity has no data yet), CTA band at bottom
// STYLING: Tailwind v4 inline classes only

export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link          from 'next/link'
import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import EventBanner   from '@/components/layout/EventBanner'
import WhatsAppFloatServer from '@/components/ui/WhatsAppFloatServer'
import FaqAccordion  from '@/components/faq/FaqAccordion'
import { client, FAQ_QUERY } from '@/sanity/client'
import { localePath } from '@/i18n/routing'
import type { FaqItem } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title:       locale === 'sw' ? 'Maswali Yanayoulizwa Mara Kwa Mara' : 'Frequently Asked Questions',
    description: locale === 'sw'
      ? 'Kila kitu wanafunzi wanachouliza kabla ya kuanza safari yao.'
      : 'Everything students ask before starting their international education journey.',
  }
}

// Seed FAQs — displayed when Sanity has no data yet
const seedFaqs: FaqItem[] = [
  { _id:'1',  questionEn:'What services do you offer?',                          answerEn:'We offer career and course guidance, university applications, visa processing, scholarship finding, pre-departure briefing, and accommodation support — end-to-end for your entire journey abroad.',                                                                                       category:'services' },
  { _id:'2',  questionEn:'How much does it cost to study abroad?',               answerEn:'Costs vary by country and program. Canada and UK typically range from $15,000–$30,000/year. Germany offers free tuition at public universities. We give you a full cost breakdown during your free consultation.',                                                                         category:'cost' },
  { _id:'3',  questionEn:'What course can I do with my grades?',                 answerEn:'We assess your grades, interests and career goals then match you with universities and programs that accept your qualifications. There are options for a wide range of academic backgrounds.',                                                                                               category:'courses' },
  { _id:'4',  questionEn:'How many years will my course take?',                  answerEn:'Undergraduate degrees are typically 3–4 years. Postgraduate (Masters) are 1–2 years. Diplomas and certificates can be 1–2 years. We will clarify exact durations for your chosen program.',                                                                                               category:'courses' },
  { _id:'5',  questionEn:'Do you help with passport applications?',              answerEn:'We guide you on passport requirements and timelines. The actual application is done through your government immigration office. We advise you on exactly when to apply and what documents you need.',                                                                                         category:'visa' },
  { _id:'6',  questionEn:'Are there scholarships available for international students?', answerEn:'Yes — many universities and governments offer scholarships specifically for international students. We actively search for merit-based, need-based and fully funded scholarships that match your profile.',                                                                           category:'cost' },
  { _id:'7',  questionEn:'Can I work while studying?',                           answerEn:'Yes, in most countries. Canada allows up to 20 hrs/week during term. UK allows 20 hrs/week on a student visa. Australia allows 48 hours per fortnight. Germany allows 120 full days per year.',                                                                                            category:'life-abroad' },
  { _id:'8',  questionEn:'Which country or university is best for my studies?',  answerEn:'It depends on your course, budget, career goals and personal preferences. We compare your top options side by side — rankings, costs, visa ease, post-study work rights and quality of life.',                                                                                             category:'courses' },
  { _id:'9',  questionEn:'What are the admission requirements?',                 answerEn:'Requirements vary by university but generally include transcripts, a personal statement, letters of recommendation, English proficiency (IELTS/TOEFL), and proof of funds. We give you a full checklist.',                                                                                  category:'courses' },
  { _id:'10', questionEn:'What is needed for a visa application?',               answerEn:'Typically: valid passport, offer letter from university, proof of funds, academic transcripts, IELTS/TOEFL scores, biometrics, and medical certificates for some countries. We prepare all of this with you.',                                                                              category:'visa' },
  { _id:'11', questionEn:'What is the visa success rate for my target country?', answerEn:'Our overall visa success rate is 95% across 30+ countries. Rates vary by country — Canada and UK have high approval rates for well-prepared applications. We brief you fully to maximise your chances.',                                                                                    category:'visa' },
  { _id:'12', questionEn:'Where will I stay?',                                   answerEn:'We help you find on-campus student housing, private student accommodation, or homestays near your university. We handle bookings and ensure you have confirmed accommodation before you travel.',                                                                                            category:'life-abroad' },
  { _id:'13', questionEn:'Is it safe to study in that country?',                 answerEn:'We only guide students to countries with well-established international student communities. Our pre-departure briefing covers safety tips, emergency contacts, student support services and cultural norms.',                                                                                category:'life-abroad' },
  { _id:'14', questionEn:'What are career opportunities after graduating?',      answerEn:"Most countries offer post-study work visas — Canada's PGWP is up to 3 years, UK's Graduate Route is 2 years, Australia's PSW is 2–4 years. Many students secure employment or permanent residency after graduation.",                                                                    category:'after-graduation' },
  { _id:'15', questionEn:'Do you offer job placement after graduation?',         answerEn:'We do not place students in jobs directly, but we guide you on post-study work opportunities, CV building, job markets in your destination country, and connect you with our alumni network.',                                                                                              category:'after-graduation' },
]

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isSw = locale === 'sw'

  const faqs: FaqItem[] = await client.fetch(FAQ_QUERY)
  const items = faqs?.length ? faqs : seedFaqs

  return (
    <>
      <EventBanner locale={locale} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-teal-700 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-teal-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="max-w-7xl mx-auto relative">
            <div className="yellow-bar mb-4" />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
              {isSw ? 'Maswali Yanayoulizwa Mara Kwa Mara' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-white/75 text-lg">
              {isSw ? 'Kila kitu wanafunzi wanachouliza kabla ya kuanza safari yao.' : 'Everything students ask before starting their journey abroad.'}
            </p>
          </div>
        </section>

        {/* Accordion — client component */}
        <section className="py-10 md:py-14 px-4 sm:px-6 bg-teal-50">
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={items} locale={locale} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-700 py-10 md:py-14 px-4 sm:px-6 text-center border-t-4 border-yellow-300">
          <h2 className="text-white text-2xl font-extrabold mb-2">
            {isSw ? 'Bado una maswali?' : 'Still have questions?'}
          </h2>
          <p className="text-white/70 text-sm mb-6">
            {isSw ? 'Piga simu ya bure ya mtu mmoja na Calorine.' : 'Book a free one-on-one consultation with Calorine.'}
          </p>
          <Link href={localePath('/contact', locale)} className="bg-yellow-300 text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all inline-block">
            {isSw ? 'Piga Simu ya Bure' : 'Book Free Consultation'}
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatServer />
    </>
  )
}