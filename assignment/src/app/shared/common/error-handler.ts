import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandlers {
    static httpErrorHandler(error: HttpErrorResponse) {
        switch (error.status) {
            // Code for sending error analytic server
            // Respone FE error message
            case 401:
                return 'You do not have permission to access this resource.';
            default:
                return 'Something is wrong, please try again later.';
        }
    }

    static firebaseErrorHanler(error: HttpErrorResponse) {
        if (!error) return;

        let errorMessage = "Unknown error";
        switch (error.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "This email is used, please try with another email!";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "Email or password is incorrect, please check again!";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "Email or password is incorrect, please check again!";
                break;
            case "USER_DISABLED":
                errorMessage = "User is deactivated!";
                break;
        }

        return throwError(errorMessage);
    }
}