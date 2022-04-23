import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-banking',
  templateUrl: './dialog-edit-banking.component.html',
  styleUrls: ['./dialog-edit-banking.component.scss']
})
export class DialogEditBankingComponent implements OnInit {

  currentUser!: User;
  userId!: string;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditBankingComponent>,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
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
