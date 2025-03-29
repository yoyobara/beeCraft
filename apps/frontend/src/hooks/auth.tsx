import axios from 'axios';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';

interface Auth {
    fullName: string | null;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const info = await axios.get('http://localhost:3333/user/info', {
                withCredentials: true,
            });

            setFullName(info.data.fullName);
        };

        if (isLoggedIn) {
            checkSession();
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, fullName }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('used auth context without provider');
    }

    return context;
}
