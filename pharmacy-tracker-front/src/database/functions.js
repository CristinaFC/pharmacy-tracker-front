import { getDoc, doc, getDocs, collection, updateDoc, deleteField, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';


export const addPharmacyProduct = async (currentUser, productId, price = 0, stock = 0) =>
{
    try
    {

        const ref = doc(db, 'pharmacies', currentUser);
        await setDoc(ref, {
            products: {
                [`${productId}`]: {
                    price: price,
                    stock: stock
                }
            }
        }, { merge: true });

    } catch (e)
    {
        console.log(price, stock, productId);
        console.error("Error adding product: ", e);
    }
}


export const deletePharmacyProduct = async (pharmacyId, product) =>
{
    try
    {
        const ref = doc(db, 'pharmacies', pharmacyId);

        await updateDoc(ref, {
            [`products.${product}`]: deleteField()
        });


    } catch (e)
    {
        console.error("Error deleting product: ", e);
    }
}

export const editPharmacyProduct = async (id, price = 0, stock = 0, productId) =>
{
    try
    {

        const ref = doc(db, "pharmacies", id);
        await updateDoc(ref, {

            products: {
                [`${productId}`]: {
                    price,
                    stock
                },
            }
        }, { merge: true });

    } catch (e)
    {
        console.error("Error editing product: ", e);
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

export const getCategoryById = async (id) =>
{
    try
    {
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists())
        {
            const category = docSnap.data();
            return category.name
        } else
        {
            console.log("No such document!");
        }

    } catch (e)
    {
        console.error("Error getting category by id: ", e);
    }

}

export const getPharmacies = async () =>
{
    try
    {
        const docRef = collection(db, 'pharmacies');
        const docSnap = await getDocs(docRef);

        const pharmacies = [];
        docSnap.forEach((doc) => pharmacies.push(doc.data()));

        return pharmacies;
    } catch (e)
    {
        console.error("Error getting pharmacies: ", e);
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









