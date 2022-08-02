import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggingErrorHandler } from 'logger-shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  logsSub: Subscription;

  constructor(
    private http: HttpClient,
    private errorHandler: LoggingErrorHandler
  ) {}

  ngOnInit(): void {
    const url = 'https://jsonplaceholder.typicode.com/postss';
    this.http.get(url).subscribe((data) => {
      console.log(data);
    });
  }

  onEmitClientError() {
    throw new Error('Client side error emit');
  }
}
