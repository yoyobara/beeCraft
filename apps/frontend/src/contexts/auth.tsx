import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface Auth {
    sessionId: string | null;
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [sessionId, setSessionId] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ sessionId, setSessionId }}>
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
