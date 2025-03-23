import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { TodoComponent } from './todo/todo.component';
import { RegisterComponent } from './login/register/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent}, 
  { path: 'todo', component: TodoComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'todo', pathMatch: 'full' }, // Redirect to dashboard if logged in
  { path: '**', redirectTo: 'todo' }, // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
