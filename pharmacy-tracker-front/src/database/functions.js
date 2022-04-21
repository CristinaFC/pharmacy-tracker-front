import { getDoc, doc, setDoc, getDocs, writeBatch, collection, updateDoc, deleteField } from 'firebase/firestore/lite';
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

export const getCategories = async () =>
{
    try
    {
        const docRef = collection(db, 'categories');
        const docSnap = await getDocs(docRef);

        const categories = [];
        docSnap.forEach((doc) => categories.push(doc.data()));

        return categories;
    } catch (e)
    {
        console.error("Error reading categories: ", e);
    }
}

export const editPharmacyProduct = async (id, price = 0, stock = 0, productId) =>
{
    try
    {
        /** Check */

        const batch = writeBatch(db);
        const ref = doc(db, "pharmacies", id, "products", productId);

        batch.update(ref, { "price": price, "stock": stock });

    } catch (e)
    {
        console.error("Error editing product: ", e);
    }
}


export const deletePharmacyProduct = async (pharmacyId, product) =>
{
    try
    {

        /** Check */
        const ref = doc(db, 'pharmacies', pharmacyId, "products", product);

        await updateDoc(ref, { price: deleteField() });


    } catch (e)
    {
        console.error("Error editing product: ", e);
    }
}
