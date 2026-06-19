import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getBTCBlockHeight, getETHBlockHeight } from '../lib/chain'
import { Activity, Cpu, ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  const [btcHeight, setBTCHeight] = useState<string | null>(null)
  const [ethHeight, setEthHeight] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      getBTCBlockHeight().then(setBTCHeight)
      getETHBlockHeight().then(setEthHeight)
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Block Insights</h1>
          <p className="text-slate-400">Real-time blockchain monitoring</p>
        </div>
        <div className="h-10 w-10 bg-orange-500/10 rounded-full flex items-center justify-center">
          <Activity className="h-5 w-5 text-orange-500" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatCard 
          title="Bitcoin" 
          value={btcHeight} 
          unit="Blocks" 
          color="orange"
          icon={<Cpu className="h-6 w-6 text-orange-500" />}
          explorer="https://blockstream.info/block-height/"
        />
        <StatCard 
          title="Ethereum" 
          value={ethHeight} 
          unit="Blocks" 
          color="blue"
          icon={<Activity className="h-6 w-6 text-blue-500" />}
          explorer="https://etherscan.io/block/"
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, unit, color, icon, explorer }: any) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-colors group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <a href={explorer + value} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-300">
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
      <h3 className="text-slate-400 font-medium mb-1">{title} Height</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-mono font-bold tracking-tighter">
          {value || '000,000'}
        </span>
        <span className="text-slate-500 font-medium">{unit}</span>
      </div>
      {!value && <div className="mt-4 h-1 w-full bg-slate-800 overflow-hidden rounded-full"><div className="h-full bg-slate-700 animate-pulse w-1/3"></div></div>}
    </div>
  )
}