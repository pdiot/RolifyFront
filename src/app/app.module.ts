import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Route, Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/primeng';
import { MessageComponent } from './message/message.component';
import {GrowlModule, } from 'primeng/growl';
import { MessageService } from './services/message.service';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { IndexComponent } from './components/index/index.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChatListComponent } from './components/globalChat/chat-list/chat-list.component';
import { ChatItemComponent } from './components/globalChat/chat-item/chat-item.component';
import { AgePipe } from './pipes/age.pipe';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'index' }

];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    LobbyComponent,
    IndexComponent,
    MessageComponent,
    EditUserComponent,
    ChatListComponent,
    ChatItemComponent,
    AgePipe,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TabMenuModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DialogModule,
    GrowlModule,
  ],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
