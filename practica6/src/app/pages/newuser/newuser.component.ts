import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
})
export class NewuserComponent {
  userForm: FormGroup;
  useserService = inject(UsersService);
  //Router, redireccion de ruta
  router = inject(Router);

  //valor o variale de la rutta, usar ruter o ActiveRoute
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      let id: number = Number(params.id);
      
      //llamar servicio funcion getById (id)
      let user = this.useserService.getById(id);
      
      this.userForm= new FormGroup(
        {
          first_name: new FormControl(user?.first_name, [Validators.required]),
          last_name: new FormControl(user?.last_name, []),
          username: new FormControl(user?.username, []),
          password: new FormControl(user?.password, []),
          email: new FormControl(user?.email, []),
          image: new FormControl(user?.image, []),
        },
        []
      );
      
    });
  }

  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', []),
        username: new FormControl('', []),
        password: new FormControl('', []),
        email: new FormControl('', []),
        image: new FormControl('', []),
      },
      []
    );
  }


  getDataForm(): void {
    let response = this.useserService.insert(this.userForm.value);
    if (response === 'ok') {
      this.router.navigate(['/user']);
    } else {
      alert('Usario no se ha podido registrar');
    }
    this.userForm.reset();
  }
}
