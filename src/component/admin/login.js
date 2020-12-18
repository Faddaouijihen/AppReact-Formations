import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'
import { CSSTransition } from 'react-transition-group'

import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { Authcontext } from '../context/auth-context';
import ErrorModel from '../model/error-model'



export default function Login() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState(false)

    const onChange = (event) => {
        if (event.target.name === "email") {
            setemail(event.target.value)
        } else {
            setpassword(event.target.value)
        }

        console.log(event.target.name)
    }
    const auth = useContext(Authcontext);

    const loginSubmitHundler = async event => {
        event.preventDefault();
        console.log(email);
        console.log(password)
        try {
            let response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            let responsedata = await response.json();
            if (!response.ok) {
                throw new Error(responsedata.message)
            }
            auth.loginentreprise(responsedata.userId, responsedata.token)

        
            console.log(responsedata.userId)
            console.log(responsedata.token)
         
 
            window.location.href = "http://localhost:3000";
            

        }
        catch (err) {
            console.log(err);
            seterror(err.message || 'il y a un probleme');

        }

       


    }

    return (
        <div >
            
            <Container >
                <Row className="justify-content-md-center">
                    <Col >

                    </Col>
                    <Col xs={6}>
                    <ErrorModel error={error}  />
                    
                        <CSSTransition in={true} appear={true} exit={true} timeout={2000} classNames="slide">

                            


                            <Form onSubmit={loginSubmitHundler}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Adresse Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        onChange={onChange}
                                        required

                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="mot de passe"
                                        name="password"
                                        onChange={onChange}
                                        required

                                    />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Connexion
                                    </Button>
                            </Form>
                        </CSSTransition>
                    </Col>
                    <Col>

                    </Col>
                </Row>

            </Container>
        </div>
    )

}
