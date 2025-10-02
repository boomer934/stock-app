// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TechnicalAnalisys({symbol}: {symbol: string}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
          "colorTheme": "dark",
          "displayMode": "single",
          "isTransparent": false,
          "locale": "en",
          "interval": "1m",
          "disableInterval": false,
          "width": "100%",
          "height": "100%",
          "symbol": symbol,
          "showIntervalTabs": true
        });
      container.current?.appendChild(script);
      return ()=>{
        if(container.current){
          container.current.innerHTML = '';
        }
      }
    },
    [symbol]
  );

  return (
    <div className="tradingview-widget-container w-full h-full min-h-[300px]" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
}

export default memo(TechnicalAnalisys);
