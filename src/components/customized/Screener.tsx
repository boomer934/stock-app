// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef, memo } from 'react';

function Screener() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "market": "forex",
          "showToolbar": true,
          "defaultColumn": "overview",
          "defaultScreen": "general",
          "isTransparent": false,
          "locale": "en",
          "colorTheme": "dark",
          "width": "100%",
          "height": 550
        }`;
      container.current?.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(Screener);
