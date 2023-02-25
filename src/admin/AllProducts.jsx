import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet'

const AllProducts = () => {
    const navigate = useNavigate();
    const { data: productsData, loading } = useGetData("products");
    const deleteProduct = async id => {
        await deleteDoc(doc(db, "products", id))
        toast.success("Deleted complete!")
    }


    return (
        <Helmet title={'All Products'}>
            <section>
                <Container>
                    <Row>
                        <Col lg='2'>
                            <button className='btn btn-success mb-3' onClick={() => navigate('/dashboard/add-product')}>New Product</button>
                        </Col>
                        <Col lg='12'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>
                                            Actione
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <h3 className='py-5 text-center'>Loading........</h3> :
                                            productsData.map(e => (
                                                <tr >
                                                    <td>
                                                        <img src={e.imgUrl} alt="" />
                                                    </td>
                                                    <td>{e.productName}</td>
                                                    <td>{e.category}</td>
                                                    <td>${e.price}</td>
                                                    <td>
                                                        <button onClick={() => deleteProduct(e.id)} className='btn-danger btn'>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>

                            {/* <a href={navigate}>create product</a> */}
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default AllProducts