import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { getPharmacies } from '../database/functions';
import { increment } from 'firebase/firestore';

export default function PaginationControlled() {

    const [amount, setAmount] = React.useState();
    const [page, setPage] = React.useState();

    async function getPharmaciesNumber() {
        try {
            const allPharmacies = await getPharmacies();
            setAmount(allPharmacies.length);
        } catch (e) {
            console.log("error");
        }
    }

    getPharmaciesNumber();

    const handleChangePage = (page) => {
        console.log(page);
        setPage(page);
    };

    return (
        /*
        var currentPage = 1;
        var maxPages = amont;
        pharmacies[currentPage-1, currentPage+2];
        nextpage.onclik(currentpageincrement)
        f increment()
        ifcuaosdj 
        */
        <Pagination 
            count={amount%4 > 0 ? Math.round(amount/4) +1 : amount/4}
            page={page}
            onClick={handleChangePage}
            defaultPage={1} 
            siblingCount={0}
            size="small"
            color="primary"
            showFirstButton 
            showLastButton
        />
    );
}