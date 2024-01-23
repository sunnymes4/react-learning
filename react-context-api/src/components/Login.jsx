import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const {setUser} = useContext(UserContext)

    function handleChange(e) {
        e.preventDefault();
        setUser({username, password});
        setUsername('');
        setPassword('');
    }

  return (
    <div className="card">
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleChange}>
            Save User
        </button>
    </div>
  )
}
