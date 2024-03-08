import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './lib';
import { TuoToastProvider } from "./lib/contexts/TuoToastContext"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TuoToastProvider>
    <App />
  </TuoToastProvider>
)