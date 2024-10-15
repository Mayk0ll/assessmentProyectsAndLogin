import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '@interfaces/index.ts';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlTask = 'https://jsonplaceholder.typicode.com/todoss';
  private tasksTemp: Task[] = [];
  private http = inject( HttpClient );

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.urlTask).pipe(
      map(tasks => [...tasks, ...this.tasksTemp])
    );
  }

  getAllTasksByprojectId(idproject: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.urlTask).pipe(
      map((tasks: Task[]) => [...tasks, ...this.tasksTemp]),
      map((combinedTasks: Task[]) => combinedTasks.filter(task => task.userId == idproject))
    );
  }


}
