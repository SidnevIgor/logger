import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, switchMap } from 'rxjs';
import { LoggerError } from './interfaces/loggerError';
import { Target } from './types/target.type';

@Injectable()
export class LoggingErrorHandler implements ErrorHandler {
  environment: any;
  target: Target;
  flushtimer: number;
  private _logs$: BehaviorSubject<LoggerError[]> = new BehaviorSubject<
    LoggerError[]
  >([]);

  constructor(
    @Inject('environment') environment: any,
    @Inject('target') target: Target,
    @Inject('flushtimer') flushtimer: number
  ) {
    this.environment = environment;
    this.target = target;
    this.flushtimer = flushtimer;
  }

  handleError(error: any) {
    const timestamp = new Date(Date.now());
    let loggerError: LoggerError;

    if (this.environment.production) {
      if (error instanceof HttpErrorResponse) {
        //server side error
        loggerError = {
          message: error.status + '/ ' + error.name + '/ ' + error.message,
          stackTrace: '',
          timestamp,
        };
      } else {
        //client side error
        loggerError = {
          message: error.message,
          stackTrace: '',
          timestamp,
        };
      }
      this.logDetails(loggerError);
    }
  }

  getlogs$(): Observable<LoggerError[]> {
    return timer(0, this.flushtimer).pipe(switchMap(() => this._logs$));
  }

  setlogs(updatedLogs: LoggerError[]) {
    this._logs$.next(updatedLogs);
  }

  private getLogsVal(): LoggerError[] {
    return this._logs$.value;
  }

  private logDetails(msg: LoggerError): void {
    if (this.target === 'Console') {
      console.log('ErrorHandler error: ', msg);
    } else {
      localStorage.setItem('ErrorHandler error: ', JSON.stringify(msg));
    }
    const logsUpdate = this.getLogsVal();
    logsUpdate.push(msg);
    this.setlogs(logsUpdate);
  }
}
