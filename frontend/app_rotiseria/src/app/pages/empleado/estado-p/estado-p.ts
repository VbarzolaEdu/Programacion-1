import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pedidos } from '../../../services/pedidos';

@Component({
  selector: 'app-estado-p',
  imports: [RouterModule, CommonModule, Navbar, Header, CardPedido],
  templateUrl: './estado-p.html',
  styleUrl: './estado-p.css'
})
export class EstadoP {
  cargando: boolean = false;
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];

  constructor(private pedidosService: Pedidos) {}

  ngOnInit() {
    this.cargarTodosLosPedidos();
  }

  /**
   * Carga todos los pedidos desde el backend
   */
  cargarTodosLosPedidos() {
    this.cargando = true;
    
    this.pedidosService.getPedidos().subscribe({
      next: (response: any) => {
        console.log('✅ Pedidos cargados (empleado):', response);
        
        let todosPedidos = [];
        
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          todosPedidos = response;
        } else if (response.pedidos && Array.isArray(response.pedidos)) {
          todosPedidos = response.pedidos;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          todosPedidos = [];
        }
        
        // Mapear los datos al formato esperado por el card-pedido
        this.pedidos = todosPedidos.map((p: any) => ({
          id: p.id,
          cliente: this.obtenerNombreCliente(p.user),
          fecha: this.formatearFecha(p.fecha),
          total: p.precio_final || p.total || 0,
          estado: p.estado || 'Pendiente',
          imagen: this.obtenerImagenPrincipal(p.productos),
          // Guardar el objeto completo para actualizaciones
          _original: p
        }));
        
        this.pedidosFiltrados = [...this.pedidos];
        console.log('📋 Pedidos formateados:', this.pedidos);
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar pedidos:', error);
        this.cargando = false;
        this.pedidos = [];
        this.pedidosFiltrados = [];
        alert('Error al cargar los pedidos. Intenta nuevamente.');
      }
    });
  }

  cambiarEstado(pedido: any, nuevoEstado: string): void {
    console.log(`🔄 Cambiando estado del pedido ${pedido.id} a: ${nuevoEstado}`);
    
    this.pedidosService.updatePedido(pedido.id, { estado: nuevoEstado }).subscribe({
      next: (response) => {
        console.log('✅ Estado actualizado:', response);
        pedido.estado = nuevoEstado;
        alert(`✅ Pedido #${pedido.id} cambiado a: ${nuevoEstado}`);
      },
      error: (error) => {
        console.error('❌ Error al actualizar estado:', error);
        alert('❌ Error al cambiar el estado del pedido');
      }
    });
  }

  rechazarPedido(pedido: any): void {
    if (confirm(`¿Estás seguro de rechazar el pedido #${pedido.id}?`)) {
      console.log(`❌ Rechazando pedido ${pedido.id}`);
      
      this.pedidosService.updatePedido(pedido.id, { estado: 'Rechazado' }).subscribe({
        next: (response) => {
          console.log('✅ Pedido rechazado:', response);
          pedido.estado = 'Rechazado';
          alert(`✅ Pedido #${pedido.id} ha sido rechazado`);
        },
        error: (error) => {
          console.error('❌ Error al rechazar pedido:', error);
          alert('❌ Error al rechazar el pedido');
        }
      });
    }
  }

  /**
   * Obtiene el nombre del cliente desde el objeto user
   */
  obtenerNombreCliente(user: any): string {
    if (!user) return 'Cliente desconocido';
    
    const nombre = user.nombre || user.name || '';
    const apellido = user.apellido || user.lastname || '';
    
    return nombre && apellido ? `${nombre} ${apellido}` : 
           nombre ? nombre : 
           user.email || 'Cliente desconocido';
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
   * Obtiene la imagen principal del primer producto
   */
  obtenerImagenPrincipal(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'assets/buger1.jpg';
    }
    
    return productos[0].imagen || 'assets/buger1.jpg';
  }
}
