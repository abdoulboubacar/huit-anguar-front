import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register/register.service';
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationFailed: boolean;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  mailCtrl: FormControl;
  passwordCtrl: FormControl;
  passwordCheckCtrl: FormControl;
  registerForm: FormGroup;
  passwordForm: FormGroup;

  static passwordMatch(control: FormGroup) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password !== confirmPassword ? {matchingError: true} : null;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.registrationFailed = false;

    this.firstNameCtrl = this.fb.control('', Validators.required);
    this.lastNameCtrl = this.fb.control('', Validators.required);
    this.mailCtrl = this.fb.control('', Validators.required);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.passwordCheckCtrl = this.fb.control('', Validators.required);

    this.passwordForm = this.fb.group({
      password: this.passwordCtrl,
      confirmPassword: this.passwordCheckCtrl
    }, {
      validator: RegisterComponent.passwordMatch
    });

    this.registerForm = this.fb.group({
      firstname: this.firstNameCtrl,
      lastname: this.lastNameCtrl,
      mail: this.mailCtrl,
      passwordForm: this.passwordForm
    });
  }

  register() {
    const newUser = {
      firstName: this.registerForm.value.firstname,
      lastName: this.registerForm.value.lastname,
      email: this.registerForm.value.mail,
      password: this.registerForm.value.passwordForm.password
    };

    this.registerService.register(newUser).subscribe(
      success => {
        this.storage.save('user', success);
        this.router.navigate(['']);
      },
      error => {
        this.registrationFailed = true;
        console.error(error);
      }
    );
  }

}
