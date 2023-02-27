import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet.js'
import { Container, Row, Col } from "reactstrap";
import '../style/shop.css'
// import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductsList'
import useGetData from "../custom-hooks/useGetData";




const Shop = () => {


    // console.log(products);
    const { data: products } = useGetData('products')
    const [productsData, setProductsData] = useState(products)




    const handleFilter = e => {
        const filterValue = e.target.value;
        if (filterValue === "sofa") {
            const filteredProducts = products.filter((item) => item.category === "sofa")


            setProductsData(filteredProducts)
        }

        if (filterValue === "mobile") {
            const filteredProducts = products.filter((item) => item.category === "mobile")


            setProductsData(filteredProducts)
        }

        if (filterValue === "chair") {
            const filteredProducts = products.filter((item) => item.category === "chair")


            setProductsData(filteredProducts)
        }

        if (filterValue === "watch") {
            const filteredProducts = products.filter((item) => item.category === "watch")


            setProductsData(filteredProducts)
        }

        if (filterValue === "wireless") {
            const filteredProducts = products.filter((item) => item.category === "wireless")


            setProductsData(filteredProducts)
        }
    }


    // const handleSearch = e => {
    //     const filterValue = e.target.value;

    //     if (filterValue === "all") {
    //         setproductsData(products);
    //     } else {
    //         const filteredProducts = products.filter(item => item.category === filterValue);
    //         setproductsData(filteredProducts);
    //     }
    // };
    const handleSearch = e => {
        const searchItem = e.target.value

        const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchItem.toLowerCase()))

        setProductsData(searchedProducts)
    }

    return (
        <Helmet title='Shop'>
            <CommonSection title='Product' className="common__section-shop" />

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='6'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option>Filter By Category</option>
                                    <option value="sofa">sofa</option>
                                    <option value="mobile">mobile</option>
                                    <option value="chair">chair</option>
                                    <option value="watch">watch</option>
                                    <option value="wireless">wireless</option>
                                </select>
                            </div>
                        </Col>
                        {/* <Col lg='3' md='6' className="text-end">
                            <div className="filter__widget">
                                <select>
                                    <option>Sort By</option>
                                    <option value="ascending">ascending</option>
                                    <option value="descending">descending</option>
                                </select>
                            </div>
                        </Col> */}
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder="Search........" onChange={handleSearch} />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row className="all__item">
                        {
                            productsData.length === 0 ? (<h1 className="text-center fs-4">No Product are found</h1>) : (<ProductsList data={productsData} />
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;