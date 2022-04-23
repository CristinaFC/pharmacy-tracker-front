import React, { Component } from 'react';
import 'image-upload-react/dist/index.css';
import { addPharmacyProduct, getProducts } from '../../database/functions';

import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Routing from '../../routing/Routing';



class CreateProductView extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            price: 0,
            stock: 0,
            productId: '',
            products: [],
        };
    }

    async componentWillMount()
    {
        const products = await getProducts();

        this.setState({ products });
    }


    handleChange = (e) =>
    {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });

    }

    async _addProduct()
    {
        try
        {
            const currentUser = getAuth().currentUser.uid;

            await addPharmacyProduct(currentUser, this.state.productId, parseInt(this.state.price), parseInt(this.state.stock));

            this.props.handle();

            <Link to={Routing.myProducts} />

        } catch (e)
        {
            console.error("Error", e);
        }
    }

    render()
    {
        const { products = '' } = this.state;

        return (
            <div>
                <h6>Set data and save</h6>
                <div class="wrapper" >
                    <aside class="aside aside-2">
                        <div class="category-price-container">
                            <div class="">
                                <label for="ProductCategory" class="form-label">Products</label><br />
                                <select class="products-select" name="productId" onChange={(e) => this.handleChange(e)} >
                                    <option value="undefined" selected>Select a product</option>
                                    {
                                        products.map((product) => <option value={product.id}>{product.name}</option>)
                                    }
                                </select>
                            </div>
                            <div class="">
                                <label for="ProductPrice" class="form-label">Price</label><br />
                                <input type="number" name="price" class="product-price" id="ProductPrice"
                                    value={this.state.price} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <div class="">
                            <label for="ProductStock" class="form-label">Stock</label><br />
                            <input type="number" name="stock" class="product-stock" id="ProductStock"
                                value={this.state.stock} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <button type="submit" class="btn-add-product" onClick={() => this._addProduct()}>Add product</button>
                    </aside>
                </div >
            </div >

        );

    }
}



export default CreateProductView;