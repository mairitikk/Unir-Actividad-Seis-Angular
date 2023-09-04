import { Component, Inject, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { __importDefault } from 'tslib';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  //valor o variable de la ruta, usar router o ActiveRoute
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  // inyectamos el servicio usuario
  usersService = inject(UsersService);

  // usuario para mostrar
  user!: User;

  ngOnInit(): void {
    // nos subscribimos a la ruta activa
    this.activeRoute.params.subscribe((params: any) => {
      // obtenemos el id del usuario
      let id: number = Number(params.id);

      //llamar servicio funcion getById (id)
      //servicio retorna objeto con ese id
      let response = this.usersService.getById(id);

      // si la respuesta es undefined, el usuario no existe
      if (response === undefined) {
        alert('El usario no existe');

        // redirigimos al home
        this.router.navigate(['']);
      } else {
        // sino, el usuario existe y lo asignamos a la variable user
        this.user = response;
      }
    });
  }

  // borramos un usuario por id
  async deleteUser(id: number): Promise<void> {
    alert('Estas seguro de borrar este usario?');

    // llamamos a la funcion borrar usuario del servicio
    let response = await this.usersService.deleteUser(id);

    // si el usuario se borra correctamente, retornamos al home
    if (response) {
      this.router.navigate(['']);
    }
  }
}
