import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="col-span-2">
          <h3 className="text-white text-xl font-bold mb-3">
            Karakoram Baltistan Co.
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Licensed trekking and expedition company based in Skardu,
            Gilgit-Baltistan. Specialists in K2 Base Camp, Baltoro Glacier,
            and high-altitude Karakoram expeditions since 2010.
          </p>
          <p className="mt-4 text-sm text-stone-400">
            📍 Skardu, Gilgit-Baltistan, Pakistan
          </p>
          <p className="text-sm text-stone-400">
            📞 +92-XXX-XXXXXXX
          </p>
          <p className="text-sm text-stone-400">
            ✉️ info@karakorambaltistan.com
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Trek Packages</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/treks/k2-base-camp-trek" className="hover:text-white transition-colors">
                K2 Base Camp Trek
              </Link>
            </li>
            <li>
              <Link href="/treks/baltoro-glacier-trek" className="hover:text-white transition-colors">
                Baltoro Glacier Trek
              </Link>
            </li>
            <li>
              <Link href="/treks/gondogoro-la-trek" className="hover:text-white transition-colors">
                Gondogoro La Trek
              </Link>
            </li>
            <li>
              <Link href="/treks" className="hover:text-white transition-colors">
                All Packages
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-4 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Karakoram Baltistan Co. All rights reserved.
      </div>
    </footer>
  )
}