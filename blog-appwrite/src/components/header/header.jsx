
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./logo"
import LogoutBtn from "./logoutBtn"
import { Container } from '../index'

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Login',
            path: '/login',
            active: !authStatus
        },
        {
            name: 'SignUp',
            path: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            path: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            path: '/add-post',
            active: authStatus
        }
    ]
  return (
    <header className='bg-gray-950 flex mx-auto px-4'>
        <Container>
            <nav className="flex justify-center items-center h-16 ">
            <div className="flex items-center">
                <div className="flex-shrink-0 text-orange-500 font-bold">
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                </div>
                <ul className="ml-10 flex items-baseline space-x-4 menu-items">
                    {
                        navItems.map((item) => 
                            item.active ? (
                                <li 
                                    key={item.name}
                                    className="bg-gray-900 px-4 py-2 text-white rounded-md text-sm hover:bg-gray-800 active:bg-gray-900"
                                >
                                    <button
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                    )}

                    {
                        authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )
                    }
                </ul>
            </div>
               
            </nav>
        </Container>

    </header>
  )
}

export default Header
