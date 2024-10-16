import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Prueba',
      email: 'prueba@prueba.com',
      password: 'Pru3b4'
    }
  ];

  private user:(User|null) = null;

  constructor() {
    this.isLogged();
  }

  public setUser(user: User): void { this.user = user }

  public getUser(): User|null { return this.user }

  public getUsers(): User[] { return this.users }

  public logout(): void {
    this.user = null;
    localStorage.clear();
  }

  public login(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (!user) return false;
    this.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  public register(name: string, email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) return false;
    this.users.push({ id: this.createNewId(), name, email, password });
    return this.login(email, password);
  }

  public isLogged(): boolean {
    const user = localStorage.getItem('user');
    if (!user) return false;
    this.user = JSON.parse(user);
    return true;
  }

  createNewId(): number {
    const newId = this.users.reduce((lastUser: User, user: User) => (user.id > lastUser.id ? user : lastUser));
    return newId.id + 1;
  }



}
