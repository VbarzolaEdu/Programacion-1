import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-calificar',
  standalone: true,
  imports: [ CommonModule, FormsModule,NavCliente], 
  templateUrl: './calificar.html',
  styleUrl: './calificar.css'
})
export class Calificar implements OnInit {
  
  pedidoId: number | null = null;
  
  // Variables para la calificación
  rating: number = 0; 
  hoverRating: number = 0; 
  comentario: string = '';
  

  mensajeExito: string | null = null; 

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

  // --- Lógica de Envío ---

  enviarCalificacion(): void {
  
    if (this.rating === 0) {
      this.mensajeExito = "⚠️ Por favor, selecciona una calificación (1 a 5 estrellas) antes de enviar.";
      return; 
    }

    console.log(`Enviando calificación para Pedido ID: ${this.pedidoId}`);
    

    this.mensajeExito = "Su valoración ha sido enviada con éxito.";


    this.rating = 0;
    this.comentario = '';
    
    setTimeout(() => {
      this.router.navigate(['/cliente/calificaciones']); 
      this.mensajeExito = null; 
    }, 2000); 
  }
}
