import './global.scss';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { useAuth } from '../contexts/auth';

export default function App() {
    const { sessionId } = useAuth();

    return (
        <>
            <Navbar />
            {sessionId === null ? <LandingPage /> : <p>signed in!</p>}
        </>
    );
}
