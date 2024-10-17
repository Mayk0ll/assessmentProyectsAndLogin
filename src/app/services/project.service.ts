import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, of, tap } from 'rxjs';
import { Project } from '../models';


@Injectable({providedIn: 'root'})
export class ProjectService {

  private urlProjects = 'https://jsonplaceholder.typicode.com/users';
  private projectsTemp: Project[] = [];
  private http = inject( HttpClient );

  constructor() {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urlProjects).pipe(
      map(projectsFromApi => {
        const mergedProjects = projectsFromApi.map(projectFromApi => {
          const tempProject = this.projectsTemp.find(tempProject => tempProject.id === projectFromApi.id);
          return tempProject ? tempProject : projectFromApi;
        });

        this.projectsTemp.forEach(tempProject => {
          const existsInApi = projectsFromApi.some(apiProject => apiProject.id === tempProject.id);
          if (!existsInApi) mergedProjects.push(tempProject);
        });

        return mergedProjects;
      })
    );
  }

  getProjectsByApi(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urlProjects)
  }

  getProjectById(id: number): Observable<Project> {
    const proyectFount:Project|undefined = this.projectsTemp.find(project => project.id == id);
    if(proyectFount) return of(proyectFount);
    return this.http.get<Project>(`${this.urlProjects}/${id}`);
  }

  async createOrUpdateProject(projectArg: Project): Promise<number> {
    const project = structuredClone(projectArg);
    const projectTempIndex = this.projectsTemp.findIndex(p => p.id === project.id);
    if (projectTempIndex >= 0) this.projectsTemp[projectTempIndex] = project;
    else {
      const projects = await this.getProjectsByApi().toPromise();
      if (projects) {
        const projectFound = projects.find(p => p.id === project.id);
        if (projectFound) this.projectsTemp.push({ ...projectFound, ...project });
        else {
          const allProjects = [...projects, ...this.projectsTemp];
          project.id = allProjects.length ? Math.max(...allProjects.map(p => p.id!)) + 1 : 1;
          this.projectsTemp.push(project);
        }
      } else {
        project.id = this.projectsTemp.length ? Math.max(...this.projectsTemp.map(p => p.id!)) + 1 : 1;
        this.projectsTemp.push(project);
      }
    }
    return project.id;
  }
}


