import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskServiceService } from '../task.service.service';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  tasks: Task[] =[];
  taskDescription: string='';
  entry: boolean= false;
  errorMessage: string='';
  
  constructor(private taskService: TaskServiceService, private authService: AuthServiceService
    ) {

  }

ngOnInit(): void {
  this.loadTask();
}


loadTask():void{
  this.taskService.loadTask().pipe(
    catchError((error) => {
      this.errorMessage = error;
      return [];
    })
  ).subscribe((tasks: Task[]) => this.tasks = tasks);
}


onAdd(): void {
if(!this.taskDescription){
  this.errorMessage = 'Please enter a task description';  
return;
}
const newTask:Task = {description: this.taskDescription.trim()};
this.taskService.addTask(newTask).pipe(
  catchError((error) => {
    this.errorMessage = error.message;
    return [];
  })
).subscribe(
  task =>{
  this.tasks.push(task);
  this.taskDescription = '';
  this.entry= true;
  this.errorMessage = 'Task added successfully';
})
}

async onClick(): Promise<void> {
  try {
    if (!this.taskDescription) {
       this.errorMessage = 'Please enter a task description';
       return;
    }
    const tasks = await lastValueFrom(this.taskService.deleteTask(this.taskDescription));
    this.tasks = tasks; // Update the UI with new task list
    this.errorMessage = 'Task deleted successfully';
    await this.loadTask(); // Ensure updated task list is loaded
  } catch (error: any) {
    console.error('Error deleting task:', error);
    this.errorMessage = error.message || 'Failed to delete the task';
  }

  


// onClick(): void{

//   this.taskService.deleteTask(this.taskDescription).pipe(
//     catchError((error) => {
//       this.errorMessage = error.message;
//       return [];
//     })
//   ).subscribe({
//     next: (tasks: Task[]) =>{
//       this.tasks = tasks}
// });
// this.loadTask();
// this.errorMessage = 'Deleted';
}

Logout(): void {
  this.authService.logout();
}
}
