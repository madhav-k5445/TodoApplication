import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}  // ✅ Use Injector instead of direct service injection

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthServiceService);  // ✅ Lazy load service
    const token = authService.getToken();

    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(clonedReq);
  }
}
