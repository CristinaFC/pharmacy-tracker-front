import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { getPharmacies } from '../database/functions';

export default function PaginationControlled(props)
{
    const [amount, setAmount] = useState();
    const [page, setPage] = useState(1);

    async function getPharmaciesNumber()
    {
        try
        {
            const allPharmacies = await getPharmacies();
            if(props.filteredAmount === undefined) setAmount(allPharmacies.length);
            else setAmount(props.filteredAmount);
        } 
        catch (e)
        {
            console.log("error", props.filteredAmount);
        }
    }

    getPharmaciesNumber();

    const handleChange = (event, page) =>
    {
        setPage(page);
        props.handlePageChange(page);
    };


    return (
        <Pagination
            count={amount % 5 > 0 ? Math.round(amount / 5) + 1 : amount / 5}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            siblingCount={0}
            size="small"
            color="primary"
            showFirstButton
            showLastButton
        />
    );

}
