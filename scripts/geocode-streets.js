#!/usr/bin/env node
// Script to geocode streets-list.json using Nominatim and write streets-coords.json
// Usage: node scripts/geocode-streets.js

const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');
const LIST_FILE = path.join(DATA_DIR, 'streets-list.json');
const OUT_FILE = path.join(DATA_DIR, 'streets-coords.json');

async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function geocode(q){
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'gpon-site-geocoder/1.0 (mailto:you@example.com)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json && json[0] && json[0].lat && json[0].lon) return { lat: parseFloat(json[0].lat), lon: parseFloat(json[0].lon) };
  return null;
}

async function main(){
  console.log('Reading streets list...');
  const list = JSON.parse(await fs.readFile(LIST_FILE, 'utf8'));
  const out = {};
  for (let i = 0; i < list.length; i++){
    const street = list[i];
    const query = `${street}, Київ, Україна`;
    console.log(`[${i+1}/${list.length}] Geocoding: ${query}`);
    try{
      const res = await geocode(query);
      if (res) {
        out[street] = res;
        console.log(`  -> ${res.lat}, ${res.lon}`);
      } else {
        console.log('  -> not found');
      }
    }catch(e){
      console.error('  -> error', e.message);
    }
    // be polite to Nominatim
    await sleep(1100);
  }
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', OUT_FILE);
}

main().catch(err=>{ console.error(err); process.exit(1); });
