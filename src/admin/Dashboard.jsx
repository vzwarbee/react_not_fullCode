import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../style/dashboard.css'
import useGetData from '../custom-hooks/useGetData'
const Dashboard = () => {

    const { data: products } = useGetData('products');
    const { data: users } = useGetData('users');
    const { data: orders } = useGetData("orders");

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col className='lg-3'>
                            <div className="revenua__box">
                                <h5>Total Sales</h5>
                                <span>{orders.length}</span>
                            </div>
                        </Col>
                        <Col className='lg-3'>
                            <div className="order__box">
                                <h5>Order</h5>
                                <span>{orders.length}</span>
                            </div>
                        </Col>
                        <Col className='lg-3'>
                            <div className="products__box">
                                <h5>Total Products</h5>
                                <span>{products.length}</span>
                            </div>
                        </Col>
                        <Col className='lg-3'>
                            <div className="users__box">
                                <h5>Total Users</h5>
                                <span>{users.length}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Dashboard