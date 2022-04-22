import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-dialog-add-account',
  templateUrl: './dialog-add-account.component.html',
  styleUrls: ['./dialog-add-account.component.scss']
})
export class DialogAddAccountComponent implements OnInit {

  loading = false;
  userSignUp = false;

  isSeller = false;
  isBanker = false;
  isAdmin = false;

  constructor(
    private fireAuth: FirebaseAuthService,
    public dialogRef: MatDialogRef<DialogAddAccountComponent>
  ) { }

  ngOnInit(): void {
  }

  async onSignUp(email: string, password: string) {
    this.loading = true;
    await this.fireAuth.signUp(email, password, {
      isSeller: this.isSeller,
      isBanker: this.isBanker,
      isAdmin: this.isAdmin
    });
    if (this.fireAuth.loggedIn){
      this.dialogRef.close(); 
      
    } 
    this.loading = false;
  }

}
