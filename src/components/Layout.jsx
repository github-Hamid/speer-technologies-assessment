import { Outlet } from 'react-router-dom';
 import Header from '../Header.jsx';
import HeaderNavBar from './HeaderNavBar.jsx';
import "../css/layout.css"
const Layout = () => {
    return (
        <>
        <div className='header-layout'>
        <Header />
        <HeaderNavBar />
        </div>
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout