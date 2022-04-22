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


class MyProductsView extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            productsDescription: [],
            editModal: false,
            deleteModal: false,
            actualProduct: [],
            pharmacyProductData: [],
        };
    }

    async pharmacyProducts()
    {
        const currentUser = getAuth().currentUser.uid;

        const myProducts = await getPharmacyProducts(currentUser);
        const keys = Object.keys(myProducts);

        const pharmacyProductsDescription = await this.compareProductsId(keys);
        this.setState({
            productsDescription: pharmacyProductsDescription,
            products: myProducts
        });
    }

    async deleteProduct()
    {
        const currentUser = getAuth().currentUser.uid;
        deletePharmacyProduct(currentUser, this.state.actualProduct.id);
        const cModal = this.state.deleteModal;
        this.pharmacyProducts();
        //const myProducts = await getPharmacyProducts(currentUser);
        //const keys = Object.keys(myProducts);
        //
        //const pharmacyProductsDescription = await this.compareProductsId(keys);
        this.setState({
            deleteModal: !cModal,
            //productsDescription: pharmacyProductsDescription,
        });
    }

    toggleShowEdit(product, pharmacyProductData)
    {
        const cModal = this.state.editModal;
        this.setState({
            editModal: !cModal,
            actualProduct: product,
            pharmacyProductData
        });
    }

    toggleShowDelete(product)
    {
        const cModal = this.state.deleteModal;
        this.setState({
            deleteModal: !cModal,
            actualProduct: product,
        });
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

    async componentWillMount()
    {
        try
        {
            this.pharmacyProducts();
            //const currentUser = getAuth().currentUser.uid;
            //const myProducts = await getPharmacyProducts(currentUser);
            //const keys = Object.keys(myProducts);

            //const pharmacyProductsDescription = await this.compareProductsId(keys);
            //this.setState({ products: myProducts });
        } catch (e)
        {
            console.error("Error reading document: ", e);
        }
    }

    products(pharmacyProductData, productData = [], key)
    {
        return (
            <tr>
                <th scope="row">{key + 1}</th>
                <td>{pharmacyProductData.name}</td>
                <td>{pharmacyProductData.description}</td>
                <td>{productData.price}</td>
                <td>{productData.stock}</td>
                <td>
                    <MDBBtn onClick={() => this.toggleShowEdit(pharmacyProductData, productData)} color='link' >
                        <img src={editIcon} alt="Edit" class="edit-icon" />
                    </MDBBtn>
                </td>
                <td>
                    <MDBBtn onClick={() => this.toggleShowDelete(pharmacyProductData)} color='link' >
                        <img src={deleteIcon} alt="Delete" class="delete-icon" />
                    </MDBBtn>
                </td>
            </tr>
        );
    }

    render()
    {
        const { products = [], productsDescription, editModal, deleteModal } = this.state;

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
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {productsDescription.map((product, key) => this.products(product, products[product.id], key))}
                    </tbody>

                </table>
                <>
                    <MDBModal tabIndex='-1' show={editModal}>
                        <MDBModalDialog centered size="lg">
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle> Edit Product</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={() => this.toggleShowEdit()}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <EditProductView product={this.state.actualProduct} pharmacyProductData={this.state.pharmacyProductData} />
                                </MDBModalBody>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </>
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
            </div >

        );

    }
}



export default MyProductsView;