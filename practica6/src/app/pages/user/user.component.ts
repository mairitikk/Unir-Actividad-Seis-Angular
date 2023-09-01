import { Component, Inject, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  //valor o variale de la rutta, usar ruter o ActiveRoute
  activeRoute = inject(ActivatedRoute);
  user!: User;
  usersService = inject(UsersService);
  router = inject(Router);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      let id: number = Number(params.id);

      //llamar servicio funcion getById (id)
      //servicio retorna objeto con ese id
      let response = this.usersService.getById(id);
      if (response === undefined) {
        alert('El usario no existe');

        // ei toota
      } else {
        this.user = response;
      }
    });
  }
}
