import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ArrowUpRight, Shield } from 'lucide-react';

export default function App() {
  const [btcHeight, setBtcHeight] = useState<string | null>(null);
  const [ethHeight, setEthHeight] = useState<string | null>(null);

  const fetchHeights = async () => {
    try {
      // BTC: Blockstream API
      const btcRes = await fetch('https://blockstream.info/api/blocks/tip/height');
      if (btcRes.ok) setBtcHeight(await btcRes.text());

      // ETH: Cloudflare RPC eth_blockNumber
      const ethRes = await fetch('https://cloudflare-eth.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }),
      });
      if (ethRes.ok) {
        const data = await ethRes.json();
        setEthHeight(parseInt(data.result, 16).toLocaleString());
      }
    } catch (err) {
      console.error('Network Error:', err);
    }
  };

  useEffect(() => {
    fetchHeights();
    const interval = setInterval(fetchHeights, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '40px', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.025em' }}>Block Insights</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
            <Shield size={16} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Live Rspack 2.0 Dashboard</span>
          </div>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px' }}>
          <Activity color="#f97316" size={24} />
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div className="card">
          <div className="card-top">
            <div className="icon-box btc"><Cpu size={20} color="#f97316" /></div>
            <a href="https://blockstream.info" target="_blank" className="link"><ArrowUpRight size={18} /></a>
          </div>
          <h2 className="label">Bitcoin Network</h2>
          <div className="value">{btcHeight || '000,000'} <span className="unit">Blocks</span></div>
        </div>

        <div className="card">
          <div className="card-top">
            <div className="icon-box eth"><Activity size={20} color="#3b82f6" /></div>
            <a href="https://etherscan.io" target="_blank" className="link"><ArrowUpRight size={18} /></a>
          </div>
          <h2 className="label">Ethereum Network</h2>
          <div className="value">{ethHeight || '0,000,000'} <span className="unit">Blocks</span></div>
        </div>
      </div>

      <style>{`
        .card { background: rgba(15, 23, 42, 0.6); border: 1px solid #1e293b; padding: 32px; border-radius: 24px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card:hover { border-color: #334155; transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .icon-box { padding: 12px; border-radius: 16px; background: #1e293b; }
        .label { color: #94a3b8; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px; }
        .value { font-size: 44px; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #f8fafc; }
        .unit { font-size: 14px; color: #64748b; font-weight: 500; margin-left: 4px; }
        .link { color: #475569; transition: color 0.2s; }
        .link:hover { color: #94a3b8; }
      `}</style>
    </div>
  );
}
