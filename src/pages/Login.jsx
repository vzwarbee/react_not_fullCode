import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../style/login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const signIn = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user
            console.log(user);
            setLoading(false);
            toast.success('Login Complete');
            navigate('/checkout');


        } catch (error) {
            setLoading(false);
            console.log(error);

            toast.error(error.message);
        }
    }

    return (
        <Helmet title='Login'>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? (<Col lg='12' className="text-center"><h3 className="fw-bold">Loading........</h3></Col>) : (
                                <Col lg='5' className="m-auto text-center">
                                    <h3 className="fw-bold mb-4">Login</h3>
                                    <Form className="auth__form" onSubmit={signIn}>
                                        <FormGroup className="form__group">
                                            <input type="email" id="email" placeholder="Enter email....." value={email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="password" id="password" placeholder="Enter password....." value={password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>

                                        <button type="submit" className="buy__btn auth__btn">Login</button>
                                        <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                                    </Form>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Login;
