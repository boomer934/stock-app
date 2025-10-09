"use client";
import React, { useState, useEffect } from "react";

interface SymbolItem {
  symbol: string;
  name: string;
  exchange: string;
}

interface SymbolAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSymbolSelect: (symbol: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SymbolAutocomplete({
  value,
  onChange,
  onSymbolSelect,
  placeholder = "Type symbol or company name...",
  className = "",
}: SymbolAutocompleteProps) {
  const [filteredSymbols, setFilteredSymbols] = useState<SymbolItem[]>([]);
  const [symbols, setSymbols] = useState<{ symbols: SymbolItem[] } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Import symbols dynamically
  useEffect(() => {
    setIsLoading(true);
    import("@/../fetch/symbols-full.json").then((data) => {
      setSymbols(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!value) {
        setFilteredSymbols([]);
        setIsOpen(false);
        return;
      }
      if (!symbols) return;

      const filtered = symbols.symbols.filter((s) =>
        s.symbol.toLowerCase().startsWith(value.toLowerCase()) ||
        s.name.toLowerCase().includes(value.toLowerCase())
      );
      const top10 = filtered.slice(0, 10);
      setFilteredSymbols(top10);
      setIsOpen(top10.length > 0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, symbols]);

  const handleSymbolClick = (symbol: SymbolItem) => {
    onChange(symbol.symbol);
    onSymbolSelect(symbol.symbol);
    setIsOpen(false);
    setFilteredSymbols([]);
  };

  return (
    <div className={`relative ${className}`} style={{ zIndex: 9999 }}>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-900 border-2 border-yellow-400/50 rounded-xl px-4 py-3 text-yellow-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 pr-12 placeholder-yellow-400/50 hover:border-yellow-400/70 hover:shadow-lg hover:shadow-yellow-400/10 group-hover:scale-[1.02] transform"
          placeholder={placeholder}
          onFocus={() => value && setIsOpen(filteredSymbols.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:scale-110">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Auto-complete dropdown */}
      {isOpen && filteredSymbols.length > 0 && (
        <>
          {/* Backdrop overlay */}
          
          
          {/* Dropdown */}
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border-2 border-yellow-400 rounded-xl shadow-2xl max-h-64 overflow-y-auto animate-fade-in-up z-50"
            style={{ zIndex: 9999 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-yellow-400/30 px-4 py-2 z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                  📈 {filteredSymbols.length} Results
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-yellow-400/70 hover:text-yellow-400 transition-colors p-1 hover:bg-yellow-400/10 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="p-2">
              {filteredSymbols.map((symbol, index) => (
                <button
                  key={symbol.symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  className="w-full text-left p-3 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-yellow-400/10 transition-all duration-300 border-b border-gray-700/30 last:border-b-0 focus:outline-none focus:bg-gradient-to-r focus:from-yellow-400/20 focus:to-yellow-400/10 rounded-lg mb-1 last:mb-0 group hover:scale-[1.02] transform hover:shadow-lg hover:shadow-yellow-400/10"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.3s ease-out forwards'
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <div className="font-bold text-base text-yellow-400 group-hover:text-yellow-300 transition-colors">
                          {symbol.symbol}
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:bg-yellow-400 transition-colors"></div>
                      </div>
                      <div className="text-sm text-yellow-400/80 truncate mt-1 group-hover:text-yellow-400 transition-colors">
                        {symbol.name}
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-3">
                      <div className="text-xs text-yellow-400/60 bg-yellow-400/10 px-2 py-1 rounded-full font-medium group-hover:bg-yellow-400/20 transition-colors">
                        {symbol.exchange}
                      </div>
                      <div className="text-xs text-yellow-400/40 mt-1 group-hover:text-yellow-400/60 transition-colors">
                        Click to select
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-900 border-t border-yellow-400/30 px-4 py-2 text-center">
              <span className="text-xs text-yellow-400/60">
                ⌨️ Use arrow keys to navigate • Enter to select
              </span>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
