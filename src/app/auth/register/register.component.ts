import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/index.ts';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../app.component.css']
})

export default class RegisterComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  public formRegister = this.fb.group({
    name: ['Michael'],
    email: ['michael@gmail.com'],
    password: ['54321']
  });

  redirectToLogin(){ this.router.navigate(['/login']) };

  register(){
    if( this.formRegister.valid ){
      this.formRegister.markAllAsTouched();
      console.log(this.formRegister.value);
    }

     this.userService.register( this.formRegister.value.name!, this.formRegister.value.email!, this.formRegister.value.password!) && this.router.navigate(['/projects/list']);
  }

}
