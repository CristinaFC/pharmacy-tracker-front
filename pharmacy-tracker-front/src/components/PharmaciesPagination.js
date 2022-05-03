import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationControlled() {
    return (
        <Pagination 
            count={10} 
            defaultPage={1} 
            siblingCount={0}
            size="small"
            color="primary"
            showFirstButton 
            showLastButton
        />
    );
}