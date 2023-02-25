import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet'

const Order = () => {
    const navigate = useNavigate();

    const { data: ordersData, loading } = useGetData("orders")

    const deleteOrder = async id => {
        await deleteDoc(doc(db, "orders", id))
        toast.success("Deleted complete!")
    }


    return (
        <Helmet title={'All Products'}>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Phone number</th>
                                        <th>City</th>
                                        <th>Contry</th>
                                        <th>Post code</th>
                                        <th>
                                            Price
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <h3 className='py-5 text-center'>Loading........</h3> :
                                            ordersData.map(e => {


                                                return (
                                                    < tr >
                                                        <td>
                                                            {e.displayName}
                                                        </td>
                                                        <td>{e.numberPhone}</td>
                                                        <td>{e.city}</td>
                                                        <td>{e.contry}</td>
                                                        <td>{e.postcode}</td>
                                                        <td>${e.totalCost > 0 ? e.totalCost : 0}</td>
                                                        <td>
                                                            <button onClick={() => deleteOrder(e.id)} className='btn-danger btn'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>

                            {/* <a href={navigate}>create product</a> */}
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet >
    )
}

export default Order;