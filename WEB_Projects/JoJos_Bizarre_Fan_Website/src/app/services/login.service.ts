import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService implements OnDestroy, OnInit {
  userAuthorized: boolean = false
  userNameFound: boolean = false;
  userPasswordFound: boolean = false;
  newAccountCreatedthisSession: boolean = false
  //Array will hold data for all users as individual objects
  userArray: { _id: string, userName: string, password: string }[] = []

  controllerUrl: string = 'http://localhost:3000/login'
  headers = new Headers();
  subscriber!: any

  //Boolean value indicating the state of login acceptance
  loginAccepted: boolean = false
  doesInputUsernameExist: boolean = false

  currentUser: string = ""
  constructor(private http: HttpClient) {
    this.getAllUsers()
  }

  getAllUsers() {
    //Request is made to route defined in controller and subscribed to get data from observable returned
    this.subscriber = this.http.get(this.controllerUrl).subscribe({
      next: (res: any) => {
        console.log(`Raw Res from subscription(checkForUser): ${res}`)

        //Save all user data to array belonging to service
        this.userArray = JSON.parse(JSON.stringify(res))
        console.log("Res after subscription(checkForUser): ", res)
        console.log("Res stringified(checkForUser): ", JSON.stringify(res))
      },
      error: (err) => {
        console.log(`Error while subscribing to observable from server: `)
        console.log(err.error)
      }
    }
    )
  }
  //Checks user credentials against data being held in the userArray
  checkForUserCredentials(inputUsername: string | null, inputPassword: string | null): boolean {
    this.doesInputUsernameExist = false
    this.userNameFound = false
    this.userPasswordFound = false 
    this.loginAccepted = false
    console.log(`input name in check: ${inputUsername}`)
    // Iterate through array containing login data retrieved from server
    this.userArray.forEach((user: { _id: string, userName: string, password: string }) => {
      if (user.userName == inputUsername) {
        this.userNameFound = true;
        console.log(`dataName: ${user.userName}, inputName: ${inputUsername}`)
        if (user.password == inputPassword) {
          this.userPasswordFound = true;
        }
      }
    });
  
    if (this.userNameFound && this.userPasswordFound) {
      this.loginAccepted = true;
      console.log("Login Accepted");
    } else {
      if (!this.userNameFound) {
        console.log("Username not found. Try a different Username.");
      }
      if (!this.userPasswordFound) {
        console.log("Password not found. Try a different password.");
      }
    }
    this.doesInputUsernameExist = this.userNameFound;

    return this.loginAccepted;
  }
  
  createAccount(newAccountName: string | null, newAccountPassword: string | null) {
    const createEndpoint = '/create'

    let newAccount = {
      userName: newAccountName,
      password: newAccountPassword
    }

    this.http.post((this.controllerUrl + createEndpoint), newAccount).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.log("Error from service while creating account: ", err)
        console.log(`Error during post request: ${JSON.stringify(err)}`)
      }
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
