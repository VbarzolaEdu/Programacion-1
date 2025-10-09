import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Importar Router para la navegación post-envío
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CommonModule } from '@angular/common'; // Necesario para ngIf y ngFor
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)] en el textarea

@Component({
  selector: 'app-calificar',
  standalone: true,
  // 🚨 Importante: Añadir CommonModule y FormsModule
  imports: [NavCliente, CommonModule, FormsModule,RouterLink], 
  templateUrl: './calificar.html',
  styleUrl: './calificar.css'
})
export class Calificar implements OnInit {
  
  pedidoId: number | null = null;
  
  // Variables para la calificación
  rating: number = 0; // La calificación seleccionada (1 a 5)
  hoverRating: number = 0; // La calificación actual al pasar el ratón
  comentario: string = ''; // Modelo para el textarea
  
  // Mensaje de éxito
  mensajeExito: string | null = null; 

  // 🚨 Inyectar ActivatedRoute y Router
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('idPedido');
      if (idString) {
        this.pedidoId = +idString; 
        console.log(`Página de Calificación. ID del Pedido: ${this.pedidoId}`);
      }
    });
  }

  // --- Lógica de Calificación (Estrellas) ---

  /**
   * Fija la calificación al hacer clic en una estrella.
   * @param value El valor de la estrella seleccionada (1-5).
   */
  setRating(value: number): void {
    this.rating = value; 
  }

  /**
   * Actualiza el rating de hover mientras el ratón está sobre las estrellas.
   * @param value El valor de la estrella sobre la que está el ratón (1-5).
   */
  setHoverRating(value: number): void {
    this.hoverRating = value; 
  }

  /**
   * Restaura el rating de hover a 0 cuando el ratón sale del contenedor.
   */
  resetHoverRating(): void {
    this.hoverRating = 0; 
  }

  // --- Lógica de Envío ---

  enviarCalificacion(): void {
    // 1. Validación: Asegurar que se seleccionó al menos 1 estrella
    if (this.rating === 0) {
      this.mensajeExito = "⚠️ Por favor, selecciona una calificación (1 a 5 estrellas) antes de enviar.";
      return; 
    }

    // 2. Simulación de envío de datos
    console.log(`Enviando calificación para Pedido ID: ${this.pedidoId}`);
    
    // 3. Mostrar mensaje de éxito
    this.mensajeExito = "Su valoración ha sido enviada con éxito.";

    // 4. Limpiar y redirigir
    this.rating = 0;
    this.comentario = '';
    
    // Redirige a la página de calificaciones principal después de 2 segundos
    setTimeout(() => {
      this.router.navigate(['/cliente/calificaciones']); 
      this.mensajeExito = null; // Oculta el mensaje
    }, 2000); 
  }
}
