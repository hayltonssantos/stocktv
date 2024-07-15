import { createContext, useEffect, useState } from "react";

import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
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
    let [userNameSliceEmail, setUserNameSliceEmail] = useState()
    let [userNameSliceDot, setUserNameSliceDot] = useState()
    const [email, setEmail] = useState();

  const [returnUrl, setReturnUrl] = useState('/');

    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = async (/* userState: any */) => {
       /*  console.log('listenAuth', userState) */
        await setUser(auth.currentUser)
        setLoading(false)
    }

    const getInformations = () =>{
        userNameSliceEmail = user.email.substring(0,user.email.indexOf("@"))
        userNameSliceEmail = userNameSliceEmail.toUpperCase()
        userNameSliceDot = String( user.email.substring(0,user.email.indexOf("."))).replace([/[,|\s]+/g,". "])
        userNameSliceDot = userNameSliceDot.toUpperCase()
        return [userNameSliceEmail, userNameSliceDot]
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

    const handleReset = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email).then(data=>{
        alert("Check your email")
        }).catch(err=>{
        console.log(err)
        alert(err.code)
        })
    }

    const handleCreate = async (e,email, senha ) =>{
        e.preventDefault()
        await createUserWithEmailAndPassword(auth,email,senha).then(userCredential=>{
            alert("Sucesso")
            setUser(userCredential.user) 
        }).catch(err=>{
                alert(err.code)
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
        <UserContext.Provider value={{ couldLogin, signIn, signOut, user, loading, err, returnUrl, setReturnUrl, 
        handleReset, getInformations, setEmail,handleCreate}}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }