import { Injectable } from '@angular/core';
import { Task } from './interfaces/task';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private apiUrl= 'https://localhost:7017/api/tasks';

  constructor(private http: HttpClient) {   }
 
  addTask(task:Task):Observable<Task>{ 
   return this.http.post<Task>(this.apiUrl, task).pipe(
     catchError(this.handleError)
    );
  }

  loadTask():Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)  }

  deleteTask(description: string):Observable<Task[]>{
    return this.http.delete<Task[]>(`${this.apiUrl}/${description}`).pipe(
      catchError(this.handleError)
    );
  } 

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Delete Task Error:', error);
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.status === 404) {
      errorMessage = 'Task not found. It may have already been deleted.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  
    return throwError(() => new Error(errorMessage)); // Throw an error with a message
  }


}
