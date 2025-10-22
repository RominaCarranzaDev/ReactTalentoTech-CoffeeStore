import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import 'boxicons/css/boxicons.min.css';
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


createRoot(document.getElementById('root')).render(
   <StrictMode>
        <AppProvider>
            <Router>
                <ScrollToTop />
                <App />
            </Router>
        </AppProvider>
    </StrictMode>
);
