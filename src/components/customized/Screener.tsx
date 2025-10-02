// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef, memo } from 'react';

function Screener() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Pulisci il container per evitare duplicati
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "market": "forex",
      "showToolbar": true,
      "defaultColumn": "overview",
      "defaultScreen": "general",
      "isTransparent": false,
      "locale": "en",
      "colorTheme": "dark",
      "width": "100%",
      "height": 550
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
    <div className="tradingview-widget-container w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
}

export default memo(Screener);
