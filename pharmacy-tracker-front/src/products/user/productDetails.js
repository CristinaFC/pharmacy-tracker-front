import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { getProductByName, getPharmacies } from '../../database/functions';
import Routing from '../../routing/Routing';
import { getAuth } from 'firebase/auth';
import Map from '@mui/icons-material/Map';
import MapComponent from '../../components/MapComponent';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const ProductDetails = () => 
{
    const [product, setProduct] = useState();
    const [pharmacies, setPharmacies] = useState();
    const [pharmacy, setSelected] = useState();
    const [isShowingMap, setShowing] = useState(false);
    const [authUser, setAuthUser] = useState(false);
    const [asc, setAsc] = useState(true);

    const name = useLocation().pathname.split('/')[2];
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

            setPharmacies(pharmacies);

        }
        function getAuthUser()
        {
            const user = getAuth().currentUser;
            if (user !== null)
            {
                setAuthUser(true);
            }

        }
        getAuthUser();
        getProductandPharmacies();

    }, []);

    function sortPrice()
    {
        setAsc(!asc);
        const values = Array.from(pharmacies.values());
        if (asc)
        {

            values.sort((a, b) =>
            {
                return a.products[product.id].price - b.products[product.id].price;
            });
            setPharmacies(values);
        } else
        {
            values.sort((a, b) =>
            {
                return b.products[product.id].price - a.products[product.id].price;
            });
            setPharmacies(values);
        }

        console.log('values', pharmacies);
    }

    function data(pharmacy)
    {
        if (!authUser)
        {
            return (
                <tr>
                    <td>{pharmacy.Address}</td>
                </tr >
            );
        }
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
        setShowing(true);
    }

    function authUserData()
    {

        return (
            <div class="container">

                <div class="title-container">
                    <h2>Details</h2>
                    <Link to={Routing.products} className="back-space-arrow">
                        <KeyboardBackspaceIcon sx={{ color: "#7ED1A7" }} />
                    </Link>
                </div>
                {product !== undefined
                    ? <div class="product-container" >
                        <div class="product-info">
                            <h6><b><span>{product.name}</span></b></h6>
                            <img src={product.img} className='img' alt="Product Image" width={170} />
                            <span>{product.description}</span>
                        </div>
                        <div class="tbl-content">
                            <table class="table table-hover" cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                    <tr>
                                        <th scope="col">Pharmacy</th>
                                        <th scope="col"><button class="filterButton" onClick={sortPrice}>Price <FilterAltIcon fontSize='1rem'/></button></th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Go to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pharmacies !== undefined ? pharmacies.map(pharmacy => data(pharmacy)) : ""}
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

    function nonAuthUserData()
    {
        return (<div class="container">
            <div class="title-container">
                <h2>Details</h2>
                <Link to={Routing.products} className="back-space-arrow">
                    <KeyboardBackspaceIcon sx={{ color: "#7ED1A7" }} />
                </Link>
            </div>
            {product !== undefined
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
                                </tr>
                            </thead>
                            <tbody>
                                {pharmacies !== undefined ? pharmacies.map(pharmacy => data(pharmacy)) : ""}
                            </tbody>
                        </table>
                    </div>

                </div>
                : ""}

        </div>);
    }

    if (authUser)
    {
        return authUserData();
    } else
    {
        return nonAuthUserData();
    }
}

export default ProductDetails;