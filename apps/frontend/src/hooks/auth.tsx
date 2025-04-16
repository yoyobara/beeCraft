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
    isLoading: boolean;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fullName, setFullName] = useState<string | null>(null);

    const refreshAuth = async () => {
        const info = await axios.get('http://localhost:3333/user/info', {
            withCredentials: true,
            validateStatus: (status) => [200, 401].includes(status),
        });

        setFullName(info.status === 200 ? info.data.fullName : null);
        setIsLoading(false);
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ fullName, isLoading, refreshAuth }}>
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
