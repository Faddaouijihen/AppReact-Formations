import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";
import { Authcontext } from '../context/auth-context';
import ErrorModel from '../model/error-model'
import SuccessModel from '../model/success-model'





export default function Ajouter_Annonce() {

  const [title, settitle] = useState('');

  const [description, setdescription] = useState('');
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onChange = (event) => {
    if (event.target.name === "title") {
      settitle(event.target.value)
    }  else if(event.target.name === "description"){
      setdescription(event.target.value)
    } 
    console.log(event.target.name)

  }

  const auth = useContext(Authcontext)
  const ajoutSubmithundler = async event => {
    event.preventDefault();

    try {
      let response = await fetch('http://localhost:5000/api/formation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
        
          description: description,
     
        })
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message)
      }
      setsuccess('Votre formation est ajouter')



      console.log(responsedata)
    }
    catch (err) {
      console.log(err);

      seterror(err.message || 'probleme!!')

    }
  }

  return (
    <div>


      <h1>Ajouter une formations</h1>


      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />

            <Form onSubmit={ajoutSubmithundler}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={onChange}
                  placeholder="Titre du poste demandé"
                  required />
              </Form.Group>

              
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Déscription</Form.Label>
                <Form.Control
                  name="description"
                  onChange={onChange}
                  as="textarea"
                  rows="6"
                  required />
              </Form.Group>



              <Button variant="primary" type="submit">Ajouter</Button>
            </Form>

          </Col>




          <Col></Col>
        </Row>

      </Container>



    </div >
  )

}