import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  //defined a variable that named registerForm for Form

public registerForm!:FormGroup;

constructor(private formB:FormBuilder,private router:Router,private authSer:AuthServiceService) { }

ngOnInit(): void {
      //the function that named registerForm was called when view was started.
  //the registerForm was called when view was started.

  this.registerForm=this.formB.group({

firstname:['',[Validators.required,Validators.minLength(3)]],
lastname:['',[Validators.required,Validators.minLength(3)]],
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.minLength(5)]]
  });
}
  //defined a function for register operation.

register(){
  console.log(this.registerForm.value);
if(this.registerForm.valid){
//http was used to http request

this.authSer.registerUser(this.registerForm.value).subscribe(req=>{console.log("başarılı");
//the suscribe method has two output.
    //if reguest ended up succesfully
window.alert("başarılı");
this.router.navigate(['loginpage'])
},err=>{console.log("error");
})




}
}}
