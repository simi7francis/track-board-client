import {Component, OnInit} from '@angular/core';

import {LocalDataSource} from 'ng2-smart-table';

import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {LoginServiceService} from '../app-component/login-service.service';
import {ButtonDetailComponent} from './button-details.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  entryComponents: [ButtonDetailComponent]

})

export class EmployeeListComponent implements OnInit {

  Employee: any = [];
  allUsers: any = [];

  constructor(protected formBuilder: FormBuilder,
              private _router: Router, private loginService: LoginServiceService) {
  }

  ngOnInit() {
    this.getAllUsers()
  }

  public source = new LocalDataSource();
  public settings = {
    hideSubHeader: true,
    actions: {
      delete: false,
      edit: false,
      add: false
    },
    attr: {
      class: 'table table-bordered'
    },
    edit: {
      editButtonContent: 'Edit',
      saveButtonContent: 'Save ',
      cancelButtonContent: 'Cancel ',
      confirmSave: true,
    },


    delete: {
      deleteButtonContent: "Delete",
      confirmDelete: true
    }
    ,
    columns: {
      'slNo': {
        title: 'Sl No',
        editable: false,
        valuePrepareFunction(value, row, cell) {
          return cell.row.index + 1;
        }
      },
      userId: {
        title: "User Name",
        editable: false,
      },
      role: {
        title: "Role",
        editable: false,
      },
      viewDetail: {
        title: "Detail",
        type: "custom",
        renderComponent: ButtonDetailComponent
      },
    }
  };

  getAllUsers() {
    this.loginService.getAllUsers().subscribe((data) => {
      this.Employee = data;
      console.log(this.Employee)
      this.Employee.forEach(ele => {

        this.allUsers.push({
          userId: ele.userId,
          role: ele.role,
          id: ele.id
        })
      });
      console.log(this.allUsers)
      this.source.load(this.allUsers)
      console.log(data)
    })
  }

}
