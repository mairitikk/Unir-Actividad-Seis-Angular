import { Injectable, inject } from '@angular/core';
import { USER } from '../db/user.db';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  // Asignamos valores iniciales por defecto de nuestra BD interna
  private arrUser: User[] = USER;

  // id to control the insert of a new user in the DB
  private id: number= this.arrUser.length + 1;

  // URL de la API
  private baseUrl: string = " https://peticiones.online/api/users/"

  // asincrono, peticiones a una API
  httpClient = inject(HttpClient);
  
  constructor() {
    // Consultamos la API y Asignamos los valores provenientes de la API
    this.getDataFromAPI();
  }

  // API
  /*
    // Option 1:
    getDataFromAPI(): void {

      this.getAllApi().then((response) => {
        this.arrUser = response.results;

        console.log("hola ", this.arrUser)
      })
      .catch((error)=> { console.log(error)})
    }
  */
  
  // Option 2:
  async getDataFromAPI(): Promise<void> {
    try{
      await this.getAllApi().then((response) => {
        this.arrUser = response.results;
      });
    }catch(error){
      console.log(error)
    }
  }
  
  // obtenemos todos los usuarios de la API
  getAllApi(): Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
  }

  // Obtenemos todos los usuario de nuestra variable interna
  getAll(): User[] {
    return this.arrUser;
  }

  // obtenemos un usuario por id de la API
  getByIdApi(_id:number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}${_id}`)
  }

  // obtenemos un usuario por id de nuestra variable interna
  getById(id: number): User | undefined {
    return this.arrUser.find((user) => user.id === id);
  }

  // insertamos un usuario en nuestra variable interna y en la API
  insert(user: User): Promise<User>{

    // insertamos el usuario en nuestra variable interna
    let newUser = user;
    newUser.id = this.id
    this.arrUser.push(newUser);
    this.id++

    // insertamos el usuario en la API
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, user))
  }
  
  update(user: User): Promise<User> {

    //buscar el index del usario
    let indexUser = this.arrUser.findIndex((u) => u._id === user._id);

    // actualizar usario en su posicion
    this.arrUser[indexUser] = user;

    //actualizar el usario en la API
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${user.id}`, user))
    
  }

  // eliminamos un usuario de nuestra variable interna y de la API
  deleteUser(id: number): Promise<any> {

    // borrar usario de nuestra variable interna
    this.arrUser.splice(
      this.arrUser.findIndex((user) => user.id === id), 1
    );

    // borrar Usario de API
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`))
    
  }
  // vaciar formulario this.userForm.reset();
}
