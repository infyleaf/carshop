import React, {useState, useEffect } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import Addcar from './Addcar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditCar from './EditCar';
import Snackbar from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { RowContainerName } from 'ag-grid-community';

function Carlist(){
    
    const [cars, setCars] = useState([]);
    
    useEffect(() => fetchData(), []); 

    const fetchData = () => {
//Fetch cars
        
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))

    }

    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: '_links.self.href',
        cellRendererFramework: params => <Button onClick={() => deleteCar(params.value)}>Delete </Button>
        
        },
        {
         headerName: ' ',
         sortable: false,
         filter: false,
         width: 120,
         field: '_links.self.href',
         cellRendererFramework: params => <EditCar editCar={editCar} car={params}/>    
        } 
        
    ]
    
    //Delete function
        const deleteCar = (link) => {
            fetch(link, {method: 'DELETE'})
           .then(res => fetchData())
            .catch(err => console.error(err))
           console.log(link);


        }

        const editCar = (url, updatedCar) => {
            fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCar)
            })
            .then(_ => fetchData())
            .catch(err => console.error(err))
          
        }


    //Save car function
    const saveCar = (car) => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }


    return(

        <div className="ag-theme-material" style={{height: 600, width: '80%', marginTop: 20, margin: 'auto'}}>
            <Addcar saveCar={saveCar}/>
            <AgGridReact
            rowData={cars}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            />

        </div>
    );
}
export default Carlist;