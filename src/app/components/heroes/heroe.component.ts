import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  nuevo: boolean = false;
  id: string;

  heroe: Heroe = {
    nombre: '',
    casa: 'Marvel',
    bio: ''
  }

  constructor(private _heroeService: HeroesService, private router: Router,
                          private route: ActivatedRoute
                        ) { 
                          this.route.params.subscribe(
                            parametros => {
                              this.id = parametros.id;
                              if (this.id === 'nuevo') {
                                // Inserting
                                this.nuevo = true;
                              } else {
                                // Updating
                                this.nuevo = false;
                                this._heroeService.getHeroe(this.id)
                                  .subscribe(heroe => {
                                    this.heroe = heroe;
                                  });
                              }
                            }
                          );
                        }

  ngOnInit() {
  }

  guardar() {
    if (this.nuevo === true) {
      // Inserting
      this._heroeService.nuevoHeroe(this.heroe)
      .subscribe(data => {
        this.router.navigate(['/heroe', data.name]);
        // console.log(data.name);
      }, error => {
            console.log(error);
          });
      this.nuevo = true;
    } else {
      // Updating
      this._heroeService.actualizarHeroe(this.heroe, this.id)
      .subscribe(data => {
        //console.log(data);
      }, error => {
            console.log(error);
          });
    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }
}
