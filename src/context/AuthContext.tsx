import { useContext, createContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,

} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext<
    | {
          googleSignIn?: () => Promise<void>;
          logOut?: () => void;
          user?: any;
          canAccess: boolean;
          setCanAccess?: (v: boolean) => void;
      }
    | undefined
>({ canAccess: false });

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<any>({});
    const [canAccess, setCanAccess] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User", currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ user, canAccess: canAccess, setCanAccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
