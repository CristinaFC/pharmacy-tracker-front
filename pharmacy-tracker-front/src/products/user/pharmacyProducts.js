
import React, { useState, useEffect } from 'react';
import { getProducts, getPharmacyProducts } from '../../database/functions';
import { Link, useLocation } from 'react-router-dom';
import Routing from '../../routing/Routing';


export const PharmacyProducts = () =>
{

    const [products, setProducts] = useState();
    const id = useLocation().pathname.split('/')[2];

    useEffect(() =>
    {

        pharmacyProducts();

    }, [])

    function pharmacyProducts()
    {

        getPharmacyProducts(id).then((pharmacyProducts) =>
        {
            getAllPharmacyProductsInformation(pharmacyProducts);

        }).catch((error) => console.error(error));


    };

    function getAllPharmacyProductsInformation(pharmacyProducts)
    {

        getProducts()
            .then((allProducts) =>
            {
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

                })
                setProducts(productsCopy);
            })
            .catch((error) => console.error(error));
    }




    function productDetails(product)
    {
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><b>{product.name}</b></h5>
                    <p class="card-text">{product.description}</p>
                    <Link to={`${Routing.productDetails}${product.name}`} class="card-link btn btn-outline-primary">See details</Link>
                </div>
            </div>
        );
    }

    return (

        <div class="container">
            <div class="title-container">
                <div class="title">
                    <h1>Products</h1>
                </div>
            </div>
            <div class="products-container">
                {products !== undefined ? products.map((product) => productDetails(product)) : ""}
            </div>
        </div >
    )


}


export default PharmacyProducts;