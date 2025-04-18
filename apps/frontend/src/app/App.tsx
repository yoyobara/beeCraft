import '../global.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { WorldsPage } from './WorldsPage';
import { useAuth } from '../hooks/auth';
import { PropsWithChildren } from 'react';

export function OnlyGuest({ children }: PropsWithChildren) {
    const { fullName } = useAuth();

    return fullName === null ? children : <Navigate to="/worlds" />;
}

export function App() {
    return (
        <div className={styles.app}>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <OnlyGuest>
                            <LandingPage />
                        </OnlyGuest>
                    }
                />
                <Route
                    path="/sign_in"
                    element={
                        <OnlyGuest>
                            <SignInPage />
                        </OnlyGuest>
                    }
                />
                <Route
                    path="/sign_up"
                    element={
                        <OnlyGuest>
                            <SignUpPage />
                        </OnlyGuest>
                    }
                />
                <Route path="/worlds" element={<WorldsPage />} />
            </Routes>
        </div>
    );
}
