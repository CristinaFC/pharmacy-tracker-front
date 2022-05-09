
import React, { Component } from 'react';
import { getProducts, getPharmacyProducts } from '../../database/functions';
import { Link, useLocation } from 'react-router-dom';
import Routing from '../../routing/Routing';


class PharmacyProducts extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            uid: '',
        }
    }

    async componentDidMount()
    {
        this.pharmacyProducts();
    }

    async getAllPharmacyProductsInformation(pharmacyProducts) 
    {
        const allProducts = await getProducts();
        const keys = Object.keys(pharmacyProducts);
        const productsCopy = [];

        keys.forEach((key) =>
        {
            allProducts.map((product) =>
            {
                if (product.id === key)
                {
                    const p = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        price: pharmacyProducts[key].price,
                        stock: pharmacyProducts[key].stock
                    }
                    productsCopy.push(p);
                }
            })

            this.setState({ products: productsCopy });

        });
    }

    async pharmacyProducts() 
    {

        const pharmacyProducts = await getPharmacyProducts(this.state.uid);

        await this.getAllPharmacyProductsInformation(pharmacyProducts);

    };

    productDetails(product)  
    {
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><b>{product.name}</b></h5>
                    <p class="card-text">{product.description}</p>
                    <Link to={`${Routing.productDetails}${product.name}`} class="card-link">See details</Link>
                </div>
            </div>

        );
    }

    render()
    {

        function SetUID()
        {
            const id = useLocation().pathname.split('/')[2];
            this.setState({ uid: id });
        }
        SetUID();
        const { products } = this.state;

        return (

            <div class="container">
                <div class="title-container">
                    <div class="title">
                        <h1>Products</h1>
                    </div>
                </div>
                <div class="products-container">
                    {products !== undefined ? products.map((product) => this.productDetails(product)) : ""}
                </div>
            </div >
        );
    }


}


export default PharmacyProducts;