import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import { TooltipProvider } from '#components/ui/tooltip';
import { Toaster } from '#components/ui/toast';
import { AuthProvider } from './context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TooltipProvider>
      <AuthProvider>
          <App/>
        <Toaster />
      </AuthProvider>
    </TooltipProvider>
  </BrowserRouter>,
)
