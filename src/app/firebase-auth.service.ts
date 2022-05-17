import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public loggedIn = false;
  // Die folgenden Variablen definieren die Berechtigungen des verschiedenen eingeloggeden User:
  public isSeller = false;
  public isBanker = false;
  public isAdmin = false;


  constructor(
    private firebaseAuth : AngularFireAuth,
    private firestore: AngularFirestore 
  ) { }

  // Sign User in and save the user data to local storage such that the user doesnt need
  // to sign in again:
  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true;    
      this.updateLocalData(res);
      localStorage.setItem('userAuthEMail', email);
      localStorage.setItem('userAuthPassword', password);
    })
    .catch(err => {
      alert(err);
    });
  }

  async signUp(email: string, password: string, config = {isSeller: false, isBanker: false, isAdmin: false}) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .catch(err => {
      alert(err);
    });
    // After creating the account the new created user is logged in and the 
    // user privaleges are save to the firestore where the user UID is used as
    // its key:
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true;
      this.firestore
      .collection('accounts')
      .doc(`${res.user?.uid}`)
      .set(config)
      // Update the Attributs of this Service.
      this.updateLocalData(res);
    });
  }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('userAuthEMail');
      localStorage.removeItem('userAuthPassword');
    this.loggedIn = false;
  }

  updateLocalData(res: any) {
    this.firestore
      .collection('accounts')
      .doc(`${res.user?.uid}`)
      .valueChanges()
      .subscribe((config: any) => {
        this.isSeller = config.isSeller;
        this.isBanker = config.isBanker;
        this.isAdmin = config.isAdmin;
      });
  }
  
}
