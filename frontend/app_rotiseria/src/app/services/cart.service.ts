import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
  extras?: string[];
  nota?: string;    
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('carrito');
    if (stored) {
      this.items = JSON.parse(stored);
      this.itemsSubject.next(this.items);
    }
  }

  private actualizarEstado() {
    this.itemsSubject.next([...this.items]);
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  addItem(item: CartItem) {
    const existente = this.items.find(i => i.id === item.id);
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
    this.actualizarEstado();
  }

  updateItem(item: CartItem) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...item };
    } else {
      this.items.push(item);
    }
    this.actualizarEstado();
  }

  updateCantidad(id: number, cantidad: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.cantidad = cantidad > 0 ? cantidad : 1;
      this.actualizarEstado();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.actualizarEstado();
  }

  clear() {
    this.items = [];
    this.actualizarEstado();
  }

  getTotal() {
    return this.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  }

  getItems() {
    return [...this.items];
  }
}