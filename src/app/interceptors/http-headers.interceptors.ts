import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


// every interceptor has a interecpt method...
// implements HttpInterceptor interface
// we set the params here
@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}


    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': '0560d9cd98mshf981a7810be2ca1p175ef8jsnbca4eb29d097'
              },
              setParams: {
                key: '3443851cb08d407b95effbc3423b5d5d',
              }
        });
        return next.handle(req);
    }
}