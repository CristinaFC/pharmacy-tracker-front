import React, { Component } from 'react';
import { getCategories, getCateogryById } from '../database/functions';

class ProductsSelector extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
        }
    }

    async componentDidMount()
    {
        const products = await getProducts();

        this.setState({ products });
    }


    render()
    {
        const { products } = this.state;

        return (
            <div>
                <select class="categories-select" disabled={isAlreadySelected} >
                    {isAlreadySelected
                        ? <option selected >{category}</option>
                        : categories.map((category) => <option> {category.name}</option>)}

                </select>
            </div >
        );
    }


}

export default ProductsSelector;