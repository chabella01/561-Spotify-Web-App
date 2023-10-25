import {React} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import logo from "../../Assets/Images/spotify connections-logos_transparent.png";
import './Register.css'

function Register() {
    return (
        <div className={'login-wrapper'}>
            <img src={logo} alt="Logo" className={"form-logo"}/>
            <Form className={"form-wrapper"}>
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Username</Form.Label>
                    <Form.Control type={'text'}/>
                </Form.Group>
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Password</Form.Label>
                    <Form.Control type={'password'}/>
                </Form.Group>
                <div className={"button-wrapper"}>
                    <Button variant={"primary"} className={"form-button"}>
                        Register
                    </Button>
                </div>

            </Form>
        </div>

    )
}

export default Register
