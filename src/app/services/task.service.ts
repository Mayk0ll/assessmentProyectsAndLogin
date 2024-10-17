import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlTask = 'https://jsonplaceholder.typicode.com/todos';
  private tasksTemp: Task[] = [];
  private tasksDeleted: number[] = [];
  private http = inject( HttpClient );

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.urlTask).pipe(
      map(tasksFromApi => {
        const mergedTasks = tasksFromApi.map(taskFromApi => {
          const tempTask = this.tasksTemp.find(tempTask => tempTask.id === taskFromApi.id);
          return tempTask ? tempTask : taskFromApi;
        });

        this.tasksTemp.forEach(tempTask => {
          const existsInApi = tasksFromApi.some(apiTask => apiTask.id === tempTask.id);
          if (!existsInApi) mergedTasks.push(tempTask);
        });


        return mergedTasks;
      })
    );
  }

  getAllTasksByProjectId(idProject: number): Observable<Task[]> {
    return this.getAllTasks().pipe(
        map(tasks => tasks.filter(task => task.userId === idProject))
    );
  }

  async createOrUpdateTask(tasks: Task[], projectId: number): Promise<void> {
    const tasksTempClone = structuredClone(tasks);
    const tasksFromApi = await this.getAllTasks().toPromise();

    tasks.forEach(task => {
      const taskTempIndex = this.tasksTemp.findIndex(t => t.id === task.id);
      if( taskTempIndex >= 0 ) this.tasksTemp[taskTempIndex] = task;
      else {
        if( tasksFromApi ) {
          const taskFound = tasksFromApi.find(t => t.id === task.id);
          if( taskFound ) this.tasksTemp.push({...taskFound, ...task});
          else {
            const allTasks = [...tasksFromApi, ...this.tasksTemp];
            task.id = allTasks.length ? Math.max(...allTasks.map(t => t.id!)) + 1 : 1;
            this.tasksTemp.push({...task, userId: projectId});
          }
        } else {
          task.id = this.tasksTemp.length ? Math.max(...this.tasksTemp.map(t => t.id!)) + 1 : 1;
          this.tasksTemp.push({...task, userId: projectId});
        }
      }
    });
    console.log(this.tasksTemp);
  }


}
