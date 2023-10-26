import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import {matchRoutes, useLocation, useNavigate} from "react-router-dom";
import './Header.css'
import logo from "../../Assets/Images/spotify connections-logos_white.png"
import {React} from "react";
import Button from "react-bootstrap/Button";
import {useAuth} from "../Routing/AuthProvider";

function Header() {
    const navigate = useNavigate()

    const routes = [
        {path: '/connections'},
        {path: '/sessions'},
        {path: '/login'},
        {path: '/register'},
        {path: '/create_session'},
        {path: '/'},
        {path: '/callback'}

    ]
    const auth = useAuth()

    const location = useLocation()
    const [{route}] = matchRoutes(routes, location)
    const renderNavBar = () => {
        if (!(route.path === '/login') && !(route.path === '/register')) {
            return (
                <>
                    <Nav.Link onClick={auth.logout}>
                        Logout
                    </Nav.Link>
                    <Nav.Link className={'nav-link'}>
                        Profile
                    </Nav.Link>
                </>
            )
        }
        else {
            return (
                <Nav.Link className={'nav-link'}>
                    About Us
                </Nav.Link>
            )
        }
    }


    return (
        <Navbar expand={'lg'} className={'navbar-wrapper'} sticky={'top'}>
            <img src={logo} alt="Logo" className={"header-logo"}/>
            <Container fluid className={'container'}>
                {renderNavBar()}
            </Container>
        </Navbar>
    )
}

export default Header