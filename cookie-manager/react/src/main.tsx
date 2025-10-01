import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CookieManagerProvider } from '@lib'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<CookieManagerProvider>
			<App />
		</CookieManagerProvider>
	</StrictMode>
)
