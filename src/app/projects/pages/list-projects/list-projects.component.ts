import { Component, inject, OnInit } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { ProjectService } from '@services/index.ts';
import { Project } from '../../../models';


@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [...getPrimeNGModules()],
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css', '../../../app.component.css']
})

export default class ListprojectsComponent implements OnInit {

  public projectService = inject( ProjectService );
  public projects: Project[] = [];


  ngOnInit() {
    this.projectService.getAllProjects().subscribe( (projects: Project[]) => {
      this.projects = projects;
    });
  }

}
