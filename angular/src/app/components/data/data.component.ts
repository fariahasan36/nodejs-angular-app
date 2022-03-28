import {Component, OnInit} from '@angular/core';
import {GetBookService} from "../../services/get-book.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  isLoading: boolean = false;
  title: string = "Data works!!";
  getBook: any;

  constructor(private getService: GetBookService) {
  }

  toggleBtn() {

    this.isLoading = true;
    this.getService.getDataPost().subscribe((response) => {
      if (response && response['success'] && response['data'] ) {
        this.getBook = response['data']['P_OUTPUT'];
      }
    });
  }

  ngOnInit(): void {
    // this.getService.getData().subscribe((res) => this.getBook = res.data)
    // this.getService.getData().subscribe((res) => this.getBook = res.data)
  }
}
