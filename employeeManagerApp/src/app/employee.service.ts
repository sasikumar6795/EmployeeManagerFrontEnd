import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export  class EmployeeService {

    private apiServiceUrl=environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getEmployees(): Observable<Employee[]>
    {
        return this.http.get<Employee[]>(`${this.apiServiceUrl}/employees/all`)
    }

    public addEmployee(employee :Employee ): Observable<Employee>
    {
        return this.http.post<Employee>(`${this.apiServiceUrl}/employees/add`, employee);
    }

    public updateEmployee(employee :Employee ): Observable<Employee>
    {
        return this.http.put<Employee>(`${this.apiServiceUrl}/employees/update`, employee);
    }

    public deleteEmployee(employeeId :number ): Observable<void>
    {
        return this.http.delete<void>(`${this.apiServiceUrl}/employees/delete/${employeeId}`);
    }

}