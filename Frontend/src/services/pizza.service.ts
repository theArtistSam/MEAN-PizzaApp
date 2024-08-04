import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from '../interfaces/pizza.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl: string = "http://localhost:8080/pizzas"
  constructor(private http: HttpClient) { }

  getPizzas(): Observable<Pizza[]>{
    return this.http.get<Pizza[]>(this.apiUrl)
  }

  addPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiUrl, pizza);
  }

  updatePizza(name: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${name}`, { quantity });
  }

  deletePizza(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }
}
