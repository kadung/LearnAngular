import {
    Component,
    Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'input-error',
    templateUrl: './input-error.component.html'
})
export class InputErrorComponent {
    @Input() formControlItem: FormControl;
}