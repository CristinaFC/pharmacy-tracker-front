import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { getPharmacies } from '../database/functions';

export default function PaginationControlled() {

    const [amount, setAmount] = React.useState();

    async function getPharmaciesNumber() {
        try {
            const allPharmacies = await getPharmacies();
            setAmount(allPharmacies.length);
        } catch (e) {
            console.log("error");
        }
    }

    getPharmaciesNumber();

    return (
        <Pagination 
            count={amount%4 > 0 ? Math.round(amount/4) +1 : amount/4}
            defaultPage={1} 
            siblingCount={0}
            size="small"
            color="primary"
            showFirstButton 
            showLastButton
        />
    );
}