import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsFormService {

  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public emailExist( control: FormControl ): ValidationErrors | null {

    const email = control.value?.trim().toLowerCase();

    if(email === "michael@gmail.com") return { userExist: true };
    return null;
  }

  public passwordMatch( pass1: string, pass2: string ) {

    return ( formGroup: FormGroup ): ValidationErrors | null => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      // const prueba1 = formGroup.get(pass1)?.value;
      // const prueba2 = formGroup.get(pass2)?.value;

      if ( pass1Control.value !== pass2Control.value ) pass2Control.setErrors( { noEqueals: true } );

      return null;
    }
  }

  // public isValidfield( field: string, form: FormGroup ): boolean | null {
  //   return form.controls[field].errors && form.controls[field].touched;
  // }

  public isValidfield(field: string, form: FormGroup): boolean | null {
    const control = form.get(field);
    return control ? control.errors && control.touched : null;
  }

  public getFieldsErrors(field: string, form: FormGroup): string | null {
    const control = form.get(field);

    if (!control) return null;

    const errors = control.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'maxlength':
          return `Este campo debe tener menos de ${errors[key].requiredLength} caracteres`;
        case 'pattern':
          return 'El formato no es correcto';
        case 'userExist':
          return 'El usuario ya existe';
        case 'noEqueals':
          return 'Las contraseñas no coinciden';
        case 'noLogged':
          return 'Usuario o contraseña incorrectos';
        default:
          return null;
      }
    }

    return null;  // Si no hay errores, devolvemos null
  }
}
