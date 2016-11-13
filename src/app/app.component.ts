import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService ]
})
export class AppComponent {

  constructor(
    private users : UsersService
  ){

    //vamo gravar algo
    users.create({ email : 'gu_boas@gmal.com', senha : '123123' })
    .then( resposta => {
      console.log(resposta);
    })
    .catch( error => {
      console.log(error);
    })
  }

  title = 'app works!';
}
