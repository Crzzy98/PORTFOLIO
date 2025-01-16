import { Component, inject, ViewChild, HostListener } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  loginRouter = inject(Router)
  passwordsDontMatch!: boolean
  usernameFoundByService!: boolean
  passwordFoundByService!: boolean
  accountCreationSuccessful: boolean = false
  //Form group for create account form
  createAccountForm = new FormGroup({
    newUserName: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    confirmedPassword: new FormControl("", Validators.required)
  })

  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }

  constructor(private loginService: LoginService) { }
  confirmPassword(): boolean {
    if (this.createAccountForm.controls["newPassword"].value
      != this.createAccountForm.controls["confirmedPassword"].value) {
      console.log("Passwords do no match...")
      this.passwordsDontMatch = true
    }
    return !this.passwordsDontMatch
  }
  onSubmit() {
    //Paaswords checked for match before confirming account data is new
    if (this.confirmPassword()) {
      console.log("Password match confirmed")
    }
    //Check for existence of account in data base 
    if (!this.loginService.checkForUserCredentials(this.createAccountForm.controls["newUserName"].value,
      this.createAccountForm.controls["confirmedPassword"].value)) {
      //if account does not exist, create new account and add to database
      if (this.loginService.doesInputUsernameExist) {
        this.usernameFoundByService = true
        console.log("This account already exists within database")
      } else {
        this.loginService.createAccount(this.createAccountForm.controls["newUserName"].value,
          this.createAccountForm.controls["confirmedPassword"].value)
        this.accountCreationSuccessful = true
        this.loginService.newAccountCreatedthisSession = true
        this.loginService.userArray.push()
        this.routeToLogin()
      }
    }
  }

  routeToLogin() {
    const element = document.getElementById('background_image');

    if (element)
      element.style.backgroundImage = 'url("path/to/your/image.jpg")';

    setTimeout(() => {
      this.loginRouter.navigateByUrl('/login')
    }, 5000)
  }
}
