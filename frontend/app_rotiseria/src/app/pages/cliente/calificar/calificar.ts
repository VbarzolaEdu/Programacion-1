import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Valoraciones } from '../../../services/valoraciones';
import { Auth } from '../../../services/auth';
import { Pedidos } from '../../../services/pedidos';

@Component({
  selector: 'app-calificar',
  standalone: true,
  imports: [ CommonModule, FormsModule, Navbar, Header], 
  templateUrl: './calificar.html',
  styleUrl: './calificar.css'
})
export class Calificar implements OnInit {
  
  pedidoId: number | null = null;
  pedidoData: any = null;
  cargando: boolean = false;
  enviando: boolean = false;
  
  // Variables para la calificación
  rating: number = 0; 
  hoverRating: number = 0; 
  comentario: string = '';
  
  mensajeExito: string | null = null; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private valoracionesService: Valoraciones,
    private authService: Auth,
    private pedidosService: Pedidos
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('idPedido');
      if (idString) {
        this.pedidoId = +idString; 
        console.log(`📋 Página de Calificación. ID del Pedido: ${this.pedidoId}`);
        this.cargarDatosPedido();
      }
    });
  }

  /**
   * Carga los datos del pedido desde el backend
   */
  cargarDatosPedido() {
    if (!this.pedidoId) return;
    
    this.cargando = true;
    this.pedidosService.getPedido(this.pedidoId).subscribe({
      next: (response: any) => {
        console.log('✅ Datos del pedido cargados:', response);
        this.pedidoData = response;
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar pedido:', error);
        this.cargando = false;
        this.mensajeExito = '⚠️ No se pudo cargar la información del pedido';
      }
    });
  }

  /**
   * 
   * @param value El valor de la estrella seleccionada (1-5).
   */
  setRating(value: number): void {
    this.rating = value; 
  }

  /**
   * 
   * @param value 
   */
  setHoverRating(value: number): void {
    this.hoverRating = value; 
  }

  /**
   * 
   */
  resetHoverRating(): void {
    this.hoverRating = 0; 
  }

  /**
   * Obtiene los nombres de los productos del pedido
   */
  obtenerNombresProductos(): string {
    if (!this.pedidoData || !this.pedidoData.productos || this.pedidoData.productos.length === 0) {
      return 'Sin productos';
    }
    
    return this.pedidoData.productos.map((p: any) => p.nombre).join(', ');
  }

  // --- Lógica de Envío ---

  enviarCalificacion(): void {
    if (this.rating === 0) {
      this.mensajeExito = "⚠️ Por favor, selecciona una calificación (1 a 5 estrellas) antes de enviar.";
      return; 
    }

    if (!this.pedidoData || !this.pedidoData.productos || this.pedidoData.productos.length === 0) {
      this.mensajeExito = "⚠️ No se puede calificar: el pedido no tiene productos.";
      return;
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.mensajeExito = "⚠️ Error: Usuario no identificado.";
      return;
    }

    this.enviando = true;

    // Tomar el primer producto del pedido para la valoración
    const primerProducto = this.pedidoData.productos[0];

    const valoracionData = {
      id_usuario: userId,
      id_producto: primerProducto.id,
      puntuacion: this.rating,
      comentario: this.comentario || ''
    };

    console.log(`📝 Enviando calificación para Pedido ID: ${this.pedidoId}`, valoracionData);

    this.valoracionesService.createValoracion(valoracionData).subscribe({
      next: (response) => {
        console.log('✅ Valoración creada exitosamente:', response);
        this.mensajeExito = "✅ Su valoración ha sido enviada con éxito.";
        
        // Limpiar formulario
        this.rating = 0;
        this.comentario = '';
        this.enviando = false;
        
        // Redirigir a calificaciones después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/cliente/calificaciones']); 
        }, 2000); 
      },
      error: (error) => {
        console.error('❌ Error al crear valoración:', error);
        this.mensajeExito = "⚠️ Error al enviar la calificación. Intenta nuevamente.";
        this.enviando = false;
      }
    });
  }
}