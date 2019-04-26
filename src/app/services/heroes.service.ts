import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';
import { HeroeResponse } from '../interfaces/heroe-response';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
    heroeURL: string = 'https://herosapp-b788b.firebaseio.com/heroes';
  constructor(private http: HttpClient) { }

  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    let url=`${this.heroeURL}.json`;
    return this.http.post(url, body, {headers})
            .pipe(map((res: HeroeResponse) => {
              return res;
            }));
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    let url=`${this.heroeURL}/${key$}.json`;
    return this.http.put(url, body, {headers})
            .pipe(map((res: HeroeResponse) => {
              return res;
            }));
  }

  getHeroe(key$: string) {
    let url=`${this.heroeURL}/${key$}.json`;  
    return this.http.get(url)
            .pipe(map((res: Heroe) => {
              return res;
              console.log(res);
            }));
  }

  getHeroes() {
    let url=`${this.heroeURL}.json`;  
    return this.http.get(url)
            .pipe(map((res: Heroe) => {
              return res;
            }));
  }
}
