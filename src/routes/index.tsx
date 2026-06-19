import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getBTCBlockHeight, getETHBlockHeight } from '../lib/chain'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  const [btcHeight, setBTCHeight] = useState<string | null>(null)
  const [ethHeight, setEthHeight] = useState<string | null>(null)

  useEffect(() => {
    getBTCBlockHeight().then(setBTCHeight)
    getETHBlockHeight().then(setEthHeight)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-slate-100">Blockchain Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Bitcoin Height</h2>
          <div className="text-4xl font-mono text-orange-500">{btcHeight || 'Loading...'}</div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Ethereum Height</h2>
          <div className="text-4xl font-mono text-blue-500">{ethHeight || 'Loading...'}</div>
        </div>
      </div>
    </div>
  )
}