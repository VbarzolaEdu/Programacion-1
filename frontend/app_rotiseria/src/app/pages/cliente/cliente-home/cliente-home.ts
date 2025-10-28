import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { CartService } from '../../../services/cart.service';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Auth } from '../../../services/auth';
import { Productos } from '../../../services/productos';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [CommonModule, Navbar, CardProducto, Header], 
  templateUrl: './cliente-home.html',
  styleUrls: ['./cliente-home.css']
})
export class ClienteHome {
  private authService = inject(Auth);
  userRole: string | null = null;
  
  cargando: boolean = false;
  arrayproductos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private router: Router, 
    private cart: CartService,
    private productoService: Productos
  ) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit() {
    this.cargarProductos();
  }

  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos() {
    this.cargando = true;
    this.productoService.getProductos().subscribe({
      next: (response: any) => {
        console.log('✅ Productos cargados:', response);
        
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          this.arrayproductos = response;
        } else if (response.productos && Array.isArray(response.productos)) {
          // Si viene en formato { productos: [...] }
          this.arrayproductos = response.productos;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          this.arrayproductos = [];
        }
        
        // Agregar imagen por defecto si no existe y filtrar solo disponibles
        this.arrayproductos = this.arrayproductos
          .map(p => ({
            ...p,
            imagen: p.imagen || 'assets/buger1.jpg'
          }))
          .filter(p => p.disponible !== false); // Mostrar solo productos disponibles
        
        this.productosFiltrados = [...this.arrayproductos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar productos:', error);
        this.cargando = false;
        this.arrayproductos = [];
        this.productosFiltrados = [];
        alert('Error al cargar productos. Verifica tu conexión.');
      }
    });
  }

  irAHacerPedido(id: number) {
    this.router.navigate(['/cliente/hacer-pedido', id]);
  }

  agregarAlCarrito(p: any) {
    this.cart.addItem({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1
    });
    alert(`🛒 ${p.nombre} agregado al carrito`);
  }
}
