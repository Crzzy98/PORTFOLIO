import { Component, ElementRef, ViewChild,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {YouTubePlayerModule} from '@angular/youtube-player'
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, YouTubePlayerModule],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScenesComponent {
  controllerUrl: string = 'http://localhost:3000/scenes'
  @ViewChild('sceneInput') sceneInput!: ElementRef
  subscriber!: any
  scenesArray: { _id: string, url: string }[] = []
  startSceneCreation:boolean = false
  displayScenesMsg:boolean = false
  sceneInfoObtained:boolean = false 
  @ViewChild('cursor') myCursor!: any
  top: any;
  left: any;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.top=(event.pageY  - 40 )+ "px";
    this.left= (event.pageX  - 40)+ "px";
  }


  constructor(private http: HttpClient, private router: Router) {
    this.getAllScenes()
  }
  getAllScenes() {
    //Request is made to route defined in controller and subscribed to get data from observable returned
    this.subscriber = this.http.get(this.controllerUrl).subscribe({
      next: (res: any) => {
        console.log(`Raw Res from subscription(): ${res}`)

        this.scenesArray = JSON.parse(JSON.stringify(res))
        console.log("Res after subscription(getAllScenes): ", res)

        this.sceneInfoObtained = true
      },
      error: (err) => {
        console.log(`Error while subscribing to observable from server: `)
        console.log(err.error)
      }
    }
    )
  }
  addScene() {

    this.startSceneCreation = false
    this.displayScenesMsg = false
    const createEndpoint = '/create'

    //Retrieve user input
    const newUrl = this.sceneInput.nativeElement.value;
    if(this.isValidYoutubeUrl(newUrl)){
      console.log("Url validated")
      let newScene = {
        url: newUrl
      }
      this.http.post((this.controllerUrl + createEndpoint), newScene).subscribe({
        next: (res: any) => {
        },
        error: (err) => {
          console.log("Error from service while adding scene: ", err)
          console.log(`Error during post request: ${JSON.stringify(err)}`)
        }
      })
    } else {
      this.displayScenesMsg = true
      this.startSceneCreation = false
    }
    this.getAllScenes()
    this.reloadComponentWithoutRouting()
  }
  getVideoId(url:string) : string{
    const regex = /[?&]v=([^&#]*)/; //Regular expression to match the video ID
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  }
  openSceneCreationPrompt(){
    console.log('Prompt should\'ve opened')
    this.startSceneCreation = true
    this.displayScenesMsg = false
  }
   isValidYoutubeUrl(url:string) {
    // Regular expression to check if the string is a valid YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
  }

  deleteScene(deleteSceneUrl:string){
    this.scenesArray.forEach((scene: { _id: string, url: string })=> {
      if(scene.url == deleteSceneUrl){
        console.log("Scene ID: ", scene._id)
        this.http.delete(this.controllerUrl + `/${scene._id}`).subscribe({
          next: (res: any) => {
            //console.log(`REsponse: ${JSON.stringify(res)}`)
          },
          error: (err) => {
            console.log(`Error during post request: ${JSON.stringify(err)}`)
          }
        })
      }
    })
    this.getAllScenes()
    this.reloadComponentWithoutRouting()

  }

reloadComponentWithRouting(): void {
  this.router.navigateByUrl('/scenes', { skipLocationChange: true }).then(() => {
    this.router.navigate(['app-scenes']);
  });
  console.log('Component Reloaded...')
}
reloadComponentWithoutRouting(): void {
  window.location.reload();
}
ngOnDestroy(): void {
  this.subscriber.unsubscribe();
  
}
}
