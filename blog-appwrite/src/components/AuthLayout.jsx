import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function AuthLayout({children, authentication = true}) {
    const authStatus = useSelector(state => state.auth.status)
    console.log(authStatus);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(authStatus);
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication) {
            navigate('/')
        }

        setLoading(false)
    }, [authStatus, navigate, authentication])
    return loading ?  <div>Loading...</div> : <>{children}</>
}