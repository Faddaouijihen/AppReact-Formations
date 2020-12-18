import React, { useContext, useState } from "react";
import { CSSTransition } from 'react-transition-group'
import '../style1.css';
import { Authcontext } from '../context/auth-context';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card } from 'react-bootstrap';
import ErrorModel from '../model/error-model';
import SuccessModel from '../model/success-model';




export default function Login() {



    /*    this.state = {
   
           email: '',
           mdp: ''
   
   
       }; */
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)







    const onChange = (event) => {
        if (event.target.name === "email") {
            setemail(event.target.value)
        } else if (event.target.name === "password") {
            setpassword(event.target.value)
        }

    }
    const auth = useContext(Authcontext);

    const loginSubmitHundler = async event => {
        event.preventDefault();

        try {

            let response = await fetch('http://localhost:5000/api/condidat/login', {
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
            auth.login(responsedata.userId, responsedata.token);
            window.location.href = "http://localhost:3000/";


        } catch (err) {
            seterror(err.message || 'il y a un probleme');

        }




    }

    return (
        <div >

            <div style={{ textAlign: "center", marginTop: '20px', marginBottom: '20px' }}>
                <h1 >Se connecter</h1>
                <div style={{ display: 'inline-flex', width: '100%' }}>

                </div>
            </div>
            <Container >
                <Row className="justify-content-md-center">

                    <Col >
                        <ErrorModel error={error} />
                        <SuccessModel success={success} />
                        <CSSTransition in={true} appear={true} exit={true} timeout={2000} classNames="slide">


                            <Form onSubmit={loginSubmitHundler}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Adresse e-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        required
                                        onChange={onChange}
                                        placeholder="Entrez votre email"
                                    /*  value={this.state.email}
                                     onInput={this.onChange.bind(this)} */
                                    />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Mot de passe"
                                        name="password"
                                        onChange={onChange}
                                        required
                                    /*  value={this.state.mdp}
                                     onInput={this.onChange.bind(this)} */

                                    />
                                </Form.Group>

                                <Button variant="dark" type="submit">
                                    Connexion
                                    </Button>
                            </Form>
                        </CSSTransition>
                    </Col>

                </Row>

            </Container>
        </div>
    )

}
