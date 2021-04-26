import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(

    private storage: SessionStorageService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = `Bearer ${this.storage.obtenerToken()}`
    if(!Boolean(token)){
      return next.handle(req) 

    }
    req = req.clone({
      headers:req.headers
      
      .set("Authorization",token||"")



    })

    return next.handle(req).pipe(
   
      tap(()=>{}, err =>{
        if (err instanceof HttpErrorResponse) {
          if (err.status!= 401 ) {
            return
          }

          this.router.navigate(["/login"])
          
        }
      })
    ) 
}
}
