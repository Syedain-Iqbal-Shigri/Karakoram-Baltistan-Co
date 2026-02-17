export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-xl font-bold text-emerald-700 mb-8">
          KBC Admin
        </h1>
        <nav className="space-y-2">
          
            href="/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-emerald-50 text-stone-700"
          >
            Overview
          </a>
          
            href="/dashboard/bookings"
            className="block px-4 py-2 rounded-lg hover:bg-emerald-50 text-stone-700"
          >
            Bookings
          </a>
          
            href="/dashboard/treks"
            className="block px-4 py-2 rounded-lg hover:bg-emerald-50 text-stone-700"
          >
            Trek Packages
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}