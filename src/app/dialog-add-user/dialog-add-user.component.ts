import { Component, OnInit } from '@angular/core';
// ACHTUNG: AngularFirestore ist NICHT AngularFirestoreModule
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;
  loading = false;

  // Wichtig vor dem Attribut indem die DI gespeichert wird, muss private 
  // oder public stehen, sonst gibt es einen Fehler:
  constructor(
    private firestore: AngularFirestore,
    private dialogRef: MatDialogRef<DialogAddUserComponent>
    ) { }

  ngOnInit(): void {
  }

  cancleDialog() {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime(); // Erhalte den TimeStamp des Datums
    console.log('Current User is:', this.user.toJSON());
    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result: any) => {
      console.log('Adding user finished', result);
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
