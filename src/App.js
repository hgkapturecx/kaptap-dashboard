import React, { useEffect, useState } from 'react'
import { isAuthenticated } from './utils/genral.function'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'


 const App = () => {
    const [isAuthenticate ,setIsAuthenticate] = useState(false)

    useEffect(()=>{
        setIsAuthenticate(isAuthenticated())
    }, [isAuthenticate])

    if(isAuthenticate){

        return (
          <HomePage/>
        )
    }

    return (
        <AuthPage/>

    )
}

export default App
