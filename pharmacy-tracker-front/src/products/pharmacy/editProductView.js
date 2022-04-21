import React, { Component } from 'react';
import ImageUpload from 'image-upload-react';
import 'image-upload-react/dist/index.css';
import CategoriesSelector from '../../components/CategoriesSelector';
import { getAuth } from 'firebase/auth';
import { editPharmacyProduct } from '../../database/functions';




import { getDoc, doc, setDoc, getDocs, writeBatch, collection } from 'firebase/firestore/lite';
import { db } from '../../firebase/firebaseConfig';
class EditProductView extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            imageSrc: '',
            show: false,
            price: 0,
            stock: 0,
        };
    }


    handleImageSelect = (e) =>
    {
        this.setState({
            imageSrc: URL.createObjectURL(e.target.files[0])
        });
    }

    handleChange = (e) =>
    {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    }

    _editProduct(e)
    {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });

        console.log('price', this.state.price);
        console.log('stock', this.state.stock);
        const currentUser = getAuth().currentUser.uid;

        const batch = writeBatch(db);
        const ref = doc(db, "pharmacies", currentUser, "products", this.props.product.id);

        batch.update(ref, { "price": this.state.price, "stock": this.state.stock });
        //editPharmacyProduct(currentUser, this.state.price, this.state.stock, this.props.product.id);

    }

    render()
    {
        const { product = '' } = this.props;

        return (
            <div>
                <h6>Set data and save</h6>
                <form class="wrapper" onSubmit={(e) => this._editProduct(e)}>
                    <aside class="aside aside-1">
                        <div>
                            <label for="formFileSm" class="form-label">Select Image</label>
                            <ImageUpload
                                handleImageSelect={(e) => this.handleImageSelect(e)}
                                imageSrc={this.state.imageSrc}
                                setImageSrc={() => this.setState({ imageSrc: '' })}
                                style={{
                                    marginTop: '0px',
                                    alignSelf: 'center',
                                    width: 240,
                                    height: 234,
                                    background: ' #7ED1A7',
                                }}
                            />
                        </div>
                    </aside>
                    <aside class="aside aside-2">
                        <div >
                            <label for="ProductName" class="form-label">Name</label><br />
                            <input type="text" class="product-name" id="ProductName" value={product.name} disabled />
                        </div>
                        <div class="">
                            <label for="ProductDescription" class="form-label">Description</label><br />
                            <textarea id="w3review" class="product-description" name="ProductDescription" value={product.description} rows="4" cols="50" disabled />
                        </div>
                        <div class="category-price-container">
                            <div class="">
                                <label for="ProductCategory" class="form-label">Category</label><br />
                                <CategoriesSelector />
                            </div>
                            <div class="">
                                <label for="ProductPrice" class="form-label">Price</label><br />
                                <input type="number" name="price" class="product-price" id="ProductPrice" />

                            </div>
                        </div>
                        <div class="">
                            <label for="ProductStock" class="form-label">Stock</label><br />
                            <input type="number" name="stock" class="product-stock" id="ProductStock" />
                        </div>
                        <button type="submit" class="btn-add-product">Update</button>
                    </aside>
                </form>
            </div >

        );

    }

}



export default EditProductView;