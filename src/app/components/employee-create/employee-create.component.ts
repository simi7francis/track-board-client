import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from '../app-component/login-service.service';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {AmazingTimePickerService} from 'amazing-time-picker';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})

export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  scheduleForm: FormGroup;
  private _id: any;
  data: any;
  allretailer: any = [];
  retailerDate: any = [];
  products: any = [];
  allselectedRetailer: any = [];
  selectedOutTime = '00:00';
  selectedInTime = '00:00';
  theDate: Date = new Date();
  retailer: any = [];

  constructor(
    protected formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private atp: AmazingTimePickerService,
    private _router: Router,
    private loginService: LoginServiceService
  ) {

    this._activatedRoute.params.subscribe(params => {
      this._id = params.id;
      console.log(params)
      if (this._id) {
        this.loginService.getSingleDetailsById(this._id).subscribe(
          data => {
            this.allretailer = data;
            this.allretailer.forEach(ele => {
              this.allselectedRetailer.push({
                retailer_name: ele.retailer_name,
                in_time: ele.in_time,
                out_time: ele.out_time,
                executive_id: ele.executive_id
              })
            });
            this.source.load(this.allselectedRetailer)
          },
          err => {
            console.error(err)
          }
        );
      }
    });

    this.scheduleForm = formBuilder.group({
      retailer_name: ["", Validators.required],
      inTime: ["", Validators.required],
      date: ["", Validators.required],
      outTime: ["", Validators.required],
    });
  }

  openOutTimeDialog() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedOutTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedOutTime = time;
    });
  }

  openInTimeDialog() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedInTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedInTime = time;
    });
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
      executive_id: {
        title: "Executive Name",
        editable: false,
      },
      retailer_name: {
        title: "Retailer Name",
        editable: false,
      },

      in_time: {
        title: 'In Time',
        valuePrepareFunction: (in_time) => {
          const raw = new Date(in_time);
          const formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy h:mm a');
          return formatted;
        }
      },
      out_time: {
        title: 'Out Time',
        valuePrepareFunction: (out_time) => {
          const raw = new Date(out_time);
          raw.setMinutes(raw.getMinutes() + 1)
          return new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy h:mm a');
        }
      },
    },
  };

  ngOnInit() {
  }

  parseTime(t) {
    const d = new Date();
    const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
  }

  onDate(event) {
    console.log(event)
    this.theDate = new Date(event);
  }

  onSubmit() {
    const inTimeDate = this.parseTime(this.selectedInTime);
    const outTimeDate = this.parseTime(this.selectedOutTime);
    const builtInTime: Date = new Date(this.theDate.getFullYear(), this.theDate.getMonth(), this.theDate.getDate(), inTimeDate.getHours(), inTimeDate.getMinutes(), 0, 0);
    const builtOutTime: Date = new Date(this.theDate.getFullYear(), this.theDate.getMonth(), this.theDate.getDate(), outTimeDate.getHours(), outTimeDate.getMinutes() - 1, 59, 999);
    const retailer_name = this.scheduleForm.controls["retailer_name"].value;

    this.loginService.createSchedule(builtInTime, builtOutTime, retailer_name, this._id).subscribe(result => {
      console.log(result)
      this.allretailer = [result];
      console.log(result)
      this.allretailer.forEach(ele => {
        this.allselectedRetailer.push({
          retailer_name: ele.retailer_name,
          in_time: ele.in_time,
          out_time: ele.out_time,
          executive_id: ele.executive_id
        })

      });
      console.log(this.allselectedRetailer)
      this.source.load(this.allselectedRetailer)
    })
  }
}
