import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import '../style/login.css'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from '../firebase.config'
import { storage } from "../firebase.config";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            const storageRef = ref(storage, `image/${Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    // up user and avatar
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });

                    // data trong firebase
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    })
                });
            })

            setLoading(false);
            toast.success("Account created")
            navigate('/login')
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong!!!")
        }
    }

    return (
        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? (<Col lg='12' className="text-center">
                                <h3 className="fw-bold">Loading.........</h3>
                            </Col>) : (
                                <Col lg='5' className="m-auto text-center">
                                    <h3 className="fw-bold mb-4">Signup</h3>
                                    <Form className="auth__form" onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input type="text" id="username" placeholder="Enter Username....." value={username} onChange={e => setUsername(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="email" id="email" placeholder="Enter email....." value={email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="password" id="password" placeholder="Enter password....." value={password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="file" onChange={e => setFile(e.target.files[0])} />
                                        </FormGroup>

                                        <button type="submit" className="buy__btn auth__btn">Create an Account</button>
                                        <p>Already have an account? <Link to='/login'>Have an account</Link></p>
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

export default Signup;
