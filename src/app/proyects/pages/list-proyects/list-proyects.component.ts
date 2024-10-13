import { Component, inject, OnInit } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { ProyectService } from '@services/proyect.service';
import { Proyect } from '@interfaces/proyect.interface';

@Component({
  selector: 'app-list-proyects',
  standalone: true,
  imports: [...getPrimeNGModules()],
  templateUrl: './list-proyects.component.html',
  styleUrls: ['./list-proyects.component.css', '../../../app.component.css']
})

export default class ListProyectsComponent implements OnInit {

  public proyectService = inject( ProyectService );
  public proyects: Proyect[] = [];


  ngOnInit() {
    this.proyectService.getAllProyects().subscribe( (proyects: Proyect[]) => {
      this.proyects = proyects;
    });

  }

}
