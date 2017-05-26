import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;
  showUpdateProfile: boolean = false;
  profile: any = {
    first: '',
    last: '',
    photoURL: ''
  };

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  loginRedirect() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginWithEmail(email, password) {
    console.log('email - ', email);
    console.log('password - ', password);
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(
      error => {
        alert(error);
      }
    );
  }

  createUserWithEmail(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(
      error => {
        alert(error);
      }
    );
  }

  updateProfile() {
    const user = this.afAuth.auth.currentUser;
    const profile = {
      displayName: (this.profile.first + ' ' + this.profile.last) || user.displayName,
      photoURL: this.profile.photoURL || user.photoURL
    };

    user.updateProfile(profile).catch(error => {
      console.error('error - ', error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
