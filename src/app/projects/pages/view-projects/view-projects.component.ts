import { Component, inject, OnInit } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Task } from '@interfaces/index.ts';
import { ProjectService, TaskService } from '@services/index.ts';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [...getPrimeNGModules(), CommonModule, ReactiveFormsModule],
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css', '../../../app.component.css']
})

export default class ViewprojectComponent implements OnInit {

  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private activateRouter = inject( ActivatedRoute );
  private router = inject( Router );
  private fb = inject( FormBuilder );

  public project: Project|null = {} as Project;
  public tasks: Task[] = [];
  public newTasks: Task[] = [];

  public taskForm = this.fb.group({ title: ['', Validators.required], completed: [false] });
  public projectForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    website: [''],
    address: this.fb.group({
      street: [''],
      suite: [''],
      city: ['', Validators.required],
      zipcode: [''],
      geo: this.fb.group({
        lat: [''],
        lng: ['']
      })
    }),
    company: this.fb.group({
      name: ['', Validators.required],
      catchPhrase: [''],
      bs: ['']
    })
  });



  public addTask() {

  }

 

  saveProject() {
    if( this.projectForm.valid ){
      this.projectForm.markAllAsTouched();
    }



    this.project = this.projectForm.value as Project;
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      const projectId = Number(params['id']);

      if(projectId){
        this.projectService.getProjectById(projectId).subscribe(project => {
          if( !project ) this.router.navigate(['/projects/list'])
          this.project = project;
          this.projectForm.patchValue(project);

          this.projectForm.patchValue(this.project);
          this.taskService.getAllTasksByprojectId(projectId).subscribe(tasks => { this.tasks = tasks });
        });
      }
    });
  }

}
