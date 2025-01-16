import { AfterContentInit, AfterRenderPhase, AfterViewChecked, AfterViewInit, 
  Component, OnDestroy, OnInit, inject, ViewChild, HostListener} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChractersService } from '../services/chracters.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CharactersComponent implements OnInit, OnDestroy{
  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }
  
  infoArray: {
    id: number, name: string,
    japaneseName: string, image: string,
    abilities: string, nationality: string,
    family: string, chapter: string,
    living: boolean, isHuman: boolean
  }[] = []

  imgUrls: string[] = []
  subscriber!: any

  characterInfoObtained: boolean = false

  constructor(private charactersService: ChractersService) {}
  
  displayAllCharactersInfo() {
    console.log("display all method executed ")

    const swiperContainer = document.querySelector('swiper-container')
    //const newSlide = document.createElement('swiper-container');
    let characterCount = 0
    let allSlidesHTML = ''

    this.subscriber = this.charactersService.getAllCharacterInfo().subscribe(
      {
        next: (res: any) => {

          //Chracter info added to array
          const jsonArray = JSON.parse(JSON.stringify(res))

          //Save all user data to array belonging to service
          jsonArray.forEach((character: {
            id: number, name: string,
            japaneseName: string, image: string,
            abilities: string, nationality: string,
            family: string, chapter: string,
            living: boolean, isHuman: boolean
          }) => {
            // console.log("character name: ", character.name)
            this.infoArray.push(character)
            this.imgUrls.push("https://jojos-bizarre-api.netlify.app/assets/"+ character.image)
          });
          if(this.infoArray[0].name )
          console.log(`char in service array: ${this.infoArray[0].name}`)

          this.characterInfoObtained = true
          console.log("display all method ended")
        },
        error: (err) => {
          console.log(`Error while subscribing to observable from server: `)
          console.log(err.error)
        }
      }
    )
  }
  ngOnInit(): void {
    this.displayAllCharactersInfo()

  }
 ngAfterViewChecked(): void {
 }

 ngOnDestroy(): void {
    this.subscriber.unsubscribe()

 }
}
