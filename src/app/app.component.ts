import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';
import { FirebaseAuthService } from './firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'simple-crm';
  loggedIn = false;
  boolOpen: boolean = true;
  
  constructor(
    public fireAuth: FirebaseAuthService
  ){ }

  ngOnInit() {
    this.setBoolOpen();
    const email = localStorage.getItem('userAuthEMail');
    const password = localStorage.getItem('userAuthPassword');
    if(email && password){
      this.fireAuth.signIn(email, password);
      this.loggedIn = true;
    }
  }

  logUserIn(bool: boolean){
    this.loggedIn = bool;
  }

  logOut() {
    this.fireAuth.logOut();
    this.loggedIn = false;
  }

  setBoolOpen() {
    this.boolOpen = true;
    if(window.innerWidth < 1200) this.boolOpen = false;
  }
}
