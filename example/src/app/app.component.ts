import { Component, OnInit } from '@angular/core';
import { stream2Form } from 'ngx-stream2form';
import { interval } from 'rxjs/observable/interval';
import { timestamp, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  time: string;

  ngOnInit() {
    stream2Form.call(this, {
      propertyName: 'time',
      streamSelector: this.clockTime,
      generateForm: false
    });
  }

  get clockTime() {
    return interval(1000)
      .pipe(
        timestamp(),
        map(time => new Date(time.timestamp).toString()),
        startWith('Time is...')
      );
  }
}
