import React from 'react'
import { Container } from 'reactstrap'
import '../style/login.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ChoseYourPage = () => {

    const navigate = useNavigate()
    return (
        <section>
            <Container>
                <div className="wrapper__chose" >
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} className='btn-danger btn' to="/Home" onClick={() => navigate('/home')}>To Home</motion.button>

                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .9 }} className='btn-success btn' to="/dashboard" onClick={() => navigate('/dashboard')}>To Dashboard</motion.button>
                </div>
            </Container>
        </section>
    )
}

export default ChoseYourPage