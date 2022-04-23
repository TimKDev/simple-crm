import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddAccountComponent } from '../dialog-add-account/dialog-add-account.component';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  loading = false;
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(
    public fireAuth: FirebaseAuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async onSignIn(email: string, password: string) {
    this.loading = true;
    await this.fireAuth.signIn(email, password);
    if (this.fireAuth.loggedIn) this.loggedIn.emit(true); 
    this.loading = false;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loggedIn.emit(this.fireAuth.loggedIn);
    });
  }
}
