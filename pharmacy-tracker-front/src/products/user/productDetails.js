import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { getProductByName, getPharmacies } from '../../database/functions';

import Map from '@mui/icons-material/Map';
import MapComponent from '../../components/MapComponent';

export const ProductDetails = () => 
{
    const [product, setProduct] = useState();
    const [pharmacies, setPharmacy] = useState();
    const [pharmacy, setSelected] = useState();
    const [isShowingMap, setShowing] = useState(false);

    let name = useLocation().pathname.split('/')[2];
    useEffect(() =>
    {
        async function getProductandPharmacies()
        {
            const product = await getProductByName(name);
            setProduct(product);

            const allPharmacies = await getPharmacies();
            const pharmacies = [];
            allPharmacies.forEach(pharmacy =>
            {
                if (pharmacy.hasOwnProperty('products'))
                {
                    if (pharmacy.products.hasOwnProperty(product.id))
                    {
                        pharmacies.push(pharmacy);
                    }
                }
            });
            setPharmacy(pharmacies);

        }

        getProductandPharmacies();

    }, []);


    function data(pharmacy)
    {

        return (
            <tr>
                <td>{pharmacy.Address}</td>
                <td>{pharmacy.products[product.id].price}</td>
                <td>{pharmacy.products[product.id].stock}</td>
                <td>
                    <Map sx={{ color: "white" }} onClick={() => route(pharmacy)} />
                </td>

            </tr >
        );
    }

    function route(pharmacy)
    {
        setSelected(pharmacy);
        console.log(pharmacy);
        setShowing(true);
    }


    return (
        <div class="container">

            <div class="title-container">
                <h2>Details</h2>
            </div>
            {product != undefined
                ? <div class="product-container" >
                    <div class="product-info">
                        <h6><b>Name</b></h6>
                        <span>{product.name}</span>

                        <h6><b>Description</b></h6>
                        <span>{product.description}</span>
                    </div>
                    <div class="tbl-content">

                        <table class="table table-hover" cellpadding="0" cellspacing="0" border="0">
                            <thead>
                                <tr>
                                    <th scope="col">Pharmacy</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Go to</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pharmacies != undefined ? pharmacies.map(pharmacy => data(pharmacy)) : ""}

                            </tbody>
                        </table>
                    </div>

                </div>
                : ""}

            {isShowingMap
                ? <MapComponent pharmacy={pharmacy} />
                : ""}

        </div>
    );
}

export default ProductDetails;