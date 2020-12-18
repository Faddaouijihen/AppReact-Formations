import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Container, Row, Carousel, Card } from 'react-bootstrap';
import { Authcontext } from './context/auth-context';
import { useParams } from 'react-router-dom'
import ErrorModel from './model/error-model'
import SuccessModel from './model/success-model';



export default function Dannonces() {

    const [annonce, setannonce] = useState();
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(null);






    const formationid = useParams().fid;


    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/formation/${formationid}`);

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message)
                }


                setannonce(responseData.Formation)






            } catch (err) {
                seterror(err.message)

            }
        };

        sendRequest();

    }, []);
    console.log(annonce)
    const auth = useContext(Authcontext)


    const addcondidatures = async (event) => {

        event.preventDefault();

        try {
            let response = await fetch(`http://localhost:5000/api/condidat/addcondidature`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idannonce: annonce && annonce.id,
                    idcondidat: auth.condidatId

                })
            });
            let responsedata = await response.json();
            if (!response.ok) {
                throw new Error(responsedata.message)
            }
            setsuccess('Vous avez postuler pour cette formation')



            console.log(responsedata)

        }
        catch (err) {
            console.log(err);

            seterror(err.message || 'probleme!!')

        }



    }



    return (
        <div style={{ marginTop: "40px" }}>
            <Container>
                <Row>
                    <Col>

                      


                    </Col>

                    <Col xs={8}>
                        <ErrorModel error={error} />
                        <SuccessModel success={success} />

                        <Card >
                            <Card.Body>
                                <h3>{annonce && annonce.title}</h3>
                                

                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <h5>Description de l'offre:</h5>

                                <p>{annonce && annonce.description}</p>

                            </Card.Body>
                        </Card>
                        <form onSubmit={addcondidatures}>
                            {auth.isLoggedIn ? (
                                <Button variant="primary" type="submit">Postuler maintenant</Button>

                            ) : <Button variant="primary">Connectez-vous pour postuler</Button>}
                        </form>

                    </Col>
                    <Col></Col>
                </Row>
            </Container>






        </div>

    )

}
