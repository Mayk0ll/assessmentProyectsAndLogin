import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { getPrimeNGModules } from '../../../prime-ng/prime-ng.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '@services/index.ts';
import { ValidatorsFormService } from '../../../services/validators-form.service';
import { Task } from '../../../models';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [...getPrimeNGModules(), CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnChanges  {


  private taskService = inject(TaskService);
  private vfs = inject(ValidatorsFormService);
  private fb = inject(FormBuilder);

  @Input() task: Task = new Task();
  @Input() algo: string = '';
  @Output() showComponentTask: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateTask: EventEmitter<Task> = new EventEmitter<Task>();
  public copyTask: Task = structuredClone(this.task);
  public formTask = this.fb.group({
    title: ['', [Validators.required]],
    completed: [false]
  });

  closeTask(): void {
    this.task = structuredClone(this.copyTask);
    this.showComponentTask.emit(false);
  }

  isValidfield(field: string){
    return this.vfs.isValidfield( field, this.formTask );
  }

  getFieldsErrors(field: string){
    return this.vfs.getFieldsErrors( field, this.formTask );
  }

  saveTask(): void {
    if (!this.formTask.valid) { this.formTask.markAllAsTouched(); return; }

    this.updateTask.emit({ ...this.task, ...this.formTask.value as Task });
    this.showComponentTask.emit(false);
    this.formTask.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.formTask.patchValue({
        title: this.task.title,
        completed: this.task.completed
      });
    }
  }






}
