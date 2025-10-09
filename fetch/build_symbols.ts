// build_symbols.js
// Node.js >= 18 (ESM)
// Dipendenze: node-fetch, csv-parse, fs-extra
import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import fs from "fs-extra";

const OUT_FILE = "./symbols-full.json";

// URL fonti ufficiali
const NASDAQ_URL = "https://www.nasdaqtrader.com/dynamic/symdir/nasdaqlisted.txt";
const NYSE_CSV_URL = "https://datahub.io/core/nyse-other-listings/r/nyse-listed.csv";
const AMEX_CSV_URL = "https://datahub.io/core/amex-listed/r/amex-listed.csv";

function normalizeSymbol(s: string) {
  return s?.trim().replace(/^"(.*)"$/, "$1").toUpperCase() || "";
}

function normalizeName(n: string) {
  return n?.trim().replace(/^"(.*)"$/, "$1") || "";
}

async function fetchText(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Errore fetch ${url}: ${res.status}`);
  return await res.text();
}

// ================= NASDAQ =================
function parseNasdaqTxt(txt: string) {
  const lines = txt.split(/\r?\n/);

  // Rimuovi righe vuote e metadati finali
  const dataLines = lines.filter(
    (l) => l && !l.startsWith("File Creation Time") && !l.startsWith("Symbol|")
  );

  const records = parse(dataLines.join("\n"), {
    delimiter: "|",
    columns: ["Symbol","Security Name","Market Category","Test Issue","Financial Status","Round Lot Size","ETF","NextShares"],
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true
  });

  return records.map((r: any) => ({
    symbol: normalizeSymbol(r.Symbol),
    name: normalizeName(r["Security Name"]),
    exchange: "NASDAQ"
  }));
}

// ================= CSV generico =================
function parseCsvText(csvText: string, exchange: string) {
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true
  });
  return records.map((r: any) => {
    const sym = r.Symbol || r.Ticker || r["ACT Symbol"] || r["Symbol"];
    const name = r["Company Name"] || r["Company"] || r["Security Name"] || r["Security"];
    return { symbol: normalizeSymbol(sym), name: normalizeName(name), exchange };
  }).filter((x: any) => x.symbol);
}

// ================= Main =================
(async () => {
  try {
    console.log("Scarico NASDAQ...");
    const nasdaqTxt = await fetchText(NASDAQ_URL);
    const nasdaqSymbols = parseNasdaqTxt(nasdaqTxt);
    console.log(`NASDAQ: trovati ${nasdaqSymbols.length} simboli`);

    console.log("Scarico NYSE...");
    const nyseTxt = await fetchText(NYSE_CSV_URL);
    const nyseSymbols = parseCsvText(nyseTxt, "NYSE");
    console.log(`NYSE: trovati ${nyseSymbols.length} simboli`);

    console.log("Scarico AMEX...");
    let amexSymbols: any[] = [];
    try {
      const amexTxt = await fetchText(AMEX_CSV_URL);
      amexSymbols = parseCsvText(amexTxt, "AMEX");
      console.log(`AMEX: trovati ${amexSymbols.length} simboli`);
    } catch (e: any) {
      console.warn("AMEX non disponibile:", e.message);
    }

    // Unisci e rimuovi duplicati (mantieni primo trovato)
    const map = new Map();
    const all = [...nasdaqSymbols, ...nyseSymbols, ...amexSymbols];
    for (const item of all) {
      const key = item.symbol;
      if (!key) continue;
      if (!map.has(key)) map.set(key, item);
      else {
        // Se esiste già, unisci exchange
        const prev = map.get(key);
        if (!prev.exchange.includes(item.exchange)) {
          prev.exchange += `,${item.exchange}`;
          map.set(key, prev);
        }
      }
    }

    const finalList = Array.from(map.values()).sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
    console.log(`Totale simboli unici: ${finalList.length}`);

    await fs.writeJson(OUT_FILE, finalList, { spaces: 2 });
    console.log(`Creato ${OUT_FILE} con tutti i simboli`);
  } catch (err) {
    console.error("Errore:", err);
    process.exit(1);
  }
})();
