import axios from 'axios'
import React from 'react'

const AppContext = React.createContext()

export const AppProvider = ({children})=>{
    const getUser = ()=> {
        let user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(localStorage.getItem('user'))
        }
        else return {}
    }
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirm, setConfirm] = React.useState('')
    const [step, setStep] = React.useState(true)
    const [user, setUser] = React.useState(getUser)
    const [userData, setUserData] = React.useState({})
    const [userLogged, setUserLogged] = React.useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    React.useEffect(()=>{
        if (user.email){
            axios.get(`https://futuremebackend.herokuapp.com/api/v1/users/login?email=${user.email}&password=${user.password}`)
            .then(res => {
                setUserData(res.data)
                setUserLogged(true)
            })
        }
    }, [document.location.pathname])
    return <AppContext.Provider value={{
        email,
        password,
        confirm,
        setConfirm,
        setEmail,
        setPassword,
        setStep,
        step,
        user,
        setUser,
        userLogged,
        setUserLogged,
        userData,
        setUserData,
        isSidebarOpen,
        setIsSidebarOpen
    }}>{children}</AppContext.Provider>
}

const useGlobalContext = ()=>{
    return React.useContext(AppContext)
}

export default useGlobalContext