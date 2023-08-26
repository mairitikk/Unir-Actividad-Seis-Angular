import { Injectable } from '@angular/core';
import { USER } from '../db/user.db';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private arrUser: User[] = USER;
  private id: number= this.arrUser.length +1;
  constructor() {}

  getAll(): User[] {
    return this.arrUser;
  }

  getById(id: number): User | undefined {
    return this.arrUser.find((user) => user.id === id);
  }
  insert(user: User){
    let newUser = user;
    newUser.id = this.id
    this.arrUser.push(newUser);
    this.id++
    return 'ok'

  }
  
  // vaciar formulario this.userForm.reset();
}
