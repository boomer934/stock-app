// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Pulisci il container per evitare duplicati (già presente, ma standardizzato)
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      lineWidth: 2,
      lineType: 0,
      chartType: "area",
      fontColor: "#B0B3C1",
      gridLineColor: "rgba(255, 255, 255, 0.1)",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      backgroundColor: "#0B0E17",
      widgetFontColor: "#FFFFFF",
      upColor: "#00C853",
      downColor: "#D32F2F",
      borderUpColor: "#00C853",
      borderDownColor: "#D32F2F",
      wickUpColor: "#00C853",
      wickDownColor: "#D32F2F",
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      chartOnly: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "Inter, Poppins, sans-serif",
      valuesTracking: "1",
      changeMode: "price-and-percent",
      symbols: [
        ["Apple", "NASDAQ:AAPL|1D"],
        ["Google", "NASDAQ:GOOGL|1D"],
        ["Microsoft", "NASDAQ:MSFT|1D"],
        ["Bitcoin", "BITSTAMP:BTCUSD|1D"]
      ],
      dateRanges: [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ],
      fontSize: "11",
      headerFontSize: "medium",
      autosize: true,
      width: "100%",
      height: "100%",
      noTimeScale: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false
    });
    container.current.appendChild(script);

    // Cleanup: rimuovi lo script al dismount (già presente, ma standardizzato)
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container rounded-lg" ref={container}>
      <div className="tradingview-widget-container__widget rounded-lg"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
