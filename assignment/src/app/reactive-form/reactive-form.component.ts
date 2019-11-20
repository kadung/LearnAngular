import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../validators/custom.validator'
import { AsyncValidators } from '../validators/async.validator';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private signupServices: SignupService,
  ) { }


  // Component variables
  userForm: FormGroup;
  statusChangeSub: Subscription;
  valueChangeSub: Subscription;


  ngOnInit (){
    // Define form structure
    this.userForm = this.fb.group({
      userName: ['default name', Validators.required],
      email: ['', , AsyncValidators.validateEmailNotTaken(this.signupServices)],
      address: this.fb.group({
        street: [''],
        city: ['', Validators.required],
        state: [''],
      }),
      hobbies: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
      repos: this.fb.array([
        this.fb.group({
          repoName: [''],
          repoContributors: [''],
        })
      ])
    });

    // Reacting actions to form's status change
    this.statusChangeSub = this.userForm.statusChanges.subscribe(
      (status) => {
        console.log("New form's status is", status)
      }
    );

    // Reacting actions to form's values change
    this.valueChangeSub = this.userForm.valueChanges.subscribe(
      (values) => {
        console.log("New form's values is", values)
      }
    )
  }

  ngOnDestroy(){
    this.statusChangeSub.unsubscribe();
    this.valueChangeSub.unsubscribe();
  }


  // Getter method to get value from form array
  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  get repos() {
    return this.userForm.get('repos') as FormArray;
  }


  // Add new element to form array
  addHobby() {
    this.hobbies.push(
      this.fb.control(
        '',
        [
          Validators.required,
          CustomValidators.duplicateValidator(this.hobbies)
        ]
      )
    );
  }

  // Remove element in form array
  removeHobby(){
    this.hobbies.removeAt(this.hobbies.length - 1);
  }

  addRepo() {
    this.repos.push(
      this.fb.group({
        repoName: [''],
        repoContributors: [''],
      })
    )
  }


  // Submit action
  onSubmit() {
    this.userForm.markAllAsTouched();
    console.log("Submit button", this.userForm);
  }


  // Custom validator
  duplicateValidator(control: FormControl){
    if (this.hobbies.value.indexOf(control.value) !== -1){
      return {
        "duplicateName": true,
      }
    }
    return null;
  }


  // Async validator




  // Mark control to invalid
  onError() {
    this.userForm.controls.lastName.setErrors({ 'duplicateName': true });
    this.userForm.controls.lastName.markAsTouched();
  }

  //  Set whole form values
  onSetValue(){
    this.userForm.setValue(
      {
        userName: 'Testing',
        email: 'email@test.com',
        address: {
          street: '123',
          city: 'HCM',
          state: 'VN'
        },
        hobbies: ['hobby 1'],
        repos:[
          {
            repoName: 'Test',
            repoContributors: 'Anyone',
          }
        ]
      }
    );
  }

  // Overwrite any part of form values
  onPatchValue(){
    this.userForm.patchValue(
      {
        email: 'email@test.com',
      }
    );
  }
}
