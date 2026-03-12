package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.exception.EmployeeNotFoundException;
import com.ems.model.EmployeeDto;

import com.ems.service.IEmployeeService;
@CrossOrigin("*")
@RestController
@RequestMapping("/employees-api/v1")
public class EmployeeController {
	@Autowired
	private IEmployeeService employeeService;
	
	//http://localhost:8080/employees-api/v1/employees
	@PostMapping("/employees")
	ResponseEntity<Void> addEmployee(@RequestBody EmployeeDto employeeDto){
		employeeService.addEmployee(employeeDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	//http://localhost:8080/employees-api/v1/employees
	@PutMapping("/employees")
	ResponseEntity<Void> updateEmployee(@RequestBody EmployeeDto employeeDto){
		employeeService.updateEmployee(employeeDto);
		HttpHeaders headers=new HttpHeaders();
		headers.add("info", "updating one Employee");
		headers.add("desc","update method called");
		return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).build();
	}
	
	
	
		//http://localhost:8080/employees-api/v1/employees/2
	@DeleteMapping("/employees/employeeId/{employeeId}")
	ResponseEntity<Void> deleteEmployee(@PathVariable int employeeId){
		employeeService.deleteById(employeeId);
		HttpHeaders headers =new HttpHeaders();
		headers.add("info", "delete one employee by id");
		return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
	}
	
	//http://localhost:8080/employees-api/v1/employees/1
	@GetMapping("/employees/employeeId/{employeeId}")
	ResponseEntity<EmployeeDto> getById(@PathVariable int employeeId){
		EmployeeDto employeeDto=	employeeService.getById(employeeId);
		HttpHeaders headers=new HttpHeaders();
		headers.add("info", "getting one employees by id ");
		return ResponseEntity.status(HttpStatus.OK).headers(headers).body(employeeDto);
	}
	
	//http://localhost:8080/employees-api/v1/employees
	@GetMapping("/employees")
	ResponseEntity<List<EmployeeDto>> getAll(){
		List<EmployeeDto> employeeDtos = employeeService.getAll();
   	HttpHeaders headers =  new HttpHeaders();
		headers.add("info","getting all Employees");
		return ResponseEntity.ok().headers(headers).body(employeeDtos);
	}

	
	
	
}
