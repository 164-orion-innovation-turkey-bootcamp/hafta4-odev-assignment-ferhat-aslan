import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConfirmedValidator } from 'src/app/validator/ConfirmedValidator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  //defined a variable that named registerForm for Form
user:User={
  firstname: '',
  lastname: '',
  email: '',
  password: ''
};
  public registerForm!: FormGroup;

  constructor(
    private formB: FormBuilder,
    private router: Router,
    private authSer: AuthServiceService
  ) {}

  ngOnInit(): void {
    //the function that named registerForm was called when view was started.
    //the registerForm was called when view was started.

    this.registerForm = this.formB.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
            ),
          ],
        ],
        confirmpassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmpassword'),
      }
    );
  }
  //defined a function for register operation.

  register() {
    if (this.registerForm.valid) {
      //a user model was defined.
      this.user={
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      //sent the user model to server, and suscribed for the request.
      this.authSer.registerUser(this.user).subscribe((req) => {
        //the suscribe method has two output.
        //if reguest ended up succesfully
        window.alert('başarılı');
        this.router.navigate(['loginpage']);
      });
    }
  }
  get f() {
    return this.registerForm.controls;
  }
}
