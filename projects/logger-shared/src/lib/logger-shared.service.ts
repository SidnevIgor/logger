import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { LoggerError } from './interfaces/loggerError';
import { Target } from './types/target.type';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  environment: any;
  target: Target;

  constructor(
    @Inject('environment') environment: any,
    @Inject('target') target: Target
  ) {
    this.environment = environment;
    this.target = target;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const timestamp = new Date(Date.now());
    let loggerError: LoggerError;

    if (this.environment.production) {
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse && this.isErrorEvent(event)) {
            loggerError = {
              message: event.body,
              stackTrace: '',
              timestamp,
            };
            this.logDetails(loggerError);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          loggerError = {
            message: err.message,
            stackTrace: err.error,
            timestamp,
          };
          this.logDetails(loggerError);
          return throwError(loggerError);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private logDetails(msg: LoggerError): void {
    if (this.target === 'Console') {
      console.log(msg);
    } else {
      localStorage.setItem('Error: ', JSON.stringify(msg));
    }
  }

  private isErrorEvent(event: HttpResponse<any>): boolean {
    return event.status < 200 || event.status > 299;
  }
}
