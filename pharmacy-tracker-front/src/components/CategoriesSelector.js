import React, { Component } from 'react';
import { getDocs, doc, collection } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';

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
            const docRef = collection(db, 'categories');
            const docSnap = await getDocs(docRef);

            const categories = [];
            docSnap.forEach((doc) => categories.push(doc.data()));

            this.setState({ categories: categories });
        } catch (e)
        {
            console.error("Error adding document: ", e);
        }
    }

    render()
    {
        const { categories } = this.state;
        return (
            <div>
                <select class="categories-select" >
                    {categories.map((category) => <option> {category.name}</option>)}
                </select>
            </div >
        );
    }


}

export default CategoriesSelector;