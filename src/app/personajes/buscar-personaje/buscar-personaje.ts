import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Personajes } from '../../services/personajes-service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, ToastModule, ConfirmDialogModule, ImageModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService],
})
export class BuscarPersonaje implements OnInit {
  personajes: any[] = [];

  error = '';

  constructor(
    private personajeService: Personajes,
    private cdr: ChangeDetectorRef,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  editar(id: number) {
    this.route.navigate(['/editar', id]);
  }

  crearPersonaje() {
    this.route.navigate(['/crearPersonaje']);
  }

  cargarPersonajes() {
    this.personajeService.obtenerPersonajes().subscribe({
      next: (data) => {
        console.log(data);
        this.personajes = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Se ha producido un error';
      },
    });
  }

  confirmarBajaFisica(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Se va a borrar de forma definitiva, estas seguro?',
      header: 'Baja fisica',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajeService.darBajaFisica(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'El personaje ha sido borrado fisicamente',
            });
            this.cargarPersonajes();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'No se puede borrar',
              detail: 'No se puede borrar el personaje porque es portador',
            });
          },
        });
      },
    });
  }

  confirmarBajaLogica(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Se va a dar de baja el personaje, estas seguro?',
      header: 'Baja logica',
      icon: 'pi pi-expclamation-triangle',
      acceptLabel: 'Dar de baja',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajeService.darBajaLogica(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Baja realizada',
              detail: 'Se ha dado de baja correctamente',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ha ocurrido un error al dar de baja',
            });
          },
        });
      },
    });
  }

  confirmarReactivacion(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseas reactivar el personaje?',
      header: 'Reactivar personaje',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Reactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.personajeService.reactivarPersonaje(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Reactivado',
              detail: 'Personaje reactivado correctamente',
            });
            this.cargarPersonajes();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ha ocurrido un error',
            });
          },
        });
      },
    });
  }
}
