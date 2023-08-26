import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  //valor o variale de la rutta, usar ruter o ActiveRoute
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      let id: number = Number(params.id);
      console.log(id);
      //llamar servicio funcion getById (id)
      //servicio retorna objeto con ese id
    });
  }
}
