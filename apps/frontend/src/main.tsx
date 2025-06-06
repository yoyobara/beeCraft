import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AuthProvider } from './hooks/auth';

axios.defaults.baseURL = '/api';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
