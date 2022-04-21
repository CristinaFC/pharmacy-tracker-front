import React, { Component } from 'react';
import { getCategories } from '../database/functions';

class CategoriesSelector extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            categories: [],
        }
    }

    async componentDidMount()
    {
        try
        {
            const categories = await getCategories();

            this.setState({ categories: categories });
        } catch (e)
        {
            console.error("Error reading categories: ", e);
        }
    }

    render()
    {
        const { categories } = this.state;
        return (
            <div>
                <select class="categories-select" disabled >
                    {categories.map((category) => <option> {category.name}</option>)}
                </select>
            </div >
        );
    }


}

export default CategoriesSelector;