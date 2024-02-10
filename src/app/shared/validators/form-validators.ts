import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

export function strValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        //Special charactors to be compared agaist
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        //retrieve form control value
        const formControlValue: string = control.value;

        if (formControlValue?.length == 0) {
            return { 'empty': true, 'requiredValue': 10 }
        }

        if (formControlValue?.includes(' ')) {
            return { 'whiteSpace': true, 'requiredValue': 'white space' }
        }

        if (format.test(formControlValue)) {
            return { 'specialCharacter': true, 'requiredValue': 'native string' }
        }

        return null;

    }
}

export function passwordCMatchValidator(password: string, rePassword: string): ValidatorFn {
    
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const _password = formGroup.get(password);
        const _rePassword = formGroup.get(rePassword);

        console.log("-- Chech values")
        console.log(_password)

        if (!_password?.value || !_rePassword?.value) {
        return null;
        }

        if (_password?.value != _rePassword?.value) {
           _rePassword.setErrors({ passwordMismatch: true });
        } else {
            _rePassword.setErrors(null);
        }

        return null;
    };
}