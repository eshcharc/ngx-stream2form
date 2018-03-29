import { Component, OnInit, OnDestroy } from '@angular/core';
import { stream2Form } from 'ngx-stream2form';
import { interval } from 'rxjs/observable/interval';
import { timestamp, map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './simple-stream.component.html',
  styleUrls: ['./simple-stream.component.scss']
})
export class SimpleStreamComponent implements OnInit, OnDestroy {
  time: string;

  ngOnInit() {
    stream2Form.call(this, {
      propertyName: 'time',
      streamSelector: this.clockTime,
      generateForm: false
    });
  }

  ngOnDestroy() {}

  get clockTime() {
    return interval(1000)
      .pipe(
        timestamp(),
        map(time => new Date(time.timestamp).toString()),
        startWith('Time is...')
      );
  }

}
