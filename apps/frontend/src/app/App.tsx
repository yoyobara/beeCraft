import './global.scss';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { Route, Routes } from 'react-router-dom';
import { SignInPage } from './SignInPage';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign_in" element={<SignInPage />} />
            </Routes>
        </>
    );
}
