import React, { useState } from "react";
import '../style1.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ErrorModel from '../model/error-model';
import SuccessModel from '../model/success-model';





export default function Register() {



    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Cpassword, setCpassword] = useState('');




    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)



    const onChange = (event) => {
        if (event.target.name === "email") {
            setemail(event.target.value)

        } else if (event.target.name === "name") {
            setname(event.target.value)
        } else if (event.target.name === "password") {
            setpassword(event.target.value)
        } else if (event.target.name === "Cpassword") {
            setCpassword(event.target.value)
        }

        console.log(event.target.name)
    }


    const rgisterSubmitHundler = async (event) => {
        event.preventDefault();

        console.log(name)
        console.log(email)
        console.log(password)
        console.log(Cpassword)



        if (password === Cpassword) {

            try {
                let response = await fetch('http://localhost:5000/api/condidat/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,

                    })
                });
                let responsedata = await response.json();
                if (!response.ok) {
                    throw new Error(responsedata.message)
                }
                setsuccess('Votre compte est ajouter')



                console.log(responsedata)
            }
            catch (err) {
                console.log(err);
                seterror(err.message || 'il y a un probleme');

            }



        } else {
            seterror('mot de passe invalide')
        }



    }


    return (
        <div >

            <div style={{ textAlign: "center", marginTop: '20px', marginBottom: '20px' }}>
                <h1 >Inscription</h1>
                <div style={{ display: 'inline-flex', width: '100%' }}>

                </div>
            </div>

            <Container>
                <Row>

                    <Col >
                        <ErrorModel error={error} />
                        <SuccessModel success={success} />
                        <CSSTransition in={true} appear={true} timeout={2000} classNames="slide">


                            <Form onSubmit={rgisterSubmitHundler}>


                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Nom & Prénom</Form.Label>
                                    <Form.Control
                                        name="name"
                                        onChange={onChange}
                                        required
                                        placeholder="tapez votre nom et prénom" />
                                </Form.Group>

                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={onChange}
                                        required
                                        placeholder="tapez votre email" />
                                </Form.Group>


                                <Form.Group controlId="formGridPassword">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password"
                                        name="password"
                                        onChange={onChange}
                                        required
                                        placeholder="tapez votre mot de passe" />
                                </Form.Group>


                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Confirmer Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="Cpassword"
                                        onChange={onChange}
                                        required
                                        placeholder="confirmer votre password" />
                                </Form.Group>

                             



                                <Button variant="primary" type="submit">
                                    Enregistrer
                                 </Button>
                            </Form>
                        </CSSTransition>

                    </Col>

                </Row>

            </Container>
        </div>
    )

}
