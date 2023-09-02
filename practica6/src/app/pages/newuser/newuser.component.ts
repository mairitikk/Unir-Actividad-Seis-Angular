import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
})
export class NewuserComponent {
  userForm: FormGroup;
  userService = inject(UsersService);
  //Router, redireccion de ruta
  router = inject(Router);

  //valor o variale de la rutta, usar ruter o ActiveRoute
  activeRoute = inject(ActivatedRoute);

  titulo = 'New User';

  ngOnInit(): void {
    
  }
  

  constructor() {

    let user: User | undefined;

    this.activeRoute.params.subscribe((params: any) => {
      let id: number = Number(params.id);

      if (!Number.isNaN(id)){
        this.titulo= "Update User";
      }
      
      //llamar servicio funcion getById (id)
      user = this.userService.getById(id);
      
    });

    this.userForm= new FormGroup(
      {
        first_name: new FormControl(user?.first_name, [Validators.required, Validators.minLength(3)]),
        last_name: new FormControl(user?.last_name, [Validators.required, Validators.minLength(3)]),
        username: new FormControl(user?.username, [Validators.required, Validators.minLength(3)]),
        password: new FormControl(user?.password, [Validators.required]),
        email: new FormControl(user?.email, [Validators.required, Validators.email]),
        image: new FormControl(user?.image, [Validators.required]),
      },
      []
    );
  }


  getDataForm(): void {
    let response = this.userService.insert(this.userForm.value);
    if (response === 'ok') {
      this.router.navigate(['']);
    } else {
      alert('Usario no se ha podido registrar');
    }
    this.userForm.reset();
  }
 checkControl(formcontrolName: string, valiador: string): boolean | undefined{
  return this.userForm.get(formcontrolName)?.hasError(valiador) && this.userForm.get(formcontrolName)?.touched
}
}

