import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// #######################################################################################################################
// ACHTUNG: Automatische Imports von Angular Firebase gehören zur neuen API, aber ich möchte hier die
// alte API verwenden, siehe https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021 .
// LÖSUNG: Lösche die folgenden automatisch importierten Module:
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideDatabase,getDatabase } from '@angular/fire/database';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { provideStorage,getStorage } from '@angular/fire/storage';
// #######################################################################################################################

// Die benötigte Imports der alten API von Angular Firestore müssen von Hand importiert werden: 
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { FirebaseAuthService } from './firebase-auth.service';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StartComponent } from './start/start.component';
import { DialogEditBankingComponent } from './dialog-edit-banking/dialog-edit-banking.component';
import { OrdersComponent } from './orders/orders.component';
import { DialogAddOrderComponent } from './dialog-add-order/dialog-add-order.component';
import { ProductComponent } from './product/product.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { DialogEditOrderComponent } from './dialog-edit-order/dialog-edit-order.component';
import { ArchiveComponent } from './archive/archive.component';
import { HelpComponent } from './help/help.component';
import { DialogEditBirthdayComponent } from './dialog-edit-birthday/dialog-edit-birthday.component';
// Das folgende Modul kann verwendet werden, um Diagramme zu erstellen:  
import { NgChartsModule } from 'ng2-charts';

// Bei import Problemen, überprüfe auch ob alle von dir selbst erstellten Komponenten auch hier importiert wurden.
// Die CLI hat hier manchmal Bugs!!! 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    DialogAddAccountComponent,
    StartComponent,
    DialogEditBankingComponent,
    OrdersComponent,
    DialogAddOrderComponent,
    ProductComponent,
    OrderDetailComponent,
    DialogEditOrderComponent,
    ArchiveComponent,
    HelpComponent,
    DialogEditBirthdayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    // Automatische Imports von Angular Firebase:
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
    // // Nicht automatische Firestore Imports:
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatProgressBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    NgChartsModule
  ],
  // Services die dem folgenden providers Array hinzugefügt werden, sind in der gesamten App zugänglich
  // und müssen nicht mehr am Anfang importiert werden: 
  providers: [FirebaseAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
