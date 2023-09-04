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
  // variable para manejar el formulario del usuario
  userForm: FormGroup;

  // inyectamos el servicio
  userService = inject(UsersService);

  //Router, redireccion de ruta
  router = inject(Router);

  //variale de la ruta
  activeRoute = inject(ActivatedRoute);

  // Titulo de la pagina
  titulo = 'New User';

  ngOnInit(): void {}

  constructor() {

    // definimos la variable usuario
    let user: User | undefined;

    // nos subscribimos a la ruta activa
    this.activeRoute.params.subscribe((params: any) => {

      // obtenemos el id del usuario
      let id: number = Number(params.id);

      // si esta definido, estamos en actualizar usuario
      if (!Number.isNaN(id)) {
        this.titulo = 'Update User';
      }

      // llamar servicio funcion getById(id)
      user = this.userService.getById(id);
    });

    // inicializamos el user form
    this.userForm = new FormGroup(
      {
        id: new FormControl(user?._id, [ ]),
        _id: new FormControl(user?._id, [ ]),
        first_name: new FormControl(user?.first_name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl(user?.last_name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        username: new FormControl(user?.username, [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl(user?.password, [Validators.required]),
        email: new FormControl(user?.email, [
          Validators.required,
          Validators.email,
        ]),
        image: new FormControl(user?.image, [Validators.required]),
      },
      []
    );
  }

  // insertamos los datos del formulario
  async getDataForm(): Promise<void> {

    if (this.userForm.value.id){
      // actualizando - min 2.20
      let response = await this.userService.update(this.userForm.value);
      if(response.id){
        this.router.navigate(['']);
      }else{
        alert('error al actualizar el user: ')
      }

    }else{
      // insertar
      // llamamos al metodo insert del usuarService
      let response = await this.userService.insert(this.userForm.value);

      // si el id existe, se inserto correctamente
      if (response.id) {
        this.router.navigate(['']);
      } else {
        alert('Usario no se ha podido registrar');
      }

    }

    // eliminamos los valores del formulario
    this.userForm.reset();
  }

  // funcion para validar los elementos del formulario
  checkControl(formcontrolName: string, valiador: string): boolean | undefined {
    return (
      this.userForm.get(formcontrolName)?.hasError(valiador) &&
      this.userForm.get(formcontrolName)?.touched
    );
  }
}
