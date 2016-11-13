import { Component, OnInit }      from '@angular/core';
import { UsersService }           from '../services/users.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [
    UsersService
  ]
})
export class SignupComponent implements OnInit {

  submited    : boolean = false;
  model       : {}      = {};
  showError   : boolean = false;
  showSuccess : boolean = false;

  constructor( private userService : UsersService ) {

    //seta o model
    this.model = {
      email    : '',
      password : ''
    };

  }

  ngOnInit() {
  }

  onSubmit() {

    //seta o formulario como submetido
    this.submited = true;

    //tenta criar o usuaro
    this.userService.create(this.model)
    .then( success => {
      console.log(success);
      this.showSuccess = true;
    })
    .catch( error => {
      console.error(error);
      this.showError = true;
    })

  }

}
