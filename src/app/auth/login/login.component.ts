import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/index.ts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export default class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public formLogin = this.fb.group({
    email: ['prueba@prueba.com'],
    password: ['Pru3b4']
  });


  redirectToRegister(){ this.router.navigate(['/register']) };

  login(){
    if( this.formLogin.valid ){
      this.formLogin.markAllAsTouched();
      console.log(this.formLogin.value);
    }

    this.userService.login( this.formLogin.value.email!, this.formLogin.value.password! ) && this.router.navigate(['/projects/list']);
  }

}
