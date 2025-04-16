import '../global.scss';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { WorldsPage } from './WorldsPage';

export default function App() {
    return (
        <div className={styles.app}>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign_in" element={<SignInPage />} />
                <Route path="/sign_up" element={<SignUpPage />} />
                <Route path="/worlds" element={<WorldsPage />} />
            </Routes>
        </div>
    );
}
