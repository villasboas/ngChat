import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent }    from './app.component';
import { LoginComponent }  from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent }   from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    
    //rotas da aplicacao
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      } , {
        path : 'signup',
        component : SignupComponent
      } , {
        path : 'chat',
        component : ChatComponent
      } , {
        path : '**',
        component : LoginComponent
      } , {
        path : '',
        component : LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

