//importa os modulos do feathers
const feathers       = require('feathers/client');
const socketio       = require('feathers-socketio/client');
const io             = require('socket.io-client');
const localstorage   = require('feathers-localstorage');
const hooks          = require('feathers-hooks');
const rest           = require('feathers-rest/client');
const authentication = require('feathers-authentication/client');
const superagent     = require('superagent');

//importa os modulos do angular
import { Injectable } from '@angular/core';

/**
 * 
 * Feathers
 * 
 * Classe de implementação do objeto Feathers para
 * requisições na API. 
 * 
 * Essa classe provém autenticacao, escolha do método e
 * implementação dos métodos de crud básicos
 * 
 * @author Gustavo Vilas Boas <gu.boas13@gmail.com>
 * @since 11/2016
 * 
 */
@Injectable()
export abstract class Feathers {

  //guarda a aplicacao feathers
  protected _app           : any;

  //guarda a url da api
  protected _HOST          : string = 'http://localhost:3030';
  
  //guarda o service sendo usado
  private _service         : any;

  //guarda se o service é autenticado ou nao
  protected _protected     : boolean = false;

  //diz qual a engine usada no service
  protected _defaultEngine : string   = 'rest';
  
  /**
   * 
   * constructor
   * 
   * Metodo construtor da classe
   * 
   * @param service       : string { o nome do service }
   * @param defaultEngine : strng { a engine usada, pode ser rest ou socket }
   * 
   */
  constructor( service : string , defaultEngine : string ) { 

    //seta a engine default
    this._defaultEngine = defaultEngine;

    //inicializa o feathers app
    this._app = feathers();

    //verifica o tipo de engine sendo usado
    if(this._defaultEngine === 'rest') {

      //configura para usar o rest
      this._setRest();
    } else {

      //configura para user socket
      this._setSocket();
    }

    //configura os hooks
    this._app.configure(hooks());

    //seta o service
    this._service = this._app.service(service);
    
    //verifica se é necessário login
    if( this._protected ) {

      //verifica o token e o usuario
      if( typeof this._app.get('token') === 'undefined' || typeof this._app.get('user') === 'undefined')
          
          //dispara erro de usuáro não autenticado
          throw new Error("Usuáro não autenticado!");
    }
  }

  /**
   * 
   * _setSocket
   * 
   * Seta o socket para o service que esta sendo usado
   * 
   * @param void
   * @return void
   * 
   */
  private _setSocket() : void {

    //inicializa o socket
    let socket = io(this._HOST);

    //seta o socket no app
    this._app.configure(socketio(socket));
  }
  
  /**
   * 
   * _setRest
   * 
   * Seta o rest para o service que esta sendo usado
   * 
   */
  private _setRest() : void {

    //seta a api rest
    this._app.configure(rest(this._HOST).superagent(superagent));
  }

  /**
   * 
   * setAuthentication
   * 
   * Define como será feita a autenticacao desse service
   * 
   * @param options : {} as opcoes de autenticacao ex.:{
   *                                                      storage: window.localStorage
   *                                                    }
   */
  protected setAuthentication( options : {} ) : void {

    //seta os a autenticacao do service
    this._app.configure(authentication(options));
  }

  /**
   * 
   * listen
   * 
   * Adiciona um listener a um evento especifico
   * 
   * @param event : string { o evento a ser escutado }
   * @param callback : any { a função de callback para o evento }
   * 
   */
  protected listen ( event : string, callback : any) : any {
    
    //adiciona o listner
    return this._service.on(event, callback);
  }

  /**
   * 
   * find
   * 
   * Faz uma busca no service
   * 
   * @param query : any { a query a ser executada }
   * @return any
   * 
   */
  find(query: any = false) : any {
    return this._service.find(query);
  }

  /**
   * 
   * get
   * 
   * Pega um item especifico
   * 
   * @param id : string { o id do item a ser pego }
   * @param query : any { a query a  ser executada }
   * @return any
   * 
   */
  get(id: string = '', query: any = false) : any{
    return this._service.get(id, query);
  }

  /**
   * 
   * create
   * 
   * Cria um novo registro no service
   * 
   * @param data : any { o novo registro a ser salvo}
   * @return any
   * 
   */
  create(data: any) : any {
    return this._service.create(data);
  }

  /**
   * 
   * remove
   * 
   * Remove um item especifico
   * 
   * @param id : string { o id do item a ser removido }
   * @param query : any { a query a ser executada }
   * 
   */
  remove(id: string, query: any = false) : any {
    return this._service.remove(id, query);
  }

  /**
   *
   * update
   *  
   * Faz o update do dado especificado
   * 
   * @param id : string { id do dado a ser atualizado }
   * @param data : any { O dados novo }
   * @param params : any { Os parametros para a atualizacao }
   * @return any
   * 
   */
  update(id : string , data : any , params : any = false ) : any {
    return this._service.update(id,data,params);
  }

  /**
   *
   * update
   *  
   * Faz o patch do dado especificado
   * 
   * @param id : string { id do dado a ser atualizado }
   * @param data : any { O dados novo }
   * @param params : any { Os parametros para a atualizacao }
   * @return any
   * 
   */
  patch(id : string , data : any , params : any = false ) : any {
    return this._service.patch(id,data,params);
  }
}
