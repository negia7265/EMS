import React,{useState} from 'react';
import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Swal from "sweetalert2";
import {employeesData} from '../data/index';
export default function Dashboard() {
  const [employees,setEmployees]=useState(employeesData);
  const [selectedEmployees,setselectedEmployees]=useState(null);
  const[isAdding,setIsAdding]=useState(false);
  const [isEditing,setIsEditing]=useState(false);
  


  const handleDelete=(del)=>{
    const [employee] = employees.filter(employee => employee.id === del);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  }).then( result => {
      if (result.value) {
        const filteredData=employees.filter(item => item.id!==del);
        setEmployees(filteredData);
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
});
}


  const handleEdit=(ed)=>{
  console.log(1);
  const employee = employees.filter(employeem => employeem.id === ed);
  setselectedEmployees(employee);
  setIsEditing(true);
  }

  return (
    <>
    
        { 
        !isAdding && !isEditing && (
            <>
            <Header setIsAdding={setIsAdding} />
            <List employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
            </>
        )
        }
        {
          isAdding && (
            <>
            <Add employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
            />
            </>
          )
        }
        {
          isEditing && (
            <>
            <Edit
            employees={employees}
            selectedEmployees={selectedEmployees}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
            /> 
            </>
          )
        }

    </>
  )
}