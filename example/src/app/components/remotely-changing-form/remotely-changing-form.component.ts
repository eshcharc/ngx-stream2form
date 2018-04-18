import { Component, OnInit, OnDestroy } from '@angular/core';
import { stream2Form } from 'ngx-stream2form';
import { of } from 'rxjs/observable/of';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './remotely-changing-form.component.html',
  styleUrls: ['./remotely-changing-form.component.scss']
})
export class RemotelyChangingFormComponent implements OnInit, OnDestroy {
  userFormGroup: FormGroup;
  user = {
    id: 0,
    name: 'User Name',
    age: 1
  };

  users$: BehaviorSubject<any>;

  ngOnInit() {
    this.users$ = new BehaviorSubject(this.user);
    stream2Form.call(this, {
      propertyName: 'userFormGroup',
      streamSelector: this.users$,
      validators: {
        name: Validators.required,
        age: Validators.max(4)
      },
      formChanged: this.formChanged.bind(this)
    });

    setInterval(_ => {
      this.user.age += 1;
      this.users$.next(this.user);
    }, 2000);
  }

  formChanged(form: FormGroup, oldForm: FormGroup) {
    if (oldForm) {
      console.log(form.value, oldForm.value);
    }
    return form.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(_ => form.markAsPristine());
  }

  getChildrenArray(userFormGroup: FormGroup) {
    const childrenArray: FormArray = userFormGroup.get('children') as FormArray;
    if (childrenArray) {
      return childrenArray.controls;
    }
    return [];
  }

  ngOnDestroy() { }

}
