
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
            searchProduct: '',
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


    handleChange = (e) =>
    {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    }

    clear(e)
    {
        this.setState({ [e.target.name]: '' });
    }



    render()
    {
        const { products } = this.state;
        const regex = new RegExp(`${this.state.searchProduct}`, 'i');

        return (
            <div class="container">
                <div class="title-container">
                    <div class="title">
                        <h1>Products</h1>
                    </div>
                    <div class="ms-5 d-flex form-search">
                        <input type="search" class="form-control" placeholder="Search" aria-label="Search" name="searchProduct" onChange={(e) => this.handleChange(e)} value={this.state.searchProduct} />
                        <button class="btn btn-outline-success" type="submit" name="searchProduct" onClick={(e) => this.clear(e)}>Clear</button>
                    </div>
                </div>
                <div>
                </div>
                <div class="products-container">
                    {products
                        .filter((p) =>
                        {
                            return regex.test(p.name);
                        })
                        .map((product, key) => this.product(product, key))
                    }

                </div>
            </div >
        );
    }
}



export default ProductsView;