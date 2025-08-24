interface Props {
  errorMessage: string;
  onRetry?: () => void;
}

export default function ErrorComponent({ errorMessage, onRetry }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg border border-red-200 p-8 max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary w-full"
          >
            Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
