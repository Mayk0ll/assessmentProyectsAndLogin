import { Component, inject, OnInit } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, TaskService } from '@services/index.ts';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, Task } from '../../../models';
import { TaskComponent } from '../../components/task/task.component';



@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [...getPrimeNGModules(), CommonModule, ReactiveFormsModule, TaskComponent],
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css', '../../../app.component.css']
})

export default class ViewprojectComponent implements OnInit {

  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private activateRouter = inject( ActivatedRoute );
  private router = inject( Router );
  private fb = inject( FormBuilder );

  public project: Project = new Project();
  public tasks: Task[] = [];
  public newTasks: Task[] = [];
  public projectId: number = 0;
  public selectedTaskIndex: number | null = null;

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


  public addTask(task: Task) {
    if ( task.id == 0 ){
      this.newTasks.push({...task, userId: this.projectId})
      this.tasks.push({...task as Task});
    } else {
      const taskTampIndex = this.newTasks.findIndex( t => t.id == task.id );
      if( taskTampIndex >= 0 ) this.newTasks[taskTampIndex] = {...task as Task}
      else this.newTasks.push({...task as Task});

      const taskIndex = this.tasks.findIndex( t => t.id == task.id );
      if( taskIndex >= 0 ) this.tasks[taskIndex] = {...task as Task}
    }
  }

  showComponentTask(event: boolean): void {
    this.selectedTaskIndex = null;
  }

  async saveProject() {
    if( !this.projectForm.valid ){ this.projectForm.markAllAsTouched() }
    this.project = {...this.project, ...this.projectForm.value as Project};
    const idProject = await this.projectService.createOrUpdateProject(this.project);
    console.log(this.newTasks);
    await this.taskService.createOrUpdateTask(this.newTasks, idProject);
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      this.projectId = Number(params['id']);
      if(this.projectId){
        this.projectService.getProjectById(this.projectId).subscribe((project: Project) => {
          if( !project ) this.router.navigate(['/projects/list'])
            this.project = project;
            this.projectForm.patchValue({...project});
            this.taskService.getAllTasksByProjectId(this.projectId).subscribe(tasks => {  this.tasks = tasks });
        });
      }
    });
  }

}
