import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  email: string = '';
  password: string = '';

  ngOnInit(): void {
  }

  register() {
    if (this.email == '') {
      alert("Enter Your Email")
      return;
    }

    if (this.password == '') {
      alert("Enter Your Password")
      return;
    }

    this.auth.register(this.email, this.password)

  }
}
