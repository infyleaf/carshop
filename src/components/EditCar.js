import React, {useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCar(props){

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel:'', year:'', price:''
    })

    const handleClickOpen = () => {
        setCar({
            brand: props.car.data.brand,
            model: props.car.data.model,
            color: props.car.data.color,
            fuel: props.car.data.fuel,
            year: props.car.data.year,
            price: props.car.data.price,
        });
      setOpen(true);
      

      
      console.log(props.car.data);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value })

    }

    //Save car 
    const handleSave = () => {
        props.editCar(props.car.value, car);
        handleClose()
    }


    return(
        <div>
        <Button size="small" onClick={handleClickOpen}>
          Edit car
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name = "brand"
                value={car.brand}
                onChange={e => handleInputChange(e)}
                label="Brand"
                fullWidth
                variant="standard"
            />
                        <TextField
               
                margin="dense"
                name = "model"
                value={car.model}
                onChange={e => handleInputChange(e)}
                label="Model"
                fullWidth
                variant="standard"
            />
                                    <TextField
               
               margin="dense"
               name = "color"
               value={car.color}
               onChange={e => handleInputChange(e)}
               label="Color"
               fullWidth
               variant="standard"
           />
                                   <TextField
               
               margin="dense"
               name = "fuel"
               value={car.fuel}
               onChange={e => handleInputChange(e)}
               label="Fuel"
               fullWidth
               variant="standard"
           />
                                   <TextField
               
               margin="dense"
               name = "year"
               value={car.year}
               onChange={e => handleInputChange(e)}
               label="Year"
               fullWidth
               variant="standard"
           />
                                              <TextField
               
               margin="dense"
               name = "price"
               value={car.price}
               onChange={e => handleInputChange(e)}
               label="Price"
               fullWidth
               variant="standard"
           />
        </DialogContent>

        <DialogActions>
         <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}