import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaisesService } from './services/paises-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('anillosDePoder');

  paises: any[] = [];
  error = '';

  constructor(private paisService: PaisesService) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

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
}