import React, { Component } from 'react';
import { getAuth } from 'firebase/auth';
import { getPharmacyProducts, getProducts, deletePharmacyProduct } from '../../database/functions';
import editIcon from '../../assets/icons/editar.png';
import deleteIcon from '../../assets/icons/delete.png';
import
{
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter

} from 'mdb-react-ui-kit';

import EditProductView from './editProductView';
import CreateProductView from './createProductView';



class MyProductsView extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            products: [],
            addModal: false,
            deleteModal: false,
            editModal: false,
            actualProduct: [],
            imageSrc: '',
            price: 0,
            stock: 0,
            searchProduct: '',
        };
    }


    async componentWillMount()
    {
        try
        {
            this.pharmacyProducts();

        } catch (e)
        {
            console.error("Error reading document: ", e);
        }
    }


    /** Opening and closing modals*/
    toggleShowEdit(product)
    {
        const cModal = this.state.editModal;

        this.setState({
            editModal: !cModal,
        });

        if (product != null)
        {
            this.setState({
                actualProduct: product,
                price: product.price,
                stock: product.stock,
            });
        }
    }

    toggleShowDelete(product)
    {
        const cModal = this.state.deleteModal;
        this.pharmacyProducts();
        this.setState({
            deleteModal: !cModal,
            actualProduct: product,
        });
    }

    toggleShowAdd()
    {
        const cModal = this.state.addModal;
        this.pharmacyProducts();
        this.setState({
            addModal: !cModal
        });
    }


    async closeEditModal()
    {

        const cModal = this.state.editModal;

        this.pharmacyProducts();

        this.setState({
            editModal: !cModal,
        });

    }


    /**Handlers */

    handleChange = (e) =>
    {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    }


    /**Pharmacy methods */

    /**Get actual pharmacy products */
    async pharmacyProducts()
    {
        const currentUser = getAuth().currentUser.uid;

        const pharmacyProducts = await getPharmacyProducts(currentUser);

        await this.getAllPharmacyProductsInformation(pharmacyProducts);

    }


    /**Get pharmacy products information */

    async getAllPharmacyProductsInformation(pharmacyProducts)
    {
        const allProducts = await getProducts();
        const keys = Object.keys(pharmacyProducts);
        const products = [];

        keys.forEach((key) =>
        {
            allProducts.map((product) =>
            {
                if (product.id === key)
                {
                    const p = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        price: pharmacyProducts[key].price,
                        stock: pharmacyProducts[key].stock
                    }
                    products.push(p);
                }
            })

        });

        this.setState({ products });

    }


    /**Delete pharmacy product */
    async deleteProduct()
    {
        const currentUser = getAuth().currentUser.uid;

        await deletePharmacyProduct(currentUser, this.state.actualProduct.id);

        this.pharmacyProducts();

        const cModal = this.state.deleteModal;

        this.setState({
            deleteModal: !cModal,
        });
    }

    searchProduct(e)
    {
        console.log('searchProduct', this.state.searchProduct);
        if (this.state.searchProduct === '')
        {
            console.log('HERE');
            this.pharmacyProducts();
        } else
        {

            const { products } = this.state;
            const searched = [];
            products.filter(p =>
            {
                if (p.name.contains(this.state.searchProduct))
                {
                    searched.push(p);
                }
            });
            console.log('searched', searched);
            this.setState({ products: searched });
        }

    }

    dataTable(product, key)
    {

        return (
            <tr>
                <th scope="row">{key + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                    <MDBBtn onClick={() => this.toggleShowEdit(product)} color='link' >
                        <img src={editIcon} alt="Edit" class="edit-icon" />
                    </MDBBtn>
                </td>
                <td>
                    <MDBBtn onClick={() => this.toggleShowDelete(product)} color='link' >
                        <img src={deleteIcon} alt="Delete" class="delete-icon" />
                    </MDBBtn>
                </td>
            </tr>
        );
    }

    clear(e)
    {
        this.setState({ [e.target.name]: '' });
    }

    render()
    {
        const { products = [], addModal, editModal, deleteModal, actualProduct } = this.state;
        const regex = new RegExp(`${this.state.searchProduct}`, 'i');

        return (
            <div class="myProducts-container">
                <div class="title-container">
                    <div class="title">
                        <h1>Products</h1>
                    </div>
                    <div>
                        <div class="ms-5 d-flex form-search">
                            <input type="search" class="form-control" placeholder="Search" aria-label="Search" name="searchProduct" onChange={(e) => this.handleChange(e)} value={this.state.searchProduct} />
                            <button class="btn btn-outline-success" type="submit" name="searchProduct" onClick={(e) => this.clear(e)} >Clear</button>
                        </div>
                    </div>
                    <div class="add-button">
                        <button onClick={() => this.toggleShowAdd()} type="submit" class="btn-add-product">Add new product</button>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products
                            .filter((p) =>
                            {
                                return regex.test(p.name);
                            })
                            .map((product, key) => this.dataTable(product, key))
                        }
                    </tbody>
                </table>

                {/**Edit product Modal */}
                <>
                    <MDBModal tabIndex='-1' show={editModal}>
                        <MDBModalDialog centered size="lg">
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle> Edit Product</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={() => this.toggleShowEdit()}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <EditProductView product={actualProduct} handle={() => this.closeEditModal()} />
                                </MDBModalBody>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>

                {/** DELETE PRODUCT MODAL */}

                <>
                    <MDBModal tabIndex='-1' show={deleteModal}>
                        <MDBModalDialog centered size="lg">
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Delete Product</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={() => this.toggleShowDelete()}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <p>Are you sure you want to delete this product?</p>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={() => this.toggleShowDelete()}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn color='danger' onClick={() => this.deleteProduct()}>Delete</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>
                {/** ADD PRODUCT MODAL */}
                <>
                    <MDBModal tabIndex='-1' show={addModal}>
                        <MDBModalDialog centered size="lg">
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Add Product</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={() => this.toggleShowAdd()}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <CreateProductView handle={() => this.toggleShowAdd()} />
                                </MDBModalBody>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>
            </div>
        );
    }
}



export default MyProductsView;