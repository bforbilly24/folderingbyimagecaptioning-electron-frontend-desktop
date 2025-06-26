// Global utility to override native browser dialogs and alerts
// This ensures no native alerts, confirms, or prompts can appear

export function disableNativeAlerts() {
  // Override native alert
  const originalAlert = window.alert;
  window.alert = (message?: string) => {
    console.warn('Native alert blocked:', message);
    // For debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Use shadcn AlertDialog instead of native alert()');
    }
  };

  // Override native confirm
  const originalConfirm = window.confirm;
  window.confirm = (message?: string): boolean => {
    console.warn('Native confirm blocked:', message);
    // For debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Use shadcn AlertDialog instead of native confirm()');
    }
    return false; // Default to false for safety
  };

  // Override native prompt
  const originalPrompt = window.prompt;
  window.prompt = (message?: string): string | null => {
    console.warn('Native prompt blocked:', message);
    // For debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Use appropriate form inputs instead of native prompt()');
    }
    return null; // Default to null for safety
  };

  // Store original functions for potential restoration
  return {
    restore: () => {
      window.alert = originalAlert;
      window.confirm = originalConfirm;
      window.prompt = originalPrompt;
    }
  };
}

// Additional utility to prevent file input errors from showing native alerts
export function preventFileErrors() {
  // Override console.error to catch and handle file-related errors
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const errorString = args.join(' ').toLowerCase();
    
    // Check if error is file-related
    if (errorString.includes('file') || 
        errorString.includes('folder') || 
        errorString.includes('directory') ||
        errorString.includes('upload') ||
        errorString.includes('download')) {
      
      // Log to console but don't trigger native alerts
      originalConsoleError('[File Error]:', ...args);
      
      // Dispatch custom event that components can listen to
      window.dispatchEvent(new CustomEvent('fileError', {
        detail: { message: args.join(' ') }
      }));
      
      return;
    }
    
    // For other errors, use original console.error
    originalConsoleError(...args);
  };
}

// Initialize all protections
export function initializeAppSafety() {
  disableNativeAlerts();
  preventFileErrors();
  
  // App safety initialized - native alerts disabled
}
