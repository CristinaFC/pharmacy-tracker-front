
import React, { Component } from 'react';
import { getAuth } from 'firebase/auth';
import { getProducts } from '../../database/functions';
import { Link } from 'react-router-dom';
import Routing from '../../routing/Routing';
import { useAuth } from '../../context/authContext';



class ProductsView extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            products: [],
            authUser: false,
        };
    }




    async componentDidMount()
    {
        const products = await getProducts();
        this.setState({ products });

    }

    dataTable(product, key)
    {

        return (

            <tr onclick="window.location='#';">

                <th scope="row">{key + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
            </tr>

        );
    }

    product(product)
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
        const { products } = this.state;
        return (
            <div class="container">
                <div class="title-container">
                    <div class="title">
                        <h1>Products</h1>
                    </div>
                </div>
                <div class="products-container">
                    {products.map((product) => this.product(product))}
                </div>
            </div >
        );
    }
}



export default ProductsView;