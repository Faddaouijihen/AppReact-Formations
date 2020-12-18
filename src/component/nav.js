import React, { useContext } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Dropdown,
    DropdownButton,
    ButtonGroup,
} from "react-bootstrap";
import Modellogin from "./modellogin";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Authcontext } from "./context/auth-context";

export default function Navmenu() {
    const auth = useContext(Authcontext);

    const logout = () => {
        auth.logout();
        window.location.href = "http://localhost:3000";
    }
    const Elogout = () => {
        auth.Elogout();
        window.location.href = "http://localhost:3000";
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/"><h2><b>Acceuil</b></h2> </Navbar.Brand>
            <Nav className="mr-auto">
           
             


              

         
            </Nav>

            {auth.isLoggedIn && (
                <DropdownButton
                    as={ButtonGroup}
                    title="Espace Candidat"
                    id="bg-nested-dropdown"
                >

                    <Dropdown.Item eventKey="2" onClick={logout}>Se déconnecter</Dropdown.Item>
                </DropdownButton>
            )}
            {auth.isentrprise && (
                <DropdownButton
                    as={ButtonGroup}
                    title="Espace Entreprise"
                    id="bg-nested-dropdown"
                >
                    <Dropdown.Item eventKey="3"><Link to="/entreprise/ajouter-annonce">Ajouter Forrmation</Link></Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={Elogout}>Se déconnecter</Dropdown.Item>

                </DropdownButton>
            )}

            {!auth.isLoggedIn & !auth.isentrprise && (
                <Form inline>
                    <Modellogin></Modellogin>
                </Form>
            )}

            {!auth.isLoggedIn & !auth.isentrprise && (

                <Link to="/entrepriselogin"><h5><b>Espace admin</b></h5></Link>
            )}
        </Navbar>
    );
}
