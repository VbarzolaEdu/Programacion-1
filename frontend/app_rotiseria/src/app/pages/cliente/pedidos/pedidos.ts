import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pedidos as PedidosService } from '../../../services/pedidos';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, Navbar, Header, CardPedido],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class Pedidos {
  cargando: boolean = false;
  arraypedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  
  constructor(
    private router: Router,
    private pedidoService: PedidosService,
    private authService: Auth
  ) {
    console.log('🏗️ Constructor de Pedidos ejecutado');
  } 

  ngOnInit() {
    console.log('🚀 ngOnInit de Pedidos ejecutado');
    this.cargarPedidosDelCliente();
  }

  /**
   * Carga los pedidos del cliente actual
   */
  cargarPedidosDelCliente() {
    this.cargando = true;
    const userId = this.authService.getCurrentUserId();
    
    console.log('🔑 Usuario ID actual:', userId);
    
    if (!userId) {
      console.error('❌ No se pudo obtener el ID del usuario');
      alert('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      this.cargando = false;
      return;
    }

    this.pedidoService.getPedidos().subscribe({
      next: (response: any) => {
        console.log('✅ Pedidos cargados (respuesta completa):', response);
        
        let todosPedidos = [];
        
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          todosPedidos = response;
        } else if (response.pedidos && Array.isArray(response.pedidos)) {
          // Si viene en formato { pedidos: [...] }
          todosPedidos = response.pedidos;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          todosPedidos = [];
        }
        
        console.log('📦 Todos los pedidos recibidos:', todosPedidos);
        
        // Filtrar solo los pedidos del usuario actual
        this.arraypedidos = todosPedidos.filter((p: any) => {
          // Verificar diferentes posibles nombres de campo
          const pedidoUserId = p.userId || p.user_id || p.id_user || (p.user && p.user.id);
          console.log(`🔍 Comparando - Pedido ID: ${p.id}, User ID del pedido: ${pedidoUserId} (tipo: ${typeof pedidoUserId}), User ID actual: ${userId} (tipo: ${typeof userId})`);
          
          // Comparar tanto con igualdad estricta como con conversión de tipos
          const coincide = pedidoUserId == userId || pedidoUserId === userId;
          console.log(`   Coincide: ${coincide}`);
          
          return coincide;
        });
        
        console.log(`📋 Pedidos filtrados para el usuario ${userId}:`, this.arraypedidos);
        
        // Mapear los datos al formato esperado por el card-pedido
        this.pedidosFiltrados = this.arraypedidos.map((p: any) => ({
          id: p.id,
          fecha: this.formatearFecha(p.fecha),
          total: p.precio_final || p.total || 0,
          estado: p.estado || 'Pendiente',
          nombre: this.obtenerNombreProductos(p.productos),
          imagen: this.obtenerImagenPrincipal(p.productos)
        }));
        
        console.log('✨ Pedidos formateados para mostrar:', this.pedidosFiltrados);
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar pedidos:', error);
        this.cargando = false;
        this.arraypedidos = [];
        this.pedidosFiltrados = [];
        alert('Error al cargar tus pedidos. Intenta nuevamente.');
      }
    });
  }

  /**
   * Navega a la página de valoración del pedido
   */
  irAValorar(pedidoId: number): void {
    console.log(`Navegando a calificaciones para el pedido ID: ${pedidoId}`);
    this.router.navigate(['/cliente/calificar', pedidoId]);
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatearFecha(fecha: string): string {
    if (!fecha) return 'Fecha no disponible';
    
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return fecha;
    }
  }

  /**
   * Obtiene el nombre de los productos del pedido
   */
  obtenerNombreProductos(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'Sin productos';
    }
    
    if (productos.length === 1) {
      return productos[0].nombre || 'Producto';
    }
    
    // Si hay múltiples productos, mostrar el primero y cantidad
    return `${productos[0].nombre} (+${productos.length - 1} más)`;
  }

  /**
   * Obtiene la imagen principal del primer producto
   */
  obtenerImagenPrincipal(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'assets/buger1.jpg';
    }
    
    return productos[0].imagen || 'assets/buger1.jpg';
  }
}
