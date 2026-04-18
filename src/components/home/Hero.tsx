// FILE: src/components/home/Hero.tsx
// PURPOSE: Homepage hero — bilingual headline, dual CTA buttons,
//          floating stat cards, student photo placeholder
// STYLING: Tailwind v4 inline classes only

import Link from 'next/link'
import Image from 'next/image'
import { localePath } from '@/i18n/routing'

export default function Hero({ locale }: { locale: string }) {
  const isSw = locale === 'sw'

  return (
    <section className="bg-teal-700 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-teal-600 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full -translate-x-1/4 translate-y-1/2 opacity-5 bg-yellow-300" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-yellow-300 text-sm font-bold uppercase tracking-widest mb-4">
              {isSw ? 'Mthibitishwa na British Council' : 'British Council Certified'}
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {isSw ? (
                <>Njia Yako ya<br /><span className="text-yellow-300">Elimu ya</span><br />Kimataifa</>
              ) : (
                <>Your Gateway to<br /><span className="text-yellow-300">International</span><br />Education</>
              )}
            </h1>
            <div className="yellow-bar mb-6" />
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {isSw
                ? 'Tunaongoza wanafunzi hatua kwa hatua kufikia ndoto zao za elimu ya kimataifa — kutoka maombi hadi kuwasili, na zaidi ya hapo.'
                : 'We guide students step-by-step to achieve their international education dreams — from application to arrival, and beyond.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href={localePath('/contact', locale)}
                className="w-full sm:w-auto text-center bg-yellow-300 text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all"
              >
                {isSw ? 'Anza Safari Yako' : 'Start Your Journey'}
              </Link>
              <Link
                href={localePath('/contact', locale)}
                className="w-full sm:w-auto text-center border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              >
                {isSw ? 'Piga Simu Bure' : 'Book Free Consult'}
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              <span>🏆 {isSw ? 'Mthibitishwa na British Council' : 'British Council Certified'}</span>
              <span>🌍 {isSw ? 'Nchi 30+' : '30+ Countries'}</span>
              <span>🎓 {isSw ? 'Wanafunzi 500+' : '500+ Students Placed'}</span>
            </div>
          </div>

          {/* Right — photo + floating stat cards */}
          <div className="relative pb-4 md:pb-6">
            <div className="bg-teal-600 rounded-2xl aspect-[4/3] overflow-hidden relative">
              <Image
                src="/student-hero.png"
                alt="Student ready to study abroad"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Floating stat — bottom left — hidden on mobile */}
            <div
              className="hidden md:block absolute -bottom-4 -left-4 bg-white rounded-2xl p-4"
              style={{ boxShadow: '0 4px 20px rgba(7,61,61,0.12)' }}
            >
              <div className="text-teal-700 text-2xl font-extrabold">500+</div>
              <div className="text-gray-500 text-xs">
                {isSw ? 'Wanafunzi Waliowekwa' : 'Students Placed'}
              </div>
            </div>

            {/* Floating stat — top right — hidden on mobile */}
            <div
              className="hidden md:block absolute -top-4 -right-4 bg-yellow-300 rounded-2xl p-4"
              style={{ boxShadow: '0 4px 20px rgba(245,199,46,0.25)' }}
            >
              <div className="text-teal-700 text-2xl font-extrabold">95%</div>
              <div className="text-teal-700/70 text-xs">
                {isSw ? 'Mafanikio ya Visa' : 'Visa Success Rate'}
              </div>
            </div>

            {/* Inline stats — mobile only */}
            <div className="flex md:hidden gap-3 mt-4">
              <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                <div className="text-white text-xl font-extrabold">500+</div>
                <div className="text-white/70 text-xs mt-0.5">{isSw ? 'Wanafunzi' : 'Students Placed'}</div>
              </div>
              <div className="flex-1 bg-yellow-300/20 rounded-xl p-3 text-center">
                <div className="text-yellow-300 text-xl font-extrabold">95%</div>
                <div className="text-yellow-300/70 text-xs mt-0.5">{isSw ? 'Mafanikio ya Visa' : 'Visa Success'}</div>
              </div>
              <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                <div className="text-white text-xl font-extrabold">30+</div>
                <div className="text-white/70 text-xs mt-0.5">{isSw ? 'Nchi' : 'Countries'}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}