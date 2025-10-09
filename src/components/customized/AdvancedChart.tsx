"use client"
import React, { useEffect, useRef, memo, useState } from 'react';

function AdvancedChart({symbol}: {symbol: string}) {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadWidget = async () => {
      if (!container.current) return;

      // Clean up existing script if it exists
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }

      setIsLoading(true);
      setError(null);

      // Clear container
      container.current.innerHTML = '';

      try {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.onerror = () => {
          console.error('Failed to load TradingView script');
          setError('Failed to load chart widget. This may be due to network restrictions or server issues.');
          setIsLoading(false);
        };

        script.onload = () => {
          console.log('TradingView script loaded successfully');
          setIsLoading(false);
        };

        script.innerHTML = JSON.stringify({
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": symbol || "NASDAQ:AAPL",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        });

        scriptRef.current = script;
        container.current.appendChild(script);
      } catch (err) {
        console.error('Error initializing TradingView widget:', err);
        setError('Failed to initialize chart widget. Please try refreshing the page.');
        setIsLoading(false);
      }
    };

    loadWidget();

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      if(container.current){
        container.current.innerHTML = '';
      }
    }
  }, [symbol, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setIsLoading(true);
  };

  if (error) {
    return (
      <div className="tradingview-widget-container w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-center p-6">
          <div className="text-red-400 text-lg mb-2">⚠️ Chart Unavailable</div>
          <p className="text-gray-300 text-sm mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
          >
            Retry
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          Chart data provided by TradingView
        </div>
      </div>
    );
  }

  return (
    <div className="tradingview-widget-container w-full h-full min-h-[300px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
            <p className="text-gray-300 text-sm">Loading chart...</p>
          </div>
        </div>
      )}
      <div className="tradingview-widget-container__widget w-full h-full" ref={container}></div>
    </div>
  );
}

export default memo(AdvancedChart);
