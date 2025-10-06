"use client"
import React, { useEffect, useRef, memo } from 'react';

function SymbolInfo({symbol}: {symbol: string}) {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!container.current || !symbol) return;

    // Clean up existing script if it exists
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // Clear container completely
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
      width: "100%",
      height: "100%"
    });

    scriptRef.current = script;
    container.current.appendChild(script);

    // Give TradingView time to initialize properly
    const initTimeout = setTimeout(() => {
      if (!container.current) return;

      const iframe = container.current.querySelector('iframe');
      if (iframe) {
        // Force iframe to take full height
        iframe.style.cssText = `
          height: 100% !important;
          min-height: 100% !important;
          width: 100% !important;
          display: block !important;
        `;

        // Force parent containers too
        let parent = iframe.parentElement;
        while (parent && parent !== container.current) {
          parent.style.cssText = `
            height: 100% !important;
            min-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            flex: 1 !important;
          `;
          parent = parent.parentElement;
        }
      }
    }, 50); // Small delay to let TradingView initialize

    return () => {
      clearTimeout(initTimeout);
      try {
        if (scriptRef.current) {
          scriptRef.current.remove();
          scriptRef.current = null;
        }
        if (container.current) {
          container.current.innerHTML = '';
        }
      } catch (error) {
        console.warn('SymbolInfo cleanup error:', error);
      }
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container w-full h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] flex flex-col"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'inherit',
        height: '100%'
      }}
      ref={container}
    >
      <div
        className="tradingview-widget-container__widget w-full h-full flex-1"
        style={{
          flex: 1,
          minHeight: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}

export default memo(SymbolInfo);
