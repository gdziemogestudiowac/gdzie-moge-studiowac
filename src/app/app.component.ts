import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth) {}

  logIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(console.log);

  }
}
