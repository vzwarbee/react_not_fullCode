import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../style/checkout.css'
import { useSelector } from "react-redux";
import useAuth from '../custom-hooks/customHook'
import { db, storage } from '../firebase.config'
import { collection, addDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";




const Checkout = () => {
    const { currentUser } = useAuth()
    const totalQty = useSelector(state => state.cart.totalQuantity)
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const totalCost = totalAmount + 5


    const [enterDisplayName, setEnterDisplayName] = useState("");
    const [enterNumberPhone, setEnterNumberPhone] = useState('');
    const [enterCity, setEnterCity] = useState('')
    const [enterPostcode, setEnterPostcode] = useState('');
    const [enterContry, setEnterContry] = useState('');
    const [enterTotalCost, setEnterTotalCost] = useState('')

    const navigete = useNavigate()
    // const

    const addProduct = async e => {
        e.preventDefault()

        const addTotalCost = (enterTotalCost) => {
            return enterTotalCost = totalCost
        }
        const addDisplayName = (enterDisplayName) => {
            return enterDisplayName = currentUser.displayName
        }



        // up sản phẩn lên firebase database
        try {
            const docRef = await collection(db, 'orders');

            await addDoc(docRef, {
                displayName: addDisplayName(),
                numberPhone: enterNumberPhone,
                city: enterCity,
                postcode: enterPostcode,
                contry: enterContry,
                totalCost: addTotalCost(),
            });
            toast.success('Product successfully added!!!');
            navigete("/success")
        } catch (error) {

            toast.error('product not add !!')
        }

    }





    return (
        <Helmet title='Checkout'>

            <CommonSection title='Checkout' />

            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h6 className="mb-4 fw-bold">Billing Information</h6>

                            <Form className="billing__form " onSubmit={addProduct}>
                                <Row className="d-flex">
                                    <Col lg='8'>

                                        <FormGroup className="form__group">
                                            <input type="text" placeholder={currentUser.displayName} value={enterDisplayName} onChange={(e) => {
                                                setEnterDisplayName(e.target.value);
                                            }} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your number phone..." value={enterNumberPhone} onChange={e => setEnterNumberPhone(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your City..." value={enterCity} onChange={e => setEnterCity(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your Post code..." value={enterPostcode} onChange={e => setEnterPostcode(e.target.value)} />
                                        </FormGroup>

                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your Country..." value={enterContry} onChange={e => setEnterContry(e.target.value)} />
                                        </FormGroup>
                                    </Col>

                                    <Col lg='4'>
                                        <div className="checkout__cart">
                                            <h6>Total Qty: <span>{totalQty}</span></h6>
                                            <h6>Subtotal: <span>{totalAmount}</span></h6>
                                            <h6>Shipping:
                                                <span>$5</span>
                                            </h6>
                                            <div className="total__cost">
                                                <h4>Total Cost:</h4>
                                                <input type="text" placeholder={`$ ${totalCost}`} value={enterTotalCost} readOnly onChange={e => setEnterTotalCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} type="submit" className=" buy__btn btn__order">Submit Place an order</motion.button>
                            </Form>
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet >
    )
}
export default Checkout;
