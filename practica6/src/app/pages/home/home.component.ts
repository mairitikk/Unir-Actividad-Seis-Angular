import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //inyectamos el servicio
  usersServices = inject(UsersService);

  // lista de usuarios
  myUsers: User[] = [];

  // Opcion base de datos interna (bd.ts)
  ngOnInit(): void {
    // Obtenemos la lista de usuarios
    // La lista de usuarios la mantenemos en una base de datos interna que se rellena con la API
    // La base de datos interna tiene unos datos por defecto en caso de que la API no funcione.
    this.myUsers = this.usersServices.getAll();
  }

}
