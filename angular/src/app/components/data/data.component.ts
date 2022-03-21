import { Component, OnInit } from '@angular/core';
import { GetEmployeeService} from "../../services/get-employee.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  title: string = "Data works!!";
  getEmployee : any;

  constructor(private getService: GetEmployeeService) {
  }

  toggleBtn(){
    // this.getEmployee = this.getService.getData();
    // this.getService.getData().subscribe((res) => this.getEmployee = res.data)
    this.getService.getData().subscribe((res) => this.getEmployee = res.data)
  }

  ngOnInit(): void {
    // this.getService.getData().subscribe((res) => this.getEmployee = res.data)
    // this.getService.getData().subscribe((res) => this.getEmployee = res.data)
  }
}
