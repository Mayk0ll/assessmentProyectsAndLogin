import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/index.ts';
import { ValidatorsFormService } from '../../services/validators-form.service';
import { CommonModule } from '@angular/common';
import { getPrimeNGModules } from '../../prime-ng/prime-ng.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...getPrimeNGModules(), ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export default class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private vfs = inject(ValidatorsFormService);

  public formLogin = this.fb.group({
    email: ['prueba@prueba.com', [Validators.required, Validators.pattern(this.vfs.emailPattern), this.vfs.emailExist]],
    password: ['Pru3b4', [Validators.required]]
  });

  isValidfield(field: string){
    return this.vfs.isValidfield( field, this.formLogin );
  }

  getFieldsErrors(field: string){
    return this.vfs.getFieldsErrors( field, this.formLogin );
  }

  redirectToRegister(){
    this.router.navigate(['/register'])
  };

  login(){
    const logged = this.userService.login( this.formLogin.get('email')?.value!, this.formLogin.get('password')?.value! );
    if( !logged ) {
      this.formLogin.controls['password'].setErrors({ noLogged: true });
      return this.formLogin.markAllAsTouched();
    }

    this.router.navigate(['/projects/list']);
    this.formLogin.reset();
  }

}
