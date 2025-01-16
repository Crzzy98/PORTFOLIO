import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChractersService {
  dataVal: string = 'my data value'

  controllerUrl: string = "https://stand-by-me.herokuapp.com/api/v1/characters"
  characterInfoArray: {
    id: number, name: string,
    japaneseName: string, image: string,
    abilities: string, nationality: string,
    family: string, chapter: string,
    living: boolean, isHuman: boolean
  }[] = []
  subscriber!: any
  charactersInfoRetrieved: boolean = false 

  constructor(private http: HttpClient) { }

  //Method retirves all character info from API
  getAllCharacterInfo(): Observable<any>  {
    return this.http.get(this.controllerUrl)
  }
}
