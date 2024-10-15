import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, delay, EMPTY, finalize, tap } from 'rxjs';
import Swal from 'sweetalert2';

export const generalInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject( NgxSpinnerService );

  spinner.show();
  return next(req).pipe(
    // delay(3000),
    tap(() => spinner.hide()),
    catchError((error: HttpErrorResponse) => {


      Swal.fire({
        title: 'Error!',
        text: 'ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'Ok',
        allowEscapeKey: false,
        allowOutsideClick: false
      })

      return EMPTY;
    }),
    finalize(() => spinner.hide())
  );
};
