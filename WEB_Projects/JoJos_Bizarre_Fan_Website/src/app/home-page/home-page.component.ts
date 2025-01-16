import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  @ViewChild('infoContainer') infoContainer!: ElementRef
  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }

  cursorImgSrc: string = '../../assets/cursor/j_cursor.png'

  constructor() { }
  activateCursorStlying() {
    const cursor = document.getElementById("cursor")
    document.addEventListener("mousemove", (e) => {

      const posX = e.clientX;
      const posY = e.clientY;

      if (cursor) {
        this.myCursor.nativeElement.style.left = (e.pageX - 30) + "px"
        this.myCursor.nativeElement.style.right =( e.pageY - 30)+ "px"
        console.log("cursor found")

      }
      else
        console.log("Cursor failed to activate...")
    })
  }
  ngOnInit(): void {
    // this.activateCursorStlying()
  }
}
