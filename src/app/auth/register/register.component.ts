import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/index.ts';
import { getPrimeNGModules } from '../../prime-ng/prime-ng.component';
import { ValidatorsFormService } from '../../services/validators-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [...getPrimeNGModules(), ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../app.component.css']
})

export default class RegisterComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private vfs = inject(ValidatorsFormService);

  public formRegister = this.fb.group({
    name: ['', [Validators.required]],
    email: ['michael@gmail.com', [Validators.required, Validators.pattern(this.vfs.emailPattern), this.vfs.emailExist] ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, { validators: [ this.vfs.passwordMatch('password','password2') ] });

  isValidfield(field: string){
    return this.vfs.isValidfield( field, this.formRegister );
  }

  getFieldsErrors(field: string){
    return this.vfs.getFieldsErrors( field, this.formRegister );
  }

  redirectToLogin(){
    this.router.navigate(['/login'])
  };

  register(){
    if( !this.formRegister.valid ) return this.formRegister.markAllAsTouched();
    
    this.userService.register( this.formRegister.value.name!, this.formRegister.value.email!, this.formRegister.value.password!) && this.router.navigate(['/projects/list']);
  }

  ngOnInit(): void {
    this.formRegister.controls['email'].markAsTouched();
  }
}
