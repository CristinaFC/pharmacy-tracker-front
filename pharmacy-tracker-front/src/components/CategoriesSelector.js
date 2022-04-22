import React, { Component } from 'react';
import { getCategories, getCateogryById } from '../database/functions';

class CategoriesSelector extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            categories: [],
            category: ''
        }
    }

    async componentWillReceiveProps(nextProps)
    {
        const { categoryId } = nextProps;

        const categories = await getCategories();
        let category = '';
        if (categoryId != null)
        {
            category = await getCateogryById(categoryId);
        }

        this.setState({ categories, category });
    }


    render()
    {
        const { categories, category } = this.state;
        const { isAlreadySelected } = this.props;
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

export default CategoriesSelector;