import React,{useEffect,useState} from 'react'
import listEmployees from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'
import {deleteEmployee} from '../services/EmployeeService'
 const ListEmployeeComponent = () => {
   const [employees,setEmployees]=useState([]);
   const navigator=useNavigate();
  
useEffect(()=>{
    getAllEmployees()
},[])
function getAllEmployees(){
listEmployees()
    .then((response)=>setEmployees(response.data))
    .catch((error)=>console.error(error))
}
function addNewEmployee(){
navigator('/add-Employee')
}
function updateEmployee(employeeId){
    navigator(`/edit-employee/${employeeId}`)
}
function removeEmployee(employeeId){
    console.log(employeeId);

    deleteEmployee(employeeId).then((response)=>{
        getAllEmployees()
    }).catch((error)=>{
        console.error(error);
    })
}
  return (
    <div className='container'>
        <h2 className='text-center'>List Of Employees</h2>
        <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered border-primary' >
            <thead className='border border-primary table-light'>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee EmailId</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
                
                    employees.map(employee =>
                <tr key={employee.employeeId}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.emailId}</td>
                    <td><button className='btn btn-info' onClick={()=>updateEmployee(employee.employeeId)}>Update</button></td>
                    style={{marginLeft:'10px'}}
                    <td><button className='btn btn-danger' onClick={()=>removeEmployee(employee.employeeId)}>Delete</button></td>
                </tr>
                )
                }
            </tbody>
        </table>
    </div>
  )
}


export default ListEmployeeComponent
