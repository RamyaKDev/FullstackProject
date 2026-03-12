import React, { useEffect, useState } from 'react'
import {createEmployee,getEmployee,updateEmployee} from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[emailId,setEmailId]=useState('');

  const[errors,setErrors]=useState(
    {
      firstName:'',
      lastName:'',
      emailId:''
    }
  );
const navigator=useNavigate();
const {employeeId}=useParams();
useEffect(()=>{
  if(employeeId){
  getEmployee(employeeId).then((response)=>{
    setFirstName(response.data.firstName)
    setLastName(response.data.lastName)
    setEmailId(response.data.emailId)
  }).catch((error)=>{
    console.error(error)
  })

}
},[employeeId]);
 

function handleFirstName(event){
setFirstName(event.target.value);
}
function handleLastName(event){
setLastName(event.target.value);
}
function handleEmailId(event){
setEmailId(event.target.value);
}
function saveorupdateEmployee(event){
event.preventDefault();

if(validateForm()){
const employee={firstName,lastName,emailId}
console.log(employee);
if(employeeId){
updateEmployee(employeeId,employee).then((response)=>{
  console.log(response.data);
  navigator('/employees');
}).catch(error=>{
  console.error(error);
})
}
else{
createEmployee(employee).then((response)=>{
  console.log(response.data);
  navigator('/employees');
}).catch(error=>{
  console.error(error);
})
}
}
}

function validateForm(){
  let valid=true;

  const errorscopy={...errors}

  if(firstName.trim())
    errorscopy.firstName='';
  else{
    errorscopy.firstName='firstName is required';
    valid=false;
  }
   if(lastName.trim())
    errorscopy.lastName='';
  else{
    errorscopy.lastName='lastName is required';
    valid=false;
  }
   if(emailId.trim())
    errorscopy.emailId='';
  else{
    errorscopy.emailId='emailId is required';
    valid=false;
  }
setErrors(errorscopy);
return valid;
}
function pageTitle(){
    if(employeeId){
        return <h2 className='text-center'>Update Employee</h2>
    }
    else{
     return <h2 className='text-center'>Add Employee</h2>
    }
}
  return (
    <div className='container'><br/>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                type="text"
                name='firstName'
                placeholder="Enter Employee FirstName"
                value={firstName}
                onChange={handleFirstName}
                className={`form-control ${errors.firstName? 'is-invalid':''}`}
                >
                </input>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                type="text"
                name='lastName'
                placeholder="Enter Employee LastName"
                value={lastName}
                onChange={handleLastName}
                className={`form-control ${errors.lastName? 'is-invalid':''}`}
                >
                </input>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>EmailId:</label>
                <input
                type="email"
                name='emailId'
                placeholder="Enter Employee EmailId"
                value={emailId}
                onChange={ handleEmailId}
                className={`form-control ${errors.emailId? 'is-invalid':''}`}
                >
                </input>
                {errors.emailId && <div className='invalid-feedback'>{errors.emailId}</div>}
              </div>
              <button className='btn btn-success' onClick={saveorupdateEmployee}>Submit</button>
            </form>

          </div>
          
          </div>
      </div>
    </div>
  )
}

export default EmployeeComponent