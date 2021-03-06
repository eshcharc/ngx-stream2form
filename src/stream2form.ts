import { Observable } from 'rxjs/Observable';
import { entityToFormEntity, Entity } from './model2form';

let subscriptions = {};

function unsubscribeKey(keySubscriptions) {
    if (keySubscriptions) {
        keySubscriptions.forEach(subscription => {
            subscription = Array.isArray(subscription) ? subscription : [subscription];
            subscription.forEach(subs => subs.unsubscribe());
        });
    }
}

function unsubscribeAll() {
    Object.keys(subscriptions).forEach(subsKey => {
        const keySubscriptions = subscriptions[subsKey];
        if (keySubscriptions) {
            unsubscribeKey(keySubscriptions);
        }
    });
    subscriptions = [];
}

function setOnDestroy(component) {
    if (component.ngOnDestroy) {
        if (!component.onDestroySet) {
            component.onDestroySet = true;
            const ngOnDestroy = component.ngOnDestroy;
            const ngOnDestroyDescriptor = Object.getOwnPropertyDescriptor(component, 'ngOnDestroy');
            Object.defineProperty(component, 'ngOnDestroy', {
                get: function() {
                    component.onDestroySet = false;
                    unsubscribeAll();
                    Object.defineProperty(component, 'ngOnDestroy', {
                        get: function() {
                            return ngOnDestroy;
                        }
                    });
                    return ngOnDestroy;
                }
            });
        }
    } else {
        throw new Error(`Missing ${component.constructor.name} ngOnDestroy declaration.`)
    }
    
}

export function stream2Form(config: {
    propertyName: string,
    streamSelector: Observable<any>,
    generateForm?: boolean,
    validators?: Function | Entity,
    formChanged?: Function
}) {
    config.generateForm = typeof config.generateForm === 'undefined' ? true : config.generateForm;
    const propertyName = config.propertyName;
    unsubscribeKey(subscriptions[propertyName]);
    subscriptions[propertyName] = [];
    const subscription = config.streamSelector.subscribe(value => {
        if (config.generateForm) {
            const oldProperty = this[propertyName];
            this[propertyName]  = entityToFormEntity(value, this[propertyName], config.validators);
            if (config.formChanged) {
                const formChangedSubs = config.formChanged.call(this, this[propertyName], oldProperty);
                if (Array.isArray(formChangedSubs) && formChangedSubs.length) {
                    subscriptions[propertyName].push(formChangedSubs);
                }
            }
        } else {
            this[propertyName] = value;
        }
    });
    subscriptions[propertyName].push(subscription);
    setOnDestroy(this);
}
