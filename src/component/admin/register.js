import React, { useState, useContext, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card, Image } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";
import { Authcontext } from '../context/auth-context';
import ErrorModel from '../model/error-model'
import SuccessModel from '../model/success-model'





export default function Register() {

    const [File, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!File) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(File);
    }, [File]);
    console.log(previewUrl)

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        /* props.onInput(props.id, pickedFile, fileIsValid); */
    };

    const pickImageHandler = (event) => {
        filePickerRef.current.click();

    };

    const [email, setemail] = useState('');
    const [name, setname] = useState('')
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

    const auth = useContext(Authcontext);

    const rgisterSubmitHundler = async event => {
        event.preventDefault();
        console.log(email)
        console.log(name)
        console.log(password)
        console.log(Cpassword)





        if (password === Cpassword) {

            try {
                let response = await fetch('http://localhost:5000/api/user/signup', {
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
            seterror('mot de passe non valide ')
        }
    }




    return (
        <div >

            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <ErrorModel error={error} />
                        <SuccessModel success={success} />
                        <CSSTransition in={true} appear={true} timeout={2000} classNames="slide">

                            <Form onSubmit={rgisterSubmitHundler}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="tapez votre email"
                                            name="email"
                                            onChange={onChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Nom & Prénom</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="votre nom & Prénom "
                                            name="name"
                                            onChange={onChange}
                                            required
                                        />
                                    </Form.Group>
                                </Form.Row>


                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="tapez votre mot de passe"
                                        name="password"
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>


                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Confirmer Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="confirmer votre mot de passe"
                                        name="Cpassword"
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Enregistrer
                                 </Button>
                            </Form>
                        </CSSTransition>

                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    )

}
