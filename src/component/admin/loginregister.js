import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { CSSTransition } from 'react-transition-group'
import Login from './login'
import Register from './register'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card } from 'react-bootstrap';


export default class Pricing extends React.Component {

  state = {
    centent: <Login />

  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: '100px' }}>
          <Row className="justify-content-md-center">
            <Col xs lg="2">

            </Col>
            <Col md="auto">

              <Button variant="outline-secondary"
                onClick={() => { this.setState({ centent: <Login></Login> }) }}
              >Connexion</Button>
              <Button variant="outline-secondary"
                onClick={() => { this.setState({ centent: <Register></Register> }) }}
              >Inscription</Button>

            </Col>
            <Col xs lg="2">

            </Col>
          </Row>

        </Container>


        {this.state.centent}


      </div>
    )
  }
}
