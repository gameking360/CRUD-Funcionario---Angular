import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

empForm: FormGroup;

  education:string[] = [
  'Matric',
  'Diploma',
  'Intermediate',
  'Graduate',
  'Post Graduate'
]

constructor(private _fb:FormBuilder, private _empService:EmployeeService,
   private _dialogRef:MatDialogRef<EmpAddEditComponent>,
   @Inject(MAT_DIALOG_DATA) private data:any,
   private _coreService:CoreService
   ){
  this.empForm = this._fb.group({
    firstName: '',
    lastName: '',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:''
  })
}
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    console.log(this.data)
  }

getData(){
  return this.data
}

onFormSubmit(){
  if(this.empForm.valid){
      if(this.data) this.updateEmp();
      
      else this.addEmp();

  }
}

  addEmp(){
    this._empService.addEmplye(this.empForm.value).subscribe({
      next: (val?:any) => {
        this._coreService.openSnackBar('Employeed added sucesfully','done')
        this._dialogRef.close(true)
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  updateEmp(){
    this._empService.updateEmploye(this.data.id,this.empForm.value).subscribe({
      next: (val?:any) => {
        this._coreService.openSnackBar('Employee updated sucesfully','done')
        this._dialogRef.close(true)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
