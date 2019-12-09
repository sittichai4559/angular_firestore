import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

import { EmployeeService } from "src/app/shared/employee.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      fullName: "",
      position: "",
      empCode: "",
      mobile: ""
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;

    if (form.value.id == null) {
      this.firestore.collection("employees").add(data);
      this.resetForm(form);
      this.toastr.success("Submitted successfully", "EMP. Register");
    } else {
      this.firestore.doc("employees/" + form.value.id).update(data);
    }
  }
}
