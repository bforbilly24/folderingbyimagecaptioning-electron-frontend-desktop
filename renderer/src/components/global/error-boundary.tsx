import { Component, ErrorInfo, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Terjadi Kesalahan</AlertDialogTitle>
              <AlertDialogDescription>
                Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau muat ulang halaman.
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-sm">
                    <summary className="cursor-pointer font-medium">Detail Error (Development)</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-xs text-red-700">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={this.handleReset}>
                Coba Lagi
              </AlertDialogAction>
              <AlertDialogAction onClick={this.handleReload}>
                Muat Ulang Halaman
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
