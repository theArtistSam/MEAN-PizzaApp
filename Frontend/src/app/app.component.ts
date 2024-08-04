import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../interfaces/pizza.interface';
import { Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PizzaService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend of Pizza App';
  pizzas: Pizza[] = [];
  private pizzaSubscription: Subscription = new Subscription;

  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  ngOnDestroy(): void {
    if (this.pizzaSubscription) {
      this.pizzaSubscription.unsubscribe();
    }
  }

  loadPizzas(): void {
    this.pizzaSubscription = this.pizzaService.getPizzas().subscribe({
      next: (response: Pizza[]) => {
        this.pizzas = response;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  addPizza(): void {
    const newPizza: Pizza = { name: 'New Pizza', toppings: ['cheese'], quantity: 10 };
    this.pizzas = [...this.pizzas, newPizza];
    this.pizzaService.addPizza(newPizza).subscribe({
      next: (response: Pizza) => {
        this.pizzas.push(response);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updatePizzaQuantity(name: string, quantity: number): void {
    this.pizzaService.updatePizza(name, quantity).subscribe({
      next: () => {
        this.pizzas = this.pizzas.map(pizza => pizza.name === name ? { ...pizza, quantity } : pizza); // Update pizza quantity in a new array  
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deletePizza(name: string): void {
    this.pizzaService.deletePizza(name).subscribe({
      next: () => {
        this.pizzas = this.pizzas.filter(p => p.name !== name); 
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
