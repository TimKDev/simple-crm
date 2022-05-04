import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-birthday',
  templateUrl: './dialog-edit-birthday.component.html',
  styleUrls: ['./dialog-edit-birthday.component.scss']
})
export class DialogEditBirthdayComponent implements OnInit {

  currentUser!: User;
  userId!: string;
  birthDate!: Date;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditBirthdayComponent>,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.currentUser.birthDate = this.birthDate.getTime();
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.currentUser.toJSON())
    .then(() => {
      this.dialogRef.close();
      this.loading = false;      
    });
    
  }

}
