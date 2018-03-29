import { Component, OnInit, OnDestroy } from '@angular/core';
import { stream2Form } from 'ngx-stream2form';
import { of } from 'rxjs/observable/of';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit, OnDestroy {
  userFormGroup: FormGroup;
  users = [
    {
      name: 'Tom',
      age: 55,
      leftHanded: true
    },
    {
      name: 'Chen',
      age: 37,
      leftHanded: false
    },
    {
      name: 'Shai',
      age: 32,
      leftHanded: false
    },
    {
      name: 'Ziv',
      age: 30,
      leftHanded: true
    },
    {
      name: 'Ben',
      age: 24,
      leftHanded: false
    },
  ];

  users$: BehaviorSubject<any>;

  ngOnInit() {
    this.users$ = new BehaviorSubject(this.users[0]);
    stream2Form.call(this, {
      propertyName: 'userFormGroup',
      streamSelector: this.users$
    });
  }

  selectUser(userName: string) {
    const user = this.users.find(u => u.name === userName);
    this.users$.next(user);
  }

  ngOnDestroy() {}

}
