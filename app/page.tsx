'use client'

import { useState } from 'react'
import {
  LayoutGrid,
  Globe,
  ShoppingCart,
  Calendar,
  Megaphone,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  UserCog,
  Puzzle,
  Settings,
  X,
  Menu,
  Eye,
  Bell,
  Moon,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutGrid, active: true },
  { label: 'Website Builder', icon: Globe },
  { label: 'Online Store', icon: ShoppingCart },
  { label: 'Appointments', icon: Calendar },
  { label: 'Marketing', icon: Megaphone },
  { label: 'CRM / Contacts', icon: Users },
  { label: 'Invoicing', icon: FileText },
  { label: 'Payments', icon: CreditCard },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Team', icon: UserCog },
  { label: 'Integrations', icon: Puzzle },
  { label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Total Revenue', value: '$13,240', icon: '$' },
  { label: 'Site Visitors', value: '3,847', icon: '◉' },
  { label: 'Orders', value: '68', icon: '◌' },
  { label: 'Appointments', value: '12', icon: '⌁' },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-[#081513]">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6">
        <header className="mb-4 flex items-center justify-between rounded-2xl bg-[#f9f9f7] px-4 py-3 sm:px-6">
          <div className="text-2xl font-semibold tracking-tight">two7-platform</div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="rounded-xl border border-[#d8d8d2] bg-white p-2.5 text-[#1c2e2a]"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button className="hidden items-center gap-2 rounded-xl border border-[#d8d8d2] bg-white px-3 py-2 text-sm text-[#3a4f4a] sm:flex">
              <Eye className="h-4 w-4" /> 1
            </button>
            <button className="rounded-xl bg-[#081513] px-4 py-2.5 text-sm font-medium text-white">Customize</button>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-[#d6d7d1] bg-white shadow-[0_16px_50px_rgba(5,28,22,0.08)]">
          <div className="flex min-h-[760px]">
            <aside
              className={`z-20 w-[320px] shrink-0 border-r border-[#07563f] bg-[#013c2e] text-white transition-all duration-300 sm:w-[360px] ${
                sidebarOpen ? 'translate-x-0' : '-ml-[320px] sm:-ml-[360px]'
              }`}
            >
              <div className="flex h-[88px] items-center justify-between border-b border-[#0f5d49] px-6">
                <div className="text-4xl font-black tracking-tight">
                  Two7<span className="text-[#2dd39a]">.design</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-xl bg-[#0f5d49]/55 p-3 text-[#96cbbd]"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-1.5 px-4 py-4">
                {navItems.map(({ label, icon: Icon, active }) => (
                  <button
                    key={label}
                    className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-[31px] tracking-tight transition ${
                      active
                        ? 'bg-[#07553f] font-semibold text-white'
                        : 'text-[#a9c3bb] hover:bg-[#084734] hover:text-white'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-3 border-t border-[#0f5d49] p-4">
                <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-[31px] text-[#a9c3bb] transition hover:bg-[#084734] hover:text-white">
                  <Globe className="h-6 w-6" />
                  View Live Site
                </button>
              </div>
            </aside>

            <main className="min-w-0 flex-1 bg-[#f8f9f8] p-4 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Overview</h1>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-[#d8ddd9] bg-white p-2.5 text-[#3d5750]">
                    <Moon className="h-5 w-5" />
                  </button>
                  <button className="relative rounded-xl border border-[#d8ddd9] bg-white p-2.5 text-[#3d5750]">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ff5f57]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <section key={item.label} className="rounded-3xl border border-[#dce2de] bg-white p-5 shadow-sm">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dcfbef] text-3xl text-[#0e8f69]">
                      {item.icon}
                    </div>
                    <p className="text-lg uppercase tracking-wide text-[#8b9692]">{item.label}</p>
                    <p className="mt-1 text-5xl font-black tracking-tight text-[#081513]">{item.value}</p>
                  </section>
                ))}
              </div>

              <section className="mt-5 rounded-3xl border border-[#dce2de] bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-2xl font-bold">Revenue Overview</h2>
                <div className="flex h-64 items-end gap-2 rounded-2xl bg-[#f4faf7] p-4 sm:gap-3">
                  {[28, 40, 34, 52, 45, 63, 69, 56, 75, 82, 71, 94].map((height, i) => (
                    <div key={i} className="relative flex-1">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-b from-[#2bd39a] to-[#119669]"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
