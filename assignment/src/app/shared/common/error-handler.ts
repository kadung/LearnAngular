import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHandler {
    static httpErrorHandler(error: HttpErrorResponse) {
        switch (error.status) {
            // Code for sending error analytic server
            // Respone FE error message
            case 401:
                return 'You do not have permission to access this resource.';
            default:
                return 'Something bad happened; please try again later.';
        }
    }
}