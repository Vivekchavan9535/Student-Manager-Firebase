import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Student } from '../modal/student';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then((res) => {
      alert("Registration Completed")
      this.router.navigate(['/login'])
      this.sendEmailForVerification(res.user)

    }, err => {
      alert(err.message)
    })
  }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true')

      if (res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/verify-email'])
      }
    }, err => {
      alert(err.message)
      this.router.navigate(['/login'])
    })
  }
  signWithGoogle() {
    const provider = new GoogleAuthProvider()
    this.fireauth.signInWithPopup(provider).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
      this.router.navigate(['/dashboard'])
    }, err => {
      alert(err.message)
    })
  }

  logout() {
    this.fireauth.signOut()
    this.router.navigate(['/login'])
  }



  //email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email'])
    }, (err: any) => {
      alert("something Wnet Wrong")
    })
  }

  //forgotPassword
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email'])
    }, err => { alert("Something Went Wrong") })
  }


}
