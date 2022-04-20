import React, { Component } from 'react';
import { getAuth } from 'firebase/auth';
import { getPharmacyProducts, getProducts } from '../../database/functions';

class MyProductsView extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            productsDescription: []
        };
    }

    async compareProductsId(keys = [])
    {
        const allProducts = await getProducts();
        const pharmacyProducts = [];
        keys.forEach((key) =>
        {
            pharmacyProducts.push(allProducts.find(p => p.id === key));
        }
        )
        return pharmacyProducts;

    }

    async componentDidMount()
    {
        try
        {
            const currentUser = getAuth().currentUser.uid;
            const myProducts = await getPharmacyProducts(currentUser);
            const keys = Object.keys(myProducts);

            const pharmacyProductsDescription = await this.compareProductsId(keys);
            this.setState({ productsDescription: pharmacyProductsDescription, products: myProducts });
        } catch (e)
        {
            console.error("Error reading document: ", e);
        }
    }

    render()
    {
        const { products, productsDescription } = this.state;
        return (
            <div class="myProducts-container">
                <h1>Products</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productsDescription.map((product, key) =>
                            <tr>
                                <th scope="row">{key + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{products != null ? products[product.id].price : ""}</td>
                                <td>{products != null ? products[product.id].stock : ""}</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        );

    }

}



export default MyProductsView;