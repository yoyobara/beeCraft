import './global.scss';
import { Navbar } from './pages/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign_in" element={<SignInPage />} />
                <Route path="/sign_up" element={<SignUpPage />} />
            </Routes>
        </>
    );
}
