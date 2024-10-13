import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyect } from '@interfaces/proyect.interface';

import { map, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProyectService {

  private http = inject( HttpClient );

  private urlProyects = 'https://jsonplaceholder.typicode.com/users';
  private proyectsTemp: Proyect[] = [];

  constructor() {}

  getAllProyects(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(this.urlProyects).pipe(
      map(proyects => [...proyects, ...this.proyectsTemp])
    );
  }

}


