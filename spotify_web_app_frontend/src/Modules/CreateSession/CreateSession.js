import {React, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useAuth} from "../Routing/AuthProvider";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";


function CreateSession() {

    return (
        <Container className={'connections-container'}>
            <div> Welcome to the create sessions page </div>
        </Container>
    )
}

export default CreateSession
