import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditBankingComponent } from '../dialog-edit-banking/dialog-edit-banking.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  currentUser: User = new User();
  userId: any = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog 
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

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.currentUser = new User(this.currentUser);
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    // Mit der vordefinierten Attribut componentInstance von Angular Material, kann auf die 
    // Komponenteninstanz zugegriffen werden, die im Dialog generiert wird. Dann kann man dieser
    // Komponente Informationen geben. Hier kann kein @Input() verwendet werden, da im HTML die
    // Dialogkomponente nicht explizit erzeugt wird, daher wird die folgende Zeile benötigt:
    dialog.componentInstance.currentUser = new User(this.currentUser);
    dialog.componentInstance.userId = this.userId;
  }

  editBanking() {
    const dialog = this.dialog.open(DialogEditBankingComponent);
    dialog.componentInstance.currentUser = new User(this.currentUser);
    dialog.componentInstance.userId = this.userId;
  }

}
