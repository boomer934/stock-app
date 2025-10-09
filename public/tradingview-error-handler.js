// Allow disabling via localStorage for debugging
if (window.localStorage?.getItem('DISABLE_TRADINGVIEW_ERROR_FILTER') === 'true') {
  console.log('TradingView error filtering disabled');
  // Skip overriding
} else {
  // Global error handler for TradingView widget errors
  const originalError = console.error;
  console.error = function(...args) {
    // Filter out TradingView widget errors that don't affect functionality
    // Only filter if first arg is an Error from TradingView
    const firstArg = args[0];
    if (
      firstArg instanceof Error &&
      firstArg.stack?.includes('tradingview') &&
      firstArg.message.includes("can't access property") &&
      firstArg.message.includes('querySelector')
    ) {
      // Log as warning instead of error to reduce noise
      console.warn('TradingView widget error (non-critical):', ...args);
      return;
    }

    // Call original error for other errors
    originalError.apply(console, args);
  };
}

// Global uncaught error handler
window.addEventListener('error', function(event) {
  // Filter TradingView widget errors
  if (
    event.message &&
    event.filename &&
    event.message.includes("can't access property") &&
    event.message.includes('querySelector') &&
    event.filename.includes('tradingview')
  ) {
    console.warn('TradingView widget error caught (non-critical):', event.message);
    event.preventDefault(); // Prevent the error from being logged
    return true; // Return true to suppress default error handling
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
  // Filter TradingView widget errors
  if (
    event.reason &&
    event.reason.message &&
    event.reason.message.includes("can't access property") &&
    event.reason.message.includes('querySelector') &&
    event.reason.stack &&
    event.reason.stack.includes('tradingview')
  ) {
    console.warn('TradingView widget promise error caught (non-critical):', event.reason.message);
    event.preventDefault(); // Prevent the error from being logged
    return false;
  }
});
