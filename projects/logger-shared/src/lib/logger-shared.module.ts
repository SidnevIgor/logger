import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { LoggingInterceptor } from './logger-shared.service';
import { Target } from './types/target.type';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class LoggerSharedModule {
  public static forRoot(
    environment: any,
    target: Target
  ): ModuleWithProviders<any> {
    return {
      ngModule: LoggerSharedModule,
      providers: [
        { provide: 'environment', useValue: environment },
        { provide: 'target', useValue: target },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptor,
          multi: true,
        },
      ],
    };
  }
}
