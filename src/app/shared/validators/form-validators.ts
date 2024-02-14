import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms'
import { UserService } from '../services/user-service/user.service';
import { map } from 'rxjs';

export function strValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        //Special charactors to be compared agaist
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let digitPattern = /\d/;
        //retrieve form control value
        const formControlValue: string = control.value;

         if (digitPattern.test(formControlValue)) {
            return { 'numeric': true, 'requiredValue': 'string only' }
        }

        if (format.test(formControlValue)) {
            return { 'specialCharacter': true, 'requiredValue': 'native string' }
        }

        return null;
    }
}

export function whitespaceStr(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        //retrieve form control value
        const formControlValue: string = control.value;
        if (formControlValue?.includes(' ')) {
            return { 'whiteSpace': true, 'requiredValue': 'white space' }
        }
        
        return null;
    }
}

export function passwordCMatchValidator(password: string, rePassword: string): ValidatorFn {
    
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const _password = formGroup.get(password);
        const _rePassword = formGroup.get(rePassword);

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

export function emailAsyncValidator(_userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl) => {

        return _userService.getUsers().pipe(map( _users => {
            const _user = _users.find((user: any) => user.emailAddress.toLowerCase() === control.value.toLowerCase());
            return _user ? { emailExist: true } : null;                
            }
        ))
    }
}

