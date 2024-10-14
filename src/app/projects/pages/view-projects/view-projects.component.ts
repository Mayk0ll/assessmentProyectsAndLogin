import { Component, inject, OnInit } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Task } from '@interfaces/index.ts';
import { ProjectService, TaskService } from '@services/index.ts';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [...getPrimeNGModules(), CommonModule],
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css', '../../../app.component.css']
})

export default class ViewprojectComponent implements OnInit {

  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private router = inject( ActivatedRoute );
  private routerLink = inject( Router );

  public project: Project = {} as Project;
  public tasks: Task[] = [];

  redirectToList(){ this.routerLink.navigate(['/projects/list']); }




  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const projectId = params['id'];

      this.projectService.getProjectById(projectId).subscribe((project: Project) => {
        this.project = project;
      });

      this.taskService.getAllTasksByprojectId(projectId).subscribe(tasks => {
        this.tasks = tasks;
      });



    });
  }

}
