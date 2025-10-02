"use client"
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function News() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Pulisci il container per evitare duplicati
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "displayMode": "regular",
      "feedMode": "all_symbols",
      "colorTheme": "dark",
      "isTransparent": false,
      "locale": "en",
      "width": "100%",
      "height": 400
    });
    container.current.appendChild(script);

    // Cleanup: rimuovi lo script al dismount
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full h-full min-h-[300px] sm:min-h-[400px] relative overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full relative"></div>
    </div>
  );
}

export default memo(News);
