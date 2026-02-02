package com.ems.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Employee {
	
	@Id
	@GeneratedValue(generator = "emp_gen", strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "emp_gen", sequenceName = "emp_seq", initialValue = 1)
	@Column(name = "employee_id")
	private Integer employeeId;
	
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;
	
	
}
