import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  myForm: FormGroup;
  notAllowedNames = ['fuck', 'dick'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,
          [Validators.required,
            this.onNotAllowedNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([ ])
    });
  }

  onSubmit() {
    console.log(this.myForm);
  }

  onAddHobby() {
    const myControl = new FormControl(null, Validators.required);
    (<FormArray>this.myForm.get('hobbies')).push(myControl);
  }

  // Custom form-control validator
  onNotAllowedNames(control: FormControl): {[key: string]: boolean} {
    if (this.notAllowedNames.indexOf(control.value) !== -1) {
      return {'nameIsForibdden': true};
    }
    return null;
  }
}
