import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
 
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
faCalendar = faCalendar;
itemForm : FormGroup;
errorMessage : string ='';
constructor(private fb:FormBuilder,private httpService: HttpService,private router:Router){
  this.itemForm=this.fb.group({
    username: ['',[Validators.required]],
    email :['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    role:['',[Validators.required]]
  })
}
 
onSubmit(){
  console.log(this.itemForm.valid);
  if(this.itemForm.valid){
    this.httpService.registerUser(this.itemForm.value).subscribe({
      next:()=>{
          this.router.navigate([`/login`]);
      }, error:()=>{
        this.errorMessage ="Registration failed.Please try";
      }
    })
  }
}
 
}
 