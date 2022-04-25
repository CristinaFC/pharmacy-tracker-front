import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy  } from "firebase/firestore";
import "./ComparePrice.css";
import { db } from '../firebase/firebaseConfig';

export default function ComparePrice() {
    const [modal, setModal] = useState(false);
    const [products,setProducts ]=useState([])
  
    useEffect(() => {

        const getProducts = async() => {
            const _query  = query(collection(db, "products"), orderBy("price", "asc"));
            const querySnapshot = await getDocs(_query)
            
            let productsData = []
            querySnapshot.forEach((doc) => {
                productsData.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setProducts(productsData)           
        };

        getProducts();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        <button onClick={toggleModal} className="btn-modal">
            Open
        </button>

        {modal && (
            <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <div className='content'>
                    <div className='left'>
                    <img src="https://www.farmaciaevacontreras.com/wp-content/uploads/2021/01/Paracetamol-Kern-Pharma-100-mg-ml-Solucion-Oral-30-ml.jpg" className='img' alt="Product Image"/>
                        <p>Paracetamol Kern Pharma 100 mg/ml Solución Oral, 60 ml</p>
                    </div>
                    <div className='rigth'>
                       { products.map((product) =>{
                            return product.price && (
                                <div className='list'>
                                    <div className='productItem'>
                                        {" "}
                                        <p style={{margin: '0 0 10px'}}>{product.name}</p>
                                        <p style={{margin: '0'}} >{product.price},00€ </p> 
                                    </div>
                                    <div className='links'>
                                        <div className='site'>
                                            <p>SITE</p>
                                        </div>
                                        <div className='route'>
                                            <p>ROUTE</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            );
                       })}
                    </div>
                </div>
                <button className="close-modal" onClick={toggleModal}>X</button>
            </div>
            </div>
        )}</>
    ); 
}