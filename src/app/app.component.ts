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
  role!: string;
  
  constructor(
    public fireAuth: FirebaseAuthService,
    public dialog: MatDialog
  ){ }

  ngOnInit() {
  }

  async onSignIn(email: string, password: string) {
    await this.fireAuth.signIn(email, password);
    if (this.fireAuth.loggedIn) this.loggedIn = true; 
  }

  logOut() {
    this.fireAuth.logOut();
    this.loggedIn = false;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loggedIn = this.fireAuth.loggedIn;
    });
  }


  
}
