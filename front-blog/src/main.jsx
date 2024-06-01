import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={
        <ErrorFallback onReset={() => window.location.replace('/')} />
      }
    >
      <Toaster positon='top-center' reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
