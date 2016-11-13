import { Injectable } from '@angular/core';
import { Feathers }   from '../core/Feathers';

@Injectable()
export class UsersService extends Feathers{

  constructor() { 

    //chama o metodo contrutor da classe pai
    super('users', 'rest');
  }

}
