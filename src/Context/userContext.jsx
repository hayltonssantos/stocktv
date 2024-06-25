import { createContext, useEffect, useState } from "react";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    onAuthStateChanged
} from 'firebase/auth';

const UserContext = createContext({})

const UserProvider = ({ children }) => {

    const auth = getAuth();
    const [couldLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState('')

    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = async (/* userState: any */) => {
       /*  console.log('listenAuth', userState) */
        await setUser(auth.currentUser)
        setLoading(false)
    }



    const signIn = (email, password) => {
        /* console.log('xxx', email, password) */
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((/* userCredential */) => {

        }).catch((/* error */) => {
           /* console.log('error', error) */
           setErr(true)
            setLoading(false)
        })

    }

    const signOut = () => {
        /* console.log('sai!!!') */
        setLoading(true)

        signOutFirebase(auth)
            .then(() => {
                console.log("deslogado com sucesso")
            }).catch(() => {
                console.log('error', error)
                setLoading(false)
            })
    }

    return (
        <UserContext.Provider value={{ couldLogin, signIn, signOut, user, loading, err }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }