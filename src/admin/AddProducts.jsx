import React, { useState } from 'react'
import { Form, FormGroup, Container, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../style/product-add.css'
import Helmet from '../components/Helmet/Helmet'


const AddProducts = () => {



    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('')
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigete = useNavigate()


    const addProduct = async e => {
        e.preventDefault()
        setLoading(true)

        // up sản phẩn lên firebase database
        try {
            const docRef = await collection(db, 'products');

            const storageRef = ref(storage, `productImage/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
            console.log(uploadTask);

            uploadTask.on(() => {
                toast.error('images not uploaded')
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURl) => {
                    await addDoc(docRef, {
                        productName: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURl,
                    })
                })
            })
            setLoading(false)
            toast.success('Product successfully added!!!');
        } catch (error) {
            setLoading(false)

            toast.error('product not add !!')
        }

    }

    return (
        <Helmet title={'Add Product'}>
            <section>

                <Container>
                    <Row>
                        <Col lg='12'>
                            {
                                loading ? <h4 className='fw-bold py-5'>Loadding.......</h4> : (
                                    <>
                                        <h4 className='mb-5'>Add Product</h4>
                                        <Form onSubmit={addProduct} onLoad>

                                            <FormGroup className="form__group">
                                                <span>Product title</span>
                                                <input type="text" placeholder='Double ' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                                            </FormGroup>

                                            <FormGroup className="form__group">
                                                <span>Short Description</span>
                                                <input type="text" placeholder='Lorem.......' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                                            </FormGroup>

                                            <FormGroup className="form__group">
                                                <span>Description</span>
                                                <input type="text" placeholder='Description........' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                                            </FormGroup>
                                            <div className='d-flex align-items-center justify-content-between gap-5'>
                                                <FormGroup className="form__group w-50">
                                                    <span>Price</span>
                                                    <input type="number" placeholder='Price' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                                                </FormGroup>

                                                <FormGroup className="form__group w-50">
                                                    <span>Category</span>
                                                    <select required className='w-100 p-2' onChange={e => setEnterCategory(e.target.value)}>
                                                        <option required>Chose your category</option>
                                                        <option value="chair">Chair</option>
                                                        <option value="sofa">Sofa</option>
                                                        <option value="mobile">Mobile</option>
                                                        <option value="watch">Watch</option>
                                                        <option value="wireless">Wireless</option>
                                                    </select>
                                                </FormGroup>
                                            </div>

                                            <div>
                                                <FormGroup className="form__group">
                                                    <span>Product Image</span>
                                                    <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                                                </FormGroup>
                                            </div>

                                            <button id='btn' className='buy__btn btn' type='submit'>Add product</button>

                                            <button id='btn' className='buy__btn btn ' onClick={() => navigete('/dashboard/all-products')}>All product</button>
                                        </Form>
                                    </>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default AddProducts
