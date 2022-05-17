import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // user = new User();
  allUsers: any = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: FirebaseAuthService
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'}) // Durch Hinzufügen dieses Arguments, wird
    // die Id unter der der User im Firestore gespeichert wird, in einem Attribut des 
    // Users mit Namen customIdName gespeichert.
    .subscribe((changes: any) => {
      console.log('Received changes from DB:', changes);
      this.allUsers = changes;
      
    });
  }

  openDialog() {
    // An die Material Service Methode open() wird die Komponente übergeben, die im
    // Dialogfenster angezeigt werden soll:
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
