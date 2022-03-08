import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employees: Employee[];
  editEmployee:Employee;
  deleteEmployee:Employee;
  constructor(private employeeService :EmployeeService){}


  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() :void
  {
    this.employeeService.getEmployees().subscribe(
      (response:Employee[]) => {
        this.employees=response;
      },
      (error : HttpErrorResponse ) => {
        alert(error.message)
      }
    );
  }

  public searchEmployees(key:string)
  {
    const results:Employee[]=[];
    for(let employee of this.employees)
    {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !==-1 
      ||employee.email.toLowerCase().indexOf(key.toLowerCase()) !==-1
      ||employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !==-1
      ||employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !==-1)
      {
        results.push(employee);
      }
    }

    this.employees=results;
    if(results.length===0 || !key)
    {
      this.getEmployees();
    }
  }

  public onOpenModal(employee:Employee,modal:string) :void
  {
    const container=document.getElementById('main-container');
    const button =document.createElement('button');
    //by default the button type is set to submit
    button.type='button'
    button.setAttribute('data-toggle', 'modal');
    if(modal==='add')
    {
      //since it is refering an id # sign is needed
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if(modal==='edit')
    {
      this.editEmployee=employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if(modal==='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container.appendChild(button);
    button.click();
  }

  public onAddEmloyee(addForm: NgForm):void 
  {
    //addForm.value is a json attributes
    //the below one will close the form
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        //once the employee added i want to get the employee list
        this.getEmployees();
        addForm.reset();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateEmployee(employee: Employee):void 
  {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        //once the employee added i want to get the employee list
        this.getEmployees();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmloyee(id:number):void
  {
    this.employeeService.deleteEmployee(id).subscribe(
      (response) => {
        console.log(response+" employee deleted");
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
