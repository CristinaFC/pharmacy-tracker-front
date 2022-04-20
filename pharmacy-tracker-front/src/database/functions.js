import { getDoc, doc, query, getDocs, collection } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';


export const getProducts = async () =>
{
    try
    {
        const docRefProducts = collection(db, 'products');
        const docSnapProducts = await getDocs(docRefProducts);
        const products = [];

        docSnapProducts.forEach((doc) =>
        {
            products.push(doc.data());
        });

        return products;

    } catch (e)
    {
        console.log(e);
    }

}

export const getPharmacyProducts = async (id) =>
{
    try
    {
        const docRef = doc(db, 'pharmacies', id);
        const docSnap = await getDoc(docRef);
        const products = docSnap.data().products;
        return products;

    } catch (e)
    {
        console.log(e);
    }

}


