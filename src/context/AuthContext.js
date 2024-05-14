import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase"
import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

const AuthContext = createContext();

export const UserAuth = () => {
    return useContext(AuthContext)
}

export function AuthContextProvider({children}) {

    
    const [user, setUser] = useState()
    const [userDB, setUserDB] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setUserDB(doc.data()?.savedMovies)
            // console.log(doc.data()?.savedMovies)
        })
    }, [user])


  const movieRef = doc(db, 'users', `${user?.email}`);
  
  const saveMovie = async (movie) => {
    if (user.email) {
        await updateDoc(movieRef, {
            savedMovies: arrayUnion({
                id: movie.id,
                title: movie.title,
                img: movie.backdrop_path
            })
        })
    }
  }

  const deleteMovie = async (passedID) => {
    try {
        const result = userDB?.filter((item) => item.id !== passedID);
        await updateDoc(movieRef, {
            savedMovies: result
        })
    } catch (error) {
        console.log(error)
    }
}

    ///=======================================================

  


    ///=======================================================
    
                
    

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), { savedMovies: []})
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    })

    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user, userDB, saveMovie, deleteMovie}}>
            {children}
        </AuthContext.Provider>
    )
}