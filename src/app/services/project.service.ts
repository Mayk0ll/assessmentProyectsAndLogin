import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { Project } from '@interfaces/index.ts';


@Injectable({providedIn: 'root'})
export class ProjectService {

  private http = inject( HttpClient );

  private urlProjects = 'https://jsonplaceholder.typicode.com/users';
  private projectsTemp: Project[] = [];

  constructor() {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urlProjects).pipe(
      map(projects => [...projects, ...this.projectsTemp])
    );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.urlProjects}/${id}`);
  }

}


