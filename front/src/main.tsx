import ReactDOM from 'react-dom/client'
import App from './App'

import MainProvider from '@/providers/MainProvider'

import "@/assets/styles/themes.scss"
import "@/assets/styles/globals.scss"



ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainProvider>
    <App />
  </MainProvider>
)
