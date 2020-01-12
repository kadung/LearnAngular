import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    constructor(
        private router: Router,
    ) { }
    title = 'assignment';

    goHomepage() {
        this.router.navigate(['/home']);
    }

    logout() {
        this.router.navigate(['/auth']);
    }
}
