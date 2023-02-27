import React from 'react'
import { Container, Row, Col, } from 'reactstrap'
import Table from 'react-bootstrap/Table';
import '../style/success.css'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useGetData from '../custom-hooks/useGetData'

const Success = () => {
  const { data: orders, loading } = useGetData('orders')



  const navigate = useNavigate()
  return (
    <section>
      <Container>
        <Row>
          <div className="success__header text-center">
            <h1>Order Creation Successful</h1>
            <span><i class="ri-checkbox-circle-line"></i></span>
          </div>
          <Col lg='12' className='d-flex align-items-center justify-content-center'>

            {
              loading ? <h3 className="fw-bold">Loading.........</h3> : orders.map((e) => (
                <Table striped bordered hover size="sm" className='table__success'>

                  <thead>
                    <tr>
                      <th>Client:</th>
                      <th>Number phone:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-data'>{e.displayName}</td>
                      <td className='text-data'>(+84) {e.numberPhone}</td>
                    </tr>
                    <tr>
                      <th>Payment:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Total cost:</th>
                      <td className='text-data'>${e.totalCost}</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                    </tr>
                    <tr>
                      <td className='text-data '>Unpaid Status</td>
                    </tr>
                  </tbody>
                </Table>
              ))

            }


          </Col>
          <Col lg='6' className='text-center'>
            <motion.button onClick={() => navigate('/home')} whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} className='btn btn-danger' >Back to home</motion.button>
          </Col>
        </Row>
      </Container>
    </section >
  )
}

export default Success