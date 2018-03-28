import { FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

export type FormEntity = FormGroup | FormArray | FormControl;
export type Primitive = string | number | boolean;
export type Entity = Primitive | Object | Object[] | Primitive[];

function primitiveToFormControl(value: Primitive, oldFormControl: FormControl, validators: ValidatorFn[] | ValidatorFn) {
    // TODO: find a way to keep the old control while not unsubscribing it on change in unsubscribeAll.
    // if (oldFormControl && (value === oldFormControl.value)) {
    //     return oldFormControl;
    // }
    return new FormControl(value, validators);
}

function objectToFormGroup(object: Object, oldForm: FormGroup, validators: {}): FormGroup {
    return new FormGroup(
        Object.keys(object).reduce((group: {[key: string]: FormEntity}, prop: string) => {
            group[prop] = entityToFormEntity(object[prop], oldForm && oldForm.get(prop) as FormEntity, validators && validators[prop]);
            return group;
        }, {})
    );
}

export function entityToFormEntity(entity: Entity, oldForm: FormEntity, validators: {} | ValidatorFn[] | ValidatorFn): FormEntity {
    if (entity && typeof entity === 'object') {
        if (entity.hasOwnProperty('length')) {
            return new FormArray((entity as any[]).map((item, index) => entityToFormEntity(
                item,
                oldForm && oldForm[index],
                (typeof item !== 'object') &&
                    (typeof validators === 'object') &&
                    !Array.isArray(validators) ? validators[index] : validators
            )));
        } else {
            return objectToFormGroup(entity, oldForm as FormGroup, validators);
        }
    } else {
        return primitiveToFormControl(entity as Primitive, oldForm as FormControl, validators as (ValidatorFn[] | ValidatorFn));
    }
}

function isFunction(functionToCheck: any) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
