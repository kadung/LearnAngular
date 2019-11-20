import { AbstractControl } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { map } from 'rxjs/operators';

export class AsyncValidators {
    static validateEmailNotTaken(signupService: SignupService) {
        return (control: AbstractControl) => {
            return signupService.getEmails().pipe(
                map((emails: string[]) => {
                    if (emails.indexOf(control.value) !== -1){
                        return { "usedEmail": true }
                    }
                    return null;
                }),

            )
        };
    }
}