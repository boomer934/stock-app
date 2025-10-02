// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef, memo } from 'react';

function SymbolInfo({symbol}: {symbol: string}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !symbol) return;

    // Pulisci il container per evitare duplicati
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      width: "100%"
    });

    container.current.appendChild(script);

    // Cleanup: rimuovi lo script al dismount
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol]); // Ora include 'symbol' per aggiornare quando cambia

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(SymbolInfo);
