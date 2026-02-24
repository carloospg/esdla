import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego-service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [ButtonModule, ToastModule, CommonModule],
  templateUrl: './juego.html',
  styleUrls: ['./juego.css'],
  providers: [MessageService]
})
export class Juego implements OnInit {

  partidaActual: any = null;
  preguntaActual: any = null;
  preguntasRespondidasIds: number[] = [];
  juegoTerminado: boolean = false;
  resultadoFinal: string = '';
  esperandoRespuesta: boolean = false;

  stats = { victorias: 0, derrotas: 0, total: 0 };
  totalPreguntas = 10; 

  constructor(
    private juegoService: JuegoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  iniciarNuevaPartida() {
    this.juegoService.empezarPartida().subscribe({
      next: (partida: any) => {
        this.partidaActual = partida;
        this.preguntasRespondidasIds = [];
        this.juegoTerminado = false;
        this.pedirPreguntaAlServidor();
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo conectar con el servidor.' });
      }
    });
  }

  pedirPreguntaAlServidor() {
    let idSiguiente = Math.floor(Math.random() * this.totalPreguntas) + 1;

    if (this.preguntasRespondidasIds.includes(idSiguiente)) {
      this.pedirPreguntaAlServidor();
      return;
    }

    this.juegoService.obtenerPregunta(idSiguiente).subscribe({
      next: (data: any) => {
        this.preguntaActual = data;
        this.preguntasRespondidasIds.push(idSiguiente);
        this.esperandoRespuesta = false
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `No existe la pregunta con ID ${idSiguiente}` });
      }
    });
  }

  seleccionarRespuesta(opcion: number) {
    if (this.esperandoRespuesta) {
        return
    }
    this.esperandoRespuesta = true
    this.juegoService.comprobarRespuesta(this.preguntaActual.id, opcion).subscribe({
      next: (esCorrecta: any) => {
        if (esCorrecta) {
          this.messageService.add({ severity: 'success', summary: '¡Correcto!', detail: 'Sumas 1 punto' });
          this.gestionarAcierto();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Incorrecto', detail: 'Has fallado la pregunta' });
          this.gestionarFallo();
        }
      },
      error: (err: any) => {
        this.esperandoRespuesta = false
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fallo al comprobar la respuesta.' });
      }
    });
  }

  gestionarAcierto() {
    this.juegoService.actualizarCorrectas(this.partidaActual.id).subscribe({
      next: (partidaActualizada: any) => {
        this.partidaActual = partidaActualizada;
        
        if (this.partidaActual.numeroCorrectas === 5) {
          this.finalizarJuego(true);
        } else {
        }
      }
    });
  }

  gestionarFallo() {
    this.finalizarJuego(false);
  }

  finalizarJuego(victoria: boolean) {
    this.juegoTerminado = true;
    this.preguntaActual = null;
    this.resultadoFinal = victoria ? '¡HAS GANADO!' : 'HAS PERDIDO';
    this.actualizarLocalStorage(victoria);

    this.juegoService.finalizarPartida(this.partidaActual.id).subscribe({
      next: () => {
        console.log("Partida cerrada en el servidor correctamente.");
      },
      error: (err: any) => {
        console.error("Error al cerrar la partida en BD:", err);
      }
    });
  }

  cargarHistorial() {
    const data = localStorage.getItem('esdla_stats');
    if (data) this.stats = JSON.parse(data);
  }

  actualizarLocalStorage(victoria: boolean) {
    this.stats.total++;
    if (victoria) this.stats.victorias++;
    else this.stats.derrotas++;
    
    localStorage.setItem('esdla_stats', JSON.stringify(this.stats));
  }
}