import { Component, inject } from '@angular/core';
import { Pagination } from 'src/app/interfaces/pagination.interface';
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
  
  pagination : Pagination = {page:0, per_page: 0, total:0, total_pages:0};

  // lista de usuarios
  myUsers: User[] = [];

  // Opcion base de datos interna (bd.ts)
  ngOnInit(): void {
    // Obtenemos la lista de usuarios
    // La lista de usuarios la mantenemos en una base de datos interna que se rellena con la API
    // La base de datos interna tiene unos datos por defecto en caso de que la API no funcione.
    this.myUsers = this.usersServices.getAll();

    this.pagination = this.usersServices.getPagination();
  }

}
