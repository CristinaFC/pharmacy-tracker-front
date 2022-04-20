import React, { Component } from 'react';
import ImageUpload from 'image-upload-react';
import 'image-upload-react/dist/index.css';
import CategoriesSelector from '../components/CategoriesSelector';


class CreateProductView extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            imageSrc: '',
            show: false,
        };
    }

    handleImageSelect = (e) =>
    {
        this.setState({
            imageSrc: URL.createObjectURL(e.target.files[0])
        });
    }

    render()
    {
        console.log(this.state.imageSrc);

        return (
            <div>
                <h3> Create Product</h3>
                <h6>Set data and save</h6>
                <form class="wrapper">

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
                            <input type="text" class="product-name" id="ProductName" />
                        </div>
                        <div class="">
                            <label for="ProductDescription" class="form-label">Description</label><br />
                            <textarea id="w3review" class="product-description" name="ProductDescription" rows="4" cols="50" />
                        </div>
                        <div class="category-price-container">
                            <div class="">
                                <label for="ProductCategory" class="form-label">Category</label><br />
                                <CategoriesSelector />
                            </div>
                            <div class="">
                                <label for="ProductPrice" class="form-label">Price</label><br />
                                <input type="number" class="product-price" id="ProductPrice" />
                            </div>
                        </div>

                        <button type="submit" class="btn-add-product">Add product</button>
                    </aside>
                </form>
            </div>

        );

    }

}



export default CreateProductView;