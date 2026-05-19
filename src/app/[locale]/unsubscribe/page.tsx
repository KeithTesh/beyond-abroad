import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type Props = {
  params: { locale: string }
  searchParams: { email?: string | string[] }
}

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const locale = typeof params.locale === 'string' && params.locale ? params.locale : 'en'
  const email = Array.isArray(searchParams.email)
    ? searchParams.email[0] ?? ''
    : typeof searchParams.email === 'string'
    ? searchParams.email
    : ''
  const isSw = locale === 'sw'
  const homeHref = locale ? `/${locale}` : '/'

  let status: 'idle' | 'done' | 'error' = 'idle'
  let errorMessage: string | null = null

  if (email) {
    const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondabroadco.com'
    try {
      const res = await fetch(new URL('/api/newsletter/unsubscribe', host).toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        cache: 'no-store',
      })

      const body = await res.json().catch(() => null)
      if (res.ok) {
        status = 'done'
      } else {
        status = 'error'
        errorMessage = body?.message || 'Unable to unsubscribe at this time.'
      }
    } catch (err) {
      status = 'error'
      errorMessage = err instanceof Error ? err.message : 'Unable to unsubscribe at this time.'
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          {status === 'done' && (
            <>
              <div className="text-5xl mb-4">👋</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">
                {isSw ? 'Umeondolewa kutoka kwenye orodha' : 'You have been unsubscribed'}
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                <strong>{email}</strong>{' '}
                {isSw
                  ? 'imeondolewa kutoka kwa jarida la Beyond Abroad.'
                  : 'has been removed from the Beyond Abroad newsletter.'}
              </p>
              <Link href={homeHref} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                {isSw ? 'Rudi nyumbani' : 'Back to Home'}
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="text-5xl mb-4">⚠️</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">
                {isSw ? 'Kuna tatizo' : 'Something went wrong'}
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                {errorMessage ||
                  (isSw
                    ? 'Tafadhali tuma barua pepe kwa carolmwenda09@gmail.com na tutakuondoa kwa mkono.'
                    : 'Please email us at carolmwenda09@gmail.com and we will remove you manually.')}
              </p>
              <Link href={homeHref} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                {isSw ? 'Rudi nyumbani' : 'Back to Home'}
              </Link>
            </>
          )}
          {status === 'idle' && !email && (
            <>
              <div className="text-5xl mb-4">❓</div>
              <h1 className="text-teal-700 text-2xl font-extrabold mb-3">
                {isSw ? 'Barua pepe haikupatikana' : 'No email provided'}
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                {isSw ? 'Tafadhali tumia kiungo cha kuondoa usajili kwenye barua pepe yako.' : 'Please use the unsubscribe link in your email.'}
              </p>
              <Link href={homeHref} className="bg-teal-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors inline-block">
                {isSw ? 'Rudi nyumbani' : 'Back to Home'}
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
