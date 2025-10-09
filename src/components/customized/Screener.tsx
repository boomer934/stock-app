"use client"
import React, { useEffect, useRef, memo } from 'react';

function Screener() {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clean up existing script if it exists
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // Clear container
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
      "height": "100%"
    });

    scriptRef.current = script;
    container.current.appendChild(script);

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
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
