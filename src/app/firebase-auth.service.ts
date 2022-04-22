import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  loggedIn = false;
  // Die folgenden Variablen definieren die Berechtigungen des verschiedenen eingeloggeden User:
  isSeller = false;
  isBanker = false;
  isAdmin = false;


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
    })
    .catch(err => {
      console.warn(err);
    });
  }

  async signUp(email: string, password: string, config = {isSeller: false, isBanker: false, isAdmin: false}) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .catch(err => {
      // Wie kann man hier die verschiedneen Fehler (keine valid E-Mail, bzw. zu kurzes Passwort) unterscheiden
      // ein entsprechendes Alert ausgeben?
      // ##########################################################################################
      console.warn(err);
    });
    // After creating the account the new created user is logged in and the 
    // user privaleges are save to the firestore where the user UID is used as
    // its key:
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true;
      // let userUID = res.user?.uid;
      this.firestore
      .collection('accounts')
      .doc(`${res.user?.uid}`)
      .set(config)
    });
    

  }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('userAuth');
    this.loggedIn = false;
  }
  
}
