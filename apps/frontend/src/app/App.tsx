import '../global.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/auth';
import { WorldsProvider } from '../hooks/worlds';
import styles from './App.module.scss';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { WorldsPage } from './WorldsPage';

export function Private({
    children,
    accessType,
}: { accessType: 'user' | 'guest' } & PropsWithChildren) {
    const { fullName } = useAuth();

    if (accessType === 'user' && fullName === null) {
        return <Navigate to="/" />;
    }

    if (accessType === 'guest' && fullName !== null) {
        return <Navigate to="/worlds" />;
    }

    return children;
}

export function App() {
    return (
        <div className={styles.app}>
            <Navbar />
            <div className={styles.rest_of_page}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Private accessType="guest">
                                <LandingPage />
                            </Private>
                        }
                    />
                    <Route
                        path="/sign_in"
                        element={
                            <Private accessType="guest">
                                <SignInPage />
                            </Private>
                        }
                    />
                    <Route
                        path="/sign_up"
                        element={
                            <Private accessType="guest">
                                <SignUpPage />
                            </Private>
                        }
                    />
                    <Route
                        path="/worlds"
                        element={
                            <Private accessType="user">
                                <WorldsProvider>
                                    <WorldsPage />
                                </WorldsProvider>
                            </Private>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}
