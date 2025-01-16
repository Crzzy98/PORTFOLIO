import { Component, OnInit, inject, ViewChild, HostListener  } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { RouterLink } from "@angular/router"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  loginRouter = inject(Router)
  loginService = inject(LoginService)
  shouldAskAboutAccount: boolean = false
  userNameDoesNotExist: boolean = false

  //Login Form
  loginInfo = new FormGroup({
    formUsername: new FormControl('', Validators.required),
    formPassword: new FormControl('', Validators.required),
  })
  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }
  ngOnInit(): void {
  }
  doRequest() {
  }
  onSubmit() {
    console.log("submit executed...")
    //Service method accesses express server, checks for username and password existence 
    if (
      this.loginService.checkForUserCredentials(this.loginInfo.controls["formUsername"].value,
        this.loginInfo.controls["formPassword"].value)) {
      //router used to navigate to home page 
      //Login success displayed as page/modal/or conditionary html 
      this.loginRouter.navigate(["/home"])
      console.log("Login successful")
    } else {
      //prompt user as to whether they would like to make an account
      this.shouldAskAboutAccount = true
      if (!this.loginService.doesInputUsernameExist)
        this.userNameDoesNotExist = true
      console.log(`user bool value: ${this.userNameDoesNotExist}`)
    }
  }
}
