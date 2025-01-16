import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authguardGuard } from './authguard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CharactersComponent } from './characters/characters.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { ScenesComponent } from './scenes/scenes.component';

export const routes: Routes = [
    {path: "", component: LoginPageComponent},
    {path:"home", component: HomePageComponent},//Add this to home page route: for authguard: , canActivate: [authguardGuard] 
    {path:"create", component: CreateAccountComponent},
    {path:"login", component: LoginPageComponent},
    {path:"characters", component: CharactersComponent},
    {path:"seasons", component:SeasonsComponent},
    {path:"scenes", component:ScenesComponent},
    {path:"**", component:PageNotFoundComponent}
];
