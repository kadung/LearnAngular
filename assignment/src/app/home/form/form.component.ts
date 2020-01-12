import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  default_val = "Test";
  heroes = ['DK', 'VN'];
  @ViewChild('heroForm') hero_form: NgForm;

  onSubmit() {
    this.heroes.push(this.hero_form.form.value.name)
  }

}
