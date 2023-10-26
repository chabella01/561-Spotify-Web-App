import {React, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import logo from "../../Assets/Images/spotify connections-logos_transparent.png";
import './Register.css'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Routing/AuthProvider";
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')
    const [email, setEmail] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(true)


    useEffect(() => {
        if (
            username.length === 0 ||
            password.length === 0 ||
            email.length === 0 ||
            passwordVerify.length === 0 ||
            passwordsMatch === false
        ) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }

        if (password !== passwordVerify) {
            setPasswordsMatch(false)
        }
        else {
            setPasswordsMatch(true)
        }

    }, [username, password, email, passwordVerify, passwordsMatch])

    const base_url = 'http://127.0.0.1:8000/'

    const auth = useAuth()

    const navigate = useNavigate()
    const handleBackToLogin = () => {
        navigate('/login')
    }

    const handleChangeUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    const handleChangePasswordVerify = (e) => {
        e.preventDefault()
        setPasswordVerify(e.target.value)
    }

    const handleChangeEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleRegister = async () => {
        try {
            if (password === '' || email === '' || password == '' || username === '') {
                console.log('please fill out all required information ')
            } else {
                const response = await axios.post(base_url + 'register', {
                    username: username,
                    email: email,
                    password: password
                })
                await auth.login(response.data)
                console.log(response)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={'login-wrapper'}>
            <Form className={"form-wrapper"}>
                <div className={'header-login'}>
                    Register New Account
                </div>
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Email</Form.Label>
                    <Form.Control
                        value={email}
                        type={'email'}
                        onChange={handleChangeEmail}
                    />
                </Form.Group>
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Username</Form.Label>
                    <Form.Control
                        type={'text'}
                        value={username}
                        onChange={handleChangeUsername}
                    />
                </Form.Group>
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Password</Form.Label>
                    <Form.Control
                        value={password}
                        type={'password'}
                        onChange={handleChangePassword}
                    />
                </Form.Group>
                {!passwordsMatch ?
                    <Alert
                        className={'alert-warning'}
                        variant={'warning'}
                    >
                        Warning: passwords do not match
                    </Alert> : null
                }
                <Form.Group className={"login-group"}>
                    <Form.Label className={"form-text"}>Verify Password</Form.Label>
                    <Form.Control
                        value={passwordVerify}
                        type={'password'}
                        onChange={handleChangePasswordVerify}
                    />
                </Form.Group>
                <div className={"button-wrapper"}>
                    <Button
                        variant={"primary"}
                        className={"form-button"}
                        onClick={handleRegister}
                        disabled={buttonDisabled}
                    >
                        Register
                    </Button>
                </div>
                <div className={'register-wrapper'}>
                    <div className={"form-text sub-font-color"}> Already have an account?</div>
                    <div onClick={handleBackToLogin} className={"form-text change-cursor"}>
                        Click here to login
                    </div>
                </div>
            </Form>
        </div>

    )
}

export default Register
