import {React, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useAuth} from "../Routing/AuthProvider";
import Container from "react-bootstrap/Container";
import './Connections.css'
import {useNavigate} from "react-router-dom";
function Connections() {

    const [sessionId, setessionId] = useState(0)

    const navigate = useNavigate()

    const handleChangeInput = (e) => {
        setessionId(e)
    }

    const handleClickJoinSession = (e) => {
        e.preventDefault()
        navigate('/sessions', { state: { sessionId: sessionId }})
    }

    const handleClickCreateSession = (e) => {
        e.preventDefault()
        navigate('/create_session')
    }


    return (
        <Container className={'connections-container'}>
            <label htmlFor={'numericInput'}> Enter a Session ID To Join A Pre Existing Session</label>
            <input
                type={'number'}
                id={'numericInput'}
                min={0}
                max={9999}
                onChange={handleChangeInput}
            />
            <Button className={'session-button'} onClick={handleClickJoinSession}>
                Join Session
            </Button>
            <div className={'gen-text'}> Or </div>
            <Button className={'session-button'} onClick={handleClickCreateSession}>
                Create a New Session
            </Button>
        </Container>
    )
}

export default Connections
