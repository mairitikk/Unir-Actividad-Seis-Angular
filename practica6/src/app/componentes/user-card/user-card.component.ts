import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() myUser!: User;
  router = inject(Router);
  //inject el servicio
  usersServices = inject(UsersService);

  // elimina un usuario
  async deleteUser(id: number): Promise<void> {
    alert('Estas seguro de borrar este usario?');
    
    // llamamos a la funcion borrar usuario del servicio
    let response = await this.usersServices.deleteUser(id);

    // si el usuario se borra correctamente, retornamos al home
    if (response) {
      
      // como nos encontramos en el home, forzamos un reload
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/test', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
  }
}
