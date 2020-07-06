import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from '../../services/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messages: string[] = [];

  constructor(private feathers: FeathersService, private router: Router) {}

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    if (!email || !password) {
      this.messages.push('Incomplete credentials!');
      return;
    }

    // try to authenticate with feathers
    this.feathers.authenticate({
      strategy: 'local',
      email,
      password
    })
      // navigate to base URL on success
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.messages.unshift('Wrong credentials!');
      });
  }

  signup(email: string, password: string) {
    this.feathers.service('users')
      .create({email, password})
      .then(() => this.messages.push('User created.'))
      .catch(err => this.messages.push('Could not create user!'))
    ;
  }

}
