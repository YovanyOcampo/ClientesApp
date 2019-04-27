import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  
  heroes: any;
  loading: boolean = true;
  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes()
      .subscribe(data => {
        // console.log(this.heroes);
          this.loading = false; 
          this.heroes = data;
      });
  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this._heroesService.deleteHeroe(key$)
      .subscribe(response => {
        console.log(this.heroes);
        if (response) {
          console.log(response);
        } else {
          // Sucseful delete
          delete this.heroes[key$];
        }
      });
  }
}
