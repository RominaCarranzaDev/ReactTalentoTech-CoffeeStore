import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import 'boxicons/css/boxicons.min.css';
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


createRoot(document.getElementById('root')).render(
   <StrictMode>
        <AuthProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <App />
                </Router>
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
