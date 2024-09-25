import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  email: string = '';
  password: string = '';

  ngOnInit(): void {
  }

  login() {
    if (this.email == '') {
      alert('Enter your email')
      return;
    }
    if (this.password == '') {
      alert('Enter your password')
      return;
    }

    this.auth.login(this.email, this.password)
    this.email = '';
    this.password = ''
  }


  signInWithGoogle(){
    this.auth.signWithGoogle()
  }

}
