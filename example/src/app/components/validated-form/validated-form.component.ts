import { Component, OnInit, OnDestroy } from '@angular/core';
import { stream2Form } from 'ngx-stream2form';
import { of } from 'rxjs/observable/of';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: './validated-form.component.html',
  styleUrls: ['./validated-form.component.scss']
})
export class ValidatedFormComponent implements OnInit, OnDestroy {
  userFormGroup: FormGroup;
  users = [
    {
      name: 'Parent 1',
      age: 55,
      leftHanded: true,
      children: [
        {
          name: 'Child 1',
          age: 12,
          leftHanded: false
        },
        {
          name: 'Child 2',
          age: 8,
          leftHanded: false
        },
        {
          name: 'Child 3',
          age: 6,
          leftHanded: true
        }
      ]
    },
    {
      name: 'Parent 2',
      age: 37,
      leftHanded: false
    },
    {
      name: 'Parent 3',
      age: 32,
      leftHanded: false,
      children: [
        {
          name: 'Child 1',
          age: 4,
          leftHanded: false
        }
      ]
    }
  ];

  users$: BehaviorSubject<any>;

  ngOnInit() {
    this.users$ = new BehaviorSubject(this.users[0]);
    stream2Form.call(this, {
      propertyName: 'userFormGroup',
      streamSelector: this.users$,
      validators: {
        name: Validators.required,
        children: {
          name: Validators.required,
          age: [Validators.min(4), Validators.max(10)]
        }
      }
    });
  }

  getChildrenArray(userFormGroup: FormGroup) {
    const childrenArray: FormArray =  userFormGroup.get('children') as FormArray;
    if (childrenArray) {
      return childrenArray.controls;
    }
    return [];
  }

  selectUser(userName: string) {
    const user = this.users.find(u => u.name === userName);
    this.users$.next(user);
  }

  ngOnDestroy() {}

}
