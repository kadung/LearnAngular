import { Component,  } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveComponent {
  constructor(private fb: FormBuilder) { }

  userForm = this.fb.group({
    firstName: ['default first name', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
    }),
    hobbies: this.fb.array([
      this.fb.control(''),
    ]),
    repos: this.fb.array([
      this.fb.group({
        repoName: [''],
        repoContributors: [''],
      })
    ])
  });

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  get repos() {
    return this.userForm.get('repos') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  addRepo() {
    this.repos.push(this.fb.group({
      repoName: [''],
      repoContributors: [''],
    }))
  }

  onSubmit() {
    console.log("Submit button", this.userForm);
  }

}
