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
import { UtilisateurDetailsComponent } from './components/utilisateur/utilisateur-details/utilisateur-details.component';
import { PartieEncoursComponent } from './components/partie/partie-encours/partie-encours.component';
import { PartieListeComponent } from './components/partie/partie-liste/partie-liste.component';
import { PartiePreviewComponent } from './components/partie/partie-preview/partie-preview.component';
import { PartieDetailsComponent } from './components/partie/partie-details/partie-details.component';
import { PartieFormComponent } from './components/partie/partie-form/partie-form.component';
import { PartieImageComponent } from './components/partie/partie-image/partie-image.component';
import { ListeUtilisateursComponent } from './components/sidebar/liste-utilisateurs/liste-utilisateurs.component';
import { ListeJoueursComponent } from './components/sidebar/liste-joueurs/liste-joueurs.component';
import { PersonnageListeComponent } from './components/personnage/personnage-liste/personnage-liste.component';
import { PersonnagePreviewComponent } from './components/personnage/personnage-preview/personnage-preview.component';
import { PersonnageDetailsComponent } from './components/personnage/personnage-details/personnage-details.component';
import { PersonnageFormComponent } from './components/personnage/personnage-form/personnage-form.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DiceComponent } from './components/partie/dice/dice.component';
import { AgePipe} from './pipes/age.pipe';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'index', component: IndexComponent },
  { path: 'partie', component: PartieEncoursComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }

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
    UtilisateurDetailsComponent,
    PartieEncoursComponent,
    PartieListeComponent,
    PartiePreviewComponent,
    PartieDetailsComponent,
    PartieFormComponent,
    PartieImageComponent,
    ListeUtilisateursComponent,
    ListeJoueursComponent,
    PersonnageListeComponent,
    PersonnagePreviewComponent,
    PersonnageDetailsComponent,
    PersonnageFormComponent,
    SidebarComponent,
    DiceComponent,
    AgePipe
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
    AngularFontAwesomeModule
  ],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
