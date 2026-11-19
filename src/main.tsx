import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import { TooltipProvider } from '#components/ui/tooltip';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TooltipProvider>
      <App/>
    </TooltipProvider>
  </BrowserRouter>,
)
