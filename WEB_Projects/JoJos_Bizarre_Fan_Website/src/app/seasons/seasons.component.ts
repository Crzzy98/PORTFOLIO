import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, HostListener } from '@angular/core';


@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeasonsComponent {
  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }
}
