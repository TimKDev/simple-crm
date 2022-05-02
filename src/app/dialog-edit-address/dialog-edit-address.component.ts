import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  currentUser!: User;
  userId!: string;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.currentUser.toJSON()) // In den Docs kann man nachlesen, dass die 
    // update() Methode ein Promise und keine Observable zurückgibt, daher muss man 
    // hier mit .then() arbeiten: 
    .then(() => {
      this.dialogRef.close();
      this.loading = false;      
    });
    
  }

}
