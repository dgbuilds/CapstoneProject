import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})

export class AddResourceComponent implements OnInit {
    resourceForm: FormGroup;
    errorMessage: string = '';
    resources: any[] = [];
    constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder){
        this.resourceForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            availability: [null,Validators.required]
        });
    }
    ngOnInit(): void {
        this.getResources();
    }
 
    getResources(){
        this.httpService.getAllResources().subscribe((res:any[])=>
        this.resources = res);
    }
 
    onRadioChange(selectedValue: string) {
        if (selectedValue === 'availability') {
          this.resourceForm.get('availability')?.setValue(true);
          document.getElementById('unavailability')?.setAttribute('disabled', 'true');
          document.getElementById('availability')?.removeAttribute('disabled');
        } else if (selectedValue === 'unavailability') {
          this.resourceForm.get('availability')?.setValue(false);
          document.getElementById('availability')?.setAttribute('disabled', 'true');
          document.getElementById('unavailability')?.removeAttribute('disabled');
        }
    }
 
    onSubmit(): void{
        if(this.resourceForm.valid){
            this.httpService.addResource(this.resourceForm.value).subscribe(()=>
            this.getResources())
        }else{
            this.errorMessage = "Form is invalid";
        }
    }
}
 
 