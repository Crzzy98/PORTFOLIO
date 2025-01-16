import { Component,ViewChild, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { CharactersComponent } from './characters/characters.component';
import { NavSystemComponent } from './nav-system/nav-system.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavSystemComponent, LoginPageComponent, CharactersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';

  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY )+ "px";
    this.left= (event.pageX)+ "px";
  }
}
