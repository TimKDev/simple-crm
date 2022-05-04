import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/models/order.class';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditBankingComponent } from '../dialog-edit-banking/dialog-edit-banking.component';
import { DialogEditBirthdayComponent } from '../dialog-edit-birthday/dialog-edit-birthday.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  currentUser: User = new User();
  currentUserBirthDate!: Date;
  userId: any = '';
  allOrders: any = [];
  openOrders: any = [];
  totalPayments: number = 0;
  numberOrders: number = 0;
  openPayments: number = 0;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private router: Router,
    public auth: FirebaseAuthService
  ) { }

  ngOnInit(): void {
    // Es gibt auch die Möglichkeit den Wert der Route Variablen id ohne subscribe()
    // zu bekommen, dies kann aber manchmal zu Problemen führen. => Diese Version ist sicherer! 
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
      this.getUser(); 
    });

    this.getOrders();
    this.calcStatistics();
  }

  getUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user: any) => {
      this.currentUser = new User(user);
      this.currentUserBirthDate = new Date(this.currentUser.birthDate);
    });
  }

  getOrders() {
    this.firestore
    .collection('orders')
    .valueChanges()
    .subscribe((changes: any) => {
      console.log('Received changes from DB:', changes);
      this.allOrders = changes.filter((order: Order) => {      
        return (order.customer.firstName == this.currentUser.firstName &&
          order.customer.lastName == this.currentUser.lastName &&
          order.customer.eMail == this.currentUser.eMail && 
          (order.status == 'completed' || order.status == 'payed'));
      });
      this.openOrders = changes.filter((order: Order) => {      
        return (order.customer.firstName == this.currentUser.firstName &&
          order.customer.lastName == this.currentUser.lastName &&
          order.customer.eMail == this.currentUser.eMail && 
          order.status == 'active');
      });
      this.calcStatistics();
      
    });
  }

  calcStatistics() {
    for (let i = 0; i < this.allOrders.length; i++) {
      const order = this.allOrders[i];    
      this.totalPayments += order.totalPrice;
      this.numberOrders++;
    }
    for (let i = 0; i < this.openOrders.length; i++) {
      const order = this.openOrders[i];
      this.openPayments += order.totalPrice;
    }
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

  editBirthday() {
    const dialog = this.dialog.open(DialogEditBirthdayComponent);
    dialog.componentInstance.currentUser = new User(this.currentUser);
    dialog.componentInstance.userId = this.userId;
  }

  deleteUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .delete();
    setTimeout(() => {
      this.router.navigateByUrl('/user');
    }, 0);
  }

}
