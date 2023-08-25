import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {
userForm: FormGroup;
constructor(){
  this.userForm = new FormGroup({
    first_name: new FormControl("", [
      Validators.required
    ]),
    last_name: new FormControl("", []),
    username: new FormControl("", []),
    password: new FormControl("", []),
    email: new FormControl("", []),
    image: new FormControl("", []),
  }, []);
  
}
getDataForm():void{

}
}
