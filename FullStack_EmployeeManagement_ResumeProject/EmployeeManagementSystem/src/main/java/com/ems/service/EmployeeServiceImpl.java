package com.ems.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.exception.EmployeeNotFoundException;
import com.ems.model.Employee;
import com.ems.model.EmployeeDto;
import com.ems.repository.IEmployeeRepository;
@Service
public class EmployeeServiceImpl implements IEmployeeService {
	@Autowired
	private IEmployeeRepository employeeRepository;
	@Autowired
	private ModelMapper mapper;
	@Override
	public void addEmployee(EmployeeDto employeeDto) {
		Employee employee=mapper.map(employeeDto, Employee.class);
		employeeRepository.save(employee);
	}

	@Override
	public void updateEmployee(EmployeeDto employeeDto) {
		Employee employee=mapper.map(employeeDto, Employee.class);
		employeeRepository.save(employee);
		
	}

	@Override
	public List<EmployeeDto> getAll() {
		List<Employee> employees=employeeRepository.findAll();
		if(employees.isEmpty())
			throw new EmployeeNotFoundException("No employees");
		return employees.stream()
				.map(employee->mapper.map(employee,EmployeeDto.class))
				.toList();
	}

	@Override
	public EmployeeDto getById(int employeeId) {
		Employee employee=employeeRepository.findById(employeeId)
				.orElseThrow(()->new EmployeeNotFoundException("Invalid Id"));
				 EmployeeDto employeeDto=mapper.map(employee, EmployeeDto.class);
				 return employeeDto;
	}

	@Override
	public void deleteById(int employeeId) {
		
		 employeeRepository.deleteById(employeeId);
	}

}
