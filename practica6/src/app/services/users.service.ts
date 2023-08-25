import { Injectable } from '@angular/core';
import { USER } from '../db/user.db';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private arrUser: User[] = USER;
  
  constructor() {}

  getAll(): User[] {
    return this.arrUser;
  }

  getById(id: number): User | undefined {
    return this.arrUser.find((user) => user.id === id);
  }
}
