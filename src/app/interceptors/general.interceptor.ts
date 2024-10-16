import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/index.ts';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, delay, EMPTY, finalize, tap } from 'rxjs';
import Swal from 'sweetalert2';

export const generalInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(NgxSpinnerService);
  const userService = inject(UserService);
  const router = inject(Router);

  spinner.show();
  return next(req).pipe(
    delay(500),
    tap(() => spinner.hide()),
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        userService.logout();
        showError("Sesión Expirada", "Su sesión ha caducado. Por favor, inicie sesión nuevamente para continuar.", "/login", router);
      } else if (error.status === 403) {
        showError("Acceso Denegado", "No tiene los permisos necesarios para realizar esta acción. Si considera que esto es un error, contacte con el administrador.",);
      } else if (error.status === 404) {
        showError("Recurso No Encontrado", "El recurso que está buscando no se ha encontrado. Por favor, verifique la URL o intente más tarde.", "/projects/list", router);
      } else if (error.status === 500) {
        showError("Error del Servidor", "Se ha producido un error interno en el servidor. Por favor, intente nuevamente más tarde.",);
      } else {
        showError("Error Desconocido", "Ha ocurrido un error inesperado. Por favor, intente nuevamente o contacte con soporte.",);
      }

      return EMPTY;
    }),
    finalize(() => spinner.hide())
  );
};

const showError = (title: string, text: string, redirect?: string, router?: Router) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'Ok',
    allowEscapeKey: false,
    allowOutsideClick: false
  }).then(() => {
    if (redirect && router) {
      router.navigateByUrl(redirect);
    }
  });
};
