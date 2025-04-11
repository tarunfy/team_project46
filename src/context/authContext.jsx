'use client'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import Cookies from 'js-cookie'
import { createContext, useState } from 'react'
import { auth } from '../firebase/firebase'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//creating context
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  const getUser = () => {
    const savedUser = Cookies.get('user')
    return savedUser ? JSON.parse(savedUser) : null
  }
  //updating user state
  const updateUser = (value) => {
    Cookies.set('user', JSON.stringify(value), { expires: 7 })
    setUser(value)
  }

  //signIn with email function
  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      console.log('User signed in:', user)
      toast.success('Signed up successfully!')
      return user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('Error signing in:', errorCode, errorMessage)
      toast.error(errorMessage)
      return null
    }
  }

  //creating account with email
  const signUpWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      console.log('User signed up:', user)
      return user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error signing up:', errorCode, errorMessage)
      toast.error('Unable to SignIn', errorMessage)
      return null
    }
  }

  //login/signUp with google acocunt
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed in with Google:', user)
      toast.success('Signed up successfully!')
      return user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
      console.error('Error signing in with Google:', errorCode, errorMessage)
      toast.error('Error signing up. Please try again!')
      return null
    }
  }

  //signout code
  const signOutUser = () => {
    setUser(null)
    Cookies.remove('user')
  }

  //reset password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Signed up successfully!')
    } catch (error) {
      toast.error('Error sending password reset email: ' + error.message)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmail,
        googleLogin,
        signUpWithEmail,
        updateUser,
        signOutUser,
        getUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
