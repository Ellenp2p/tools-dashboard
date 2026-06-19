import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [btcHeight, setBtcHeight] = useState<string | null>(null);
  const [ethHeight, setEthHeight] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeights = async () => {
      try {
        const btcRes = await fetch('https://blockstream.info/api/blocks/tip/height');
        const btcData = await btcRes.text();
        setBtcHeight(btcData);

        const ethRes = await fetch('https://cloudflare-eth.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }),
        });
        const ethData = await ethRes.json();
        setEthHeight(parseInt(ethData.result, 16).toString());
      } catch (err) {
        console.error('Failed to fetch heights', err);
      }
    };
    fetchHeights();
    const interval = setInterval(fetchHeights, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '48px', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '1024px', margin: '0 auto 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 8px' }}>Block Insights</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Real-time Rspack 2.0 Blockchain Monitor</p>
        </div>
        <div style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '12px', borderRadius: '9999px' }}>
          <Activity style={{ color: '#f97316' }} />
        </div>
      </header>

      <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        <div className="card">
          <div className="card-header">
            <div className="icon-wrap"><Cpu style={{ color: '#f97316' }} /></div>
            <a href="https://blockstream.info/block-height/" target="_blank"><ArrowUpRight /></a>
          </div>
          <h3 className="card-title">Bitcoin Height</h3>
          <div className="card-value">{btcHeight || '000,000'} <span className="unit">Blocks</span></div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="icon-wrap"><Activity style={{ color: '#3b82f6' }} /></div>
            <a href="https://etherscan.io/block/" target="_blank"><ArrowUpRight /></a>
          </div>
          <h3 className="card-title">Ethereum Height</h3>
          <div className="card-value">{ethHeight || '000,000'} <span className="unit">Blocks</span></div>
        </div>
      </div>
    </div>
  );
}