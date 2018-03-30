# ngx-stream2form

Set a property of an object with an Angular form based on the structore of the event's payload of an RxJS stream

## Demo
[https://stackblitz.com/github/eshcharc/ngx-stream2form](https://stackblitz.com/github/eshcharc/ngx-stream2form/tree/master/example)

## Installing

`npm install --save ngx-stream2form`

## Usage

Assuming `this.people$` is a stream of people, represented by the model

```
interface Person {
  name: string;
  height: number;
  hobbies: string[];
}
```

and `personFormGroup` is set to be a component property.  

Inside `ngOnInit` we call:

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$
});
```

* Notice that the static function has to be invoked within the context of the component.

### Validators

You can pass validator/s as-is (for primitives) or an object, reflecting the structure of your model.

#### Primitives: 

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: Validators.required
});  
```
```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: [Validators.min(0), Validators.max(9)]
});
```

#### Object:

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: {
    name: Validators.required,
    height: [Validators.min(0), Validators.max(9)]]
  }
});
```

* Notice that the ```hobbies``` property is missing, and thus will be omitted from validation, but kept as form control.

##### Array property

Array property can be passed a simple validator/s to validate every item in the list, or an object with index key/s to validate a single or specific items.

Validating the whole array with a validation set: 

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: {
    hobbies: [Validators.min(0), Validators.max(9)]
  }
}); 
```

Validating specific items:

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: {
    "0": [Validators.min(0), Validators.max(9)],
    "3": Validators.required
  }
}); 
```

#### Selector Function:

Validators can be passed via a selector function. The selector is given the current model as a parameter, and the returned value determines the validator/s for the form (returned as a primitive, array or an object).

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  validators: (person: Person) => ({
    height: (person.height > 193) ? Validators.required : undefined
  })
});
```
### Tranform to raw model
By setting the flag `generateForm` to false, the component's property is overriden with the raw model instead of the form.

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  generateForm: false
});
```

### Subscribe to form events
It is possible to hide form subscriptions such as `valueChanges` and `statusChanges` and perform any other operation on the form after being generated with the `formChanged` hook

```
stream2Form.call(this, {
  propertyName: 'personFormGroup',
  streamSelector: this.people$,
  formChanged: (form) => {
    return [
      form.valueChanges.subscribe(...),
      form.statusChanges.subscribe(...)
    ];
  }
});
```

* It is important to return an array of subscriptions to be managed by the tool, otherwise, bad things will happen (such as memory leaks).

## Planned features
* Include model properties: Only transform properties that are mentioned in the include entity into form entities. Keep other properties as object properties.
* Exclude model properties: Omit transforming properties that are mentioned in the exclude entity into form entities. Keep transforming other properties into form entities.
* Set the depth level the form will be generated to.
* Replace form control only if value changes, otherwise, leave the former.

## Article
[Angular reactive form generation out of streams](https://medium.com/@eshcharc/angular-reactive-form-generation-out-of-streams-b7bd460cb42e)

## Running the tests

No tests available at the moment. Working to get it done.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/eshcharc/ngx-stream2form/releases). 

## Authors

* **Chen Eshchar** - [Chen Eshchar](https://github.com/eshcharc)

## License

This project is licensed under the MIT License.




