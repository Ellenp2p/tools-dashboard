export async function getBTCBlockHeight() {
  const res = await fetch('https://blockstream.info/api/blocks/tip/height');
  return res.text();
}

export async function getETHBlockHeight() {
  const res = await fetch('https://cloudflare-eth.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }),
  });
  const data = await res.json();
  return parseInt(data.result, 16).toString();
}