import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
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

  // async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
