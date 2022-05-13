import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from '../firebase/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import { deleteUser, getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Routing from '../routing/Routing';

export const DeleteProfileButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async() => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser.uid;
            const userToDelete = auth.currentUser;
            const docRef = doc(db, "pharmacies", currentUser);
            const docRef2 = doc(db, "users", currentUser);
            auth.signOut();
            await deleteDoc(docRef);
            await deleteDoc(docRef2);
            deleteUser(userToDelete).then(() => {
                <Link to={Routing.home} />
            }).catch((error) => {
                console.log("Error deleting user: ", error);
                <Link to={Routing.home} />
            });
        } catch (e) {
            console.error("Error deleting account: ", e);
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} className="btn-delete-account">
                Delete account
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleConfirm} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}