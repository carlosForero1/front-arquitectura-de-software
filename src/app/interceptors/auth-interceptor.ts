import {
  HttpInterceptorFn
}
from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn =
(req, next) => {

  if(
    req.url.includes(
      '/autenticacion/login'
    )
  ){

    return next(req);

  }

  const token =

    typeof window !== 'undefined'

      ? localStorage.getItem(
          'token'
        )

      : null;

  if(token){

    req =
      req.clone({

        setHeaders: {

          Authorization:
            `Bearer ${token}`

        }

      });

  }

  return next(req);

};