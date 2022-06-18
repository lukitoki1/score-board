import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import App from './App';
import { queryClient } from "./api/queryClient";
import { Loading } from "./components/Loading/Loading";
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Suspense fallback={<Loading/>}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </Suspense>
    </ChakraProvider>
  </React.StrictMode>
);

