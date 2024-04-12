import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function ExpenseModal({ isOpen, onClose, items }) {
    return (
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="expense-modal-title">
            <DialogTitle id="expense-modal-title">All Expenses</DialogTitle>
            <DialogContent dividers>
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${item.date} - ${item.item}: ${item.cost}`} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ExpenseModal;
