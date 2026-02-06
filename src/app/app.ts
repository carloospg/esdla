import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaisesService } from './services/paises-service';
import { timeInterval } from 'rxjs';
import { ConfirmarPopup } from './modales/confirmar-popup/confirmar-popup';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RouterLink, ConfirmarPopup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('anillosDePoder');

  constructor(private paisService: PaisesService) {}

  paises: any[] = [];
  error = '';
  @ViewChild(ConfirmarPopup) popup!: ConfirmarPopup;

  ngOnInit(): void {
    this.cargarPaises();
  }

  confirmDelete = {
    message: 'Estas seguro de que lo quieres borrar?',
    header: 'Eliminar personaje',
    nameButton: 'Eliminar',
    severity: 'danger' as any
  };

  cargarPaises() {
    this.paisService.getAllCountries().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        this.error = 'Se ha producido un error';
      },
    });
  }

  abrirModal() {
    this.confirmDelete = {
      message: 'Seguro que quieres borrar este personaje?',
      header: 'Eliminar personaje',
      nameButton: 'Borrar definitivamente',
      severity: 'danger' as any
    };
    this.popup.confirm2;
  }
}
