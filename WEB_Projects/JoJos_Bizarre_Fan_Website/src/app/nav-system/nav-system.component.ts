import { Component,HostListener,ViewChild, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav-system',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-system.component.html',
  styleUrl: './nav-system.component.css'
})
export class NavSystemComponent {
loginService = inject(LoginService)

@ViewChild('cursor') myCursor!: any
top: any;
left: any;
@HostListener('mousemove', ['$event'])
onMouseMove(event: any) {
  this.top=(event.pageY  - 40 )+ "px";
  this.left= (event.pageX  - 40)+ "px";
}
}
