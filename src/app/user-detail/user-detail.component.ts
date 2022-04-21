import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  currentUser!: User;
  userId: any = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore  
  ) { }

  ngOnInit(): void {
    // Es gibt auch die Möglichkeit den Wert der Route Variablen id ohne subscribe()
    // zu bekommen, dies kann aber manchmal zu Problemen führen. => Diese Version ist sicherer! 
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
      this.getUser(); 
    });
  }

  getUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user: any) => {
      this.currentUser = new User(user);
      console.log('Current User', this.currentUser);
      
    });
  }

}
