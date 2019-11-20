import {
    FormArray,
    AbstractControl
} from '@angular/forms';

export class CustomValidators {
    static duplicateValidator(formArray: FormArray) {
        return (control: AbstractControl) => {
            if (formArray.value.indexOf(control.value) !== -1){
                return {
                    "duplicateName": true,
                }
            }
            return null;
        }
    }
}