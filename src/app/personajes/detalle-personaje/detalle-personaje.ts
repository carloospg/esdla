import { Component, OnInit } from '@angular/core';
import { Personajes } from '../../services/personajes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-detalle-personaje',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css',
})
export class DetallePersonaje implements OnInit {
  id: string | null = null;
  formulario: FormGroup;
  esEdicion: boolean = false;

  constructor(
    private personaService: Personajes,
    private routeActiva: ActivatedRoute,
    private router: Router,
  ) {
    this.formulario = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl('', Validators.required),
      raza: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.id = this.routeActiva.snapshot.paramMap.get('id');
    if (this.id) {
      this.esEdicion = true;
      this.personaService.obtenerPersonaje(Number(this.id)).subscribe({
        next: (datos) => {
          this.formulario.patchValue(datos);
        },
        error: (e) => console.error('Error al cargar personaje', e),
      });
    } else {
      this.esEdicion = false;
    }
  }

  guardar() {
    if (this.formulario.valid) {
      const datosFormulario = this.formulario.getRawValue();
      if (this.esEdicion && this.id) {
        this.personaService.actualizarPersonaje(Number(this.id), datosFormulario).subscribe({
          next: () => {
            alert('Personaje actualizado correctamente');
            this.router.navigate(['/personajes']);
          },
          error: (e) => alert('Error al actualizar'),
        });
      } else {
        const { id, ...datosParaCrear } = datosFormulario;
        this.personaService.insertarPersonaje(datosParaCrear).subscribe({
          next: () => {
            alert('Personaje creado correctamente');
            this.router.navigate(['/personajes']);
          },
          error: (e) => alert('Error al crear el personaje'),
        });
      }
    } else {
      alert('Por favor rellena los campos obligatorios');
    }
  }

  volver() {
    this.router.navigate(['/personajes']);
  }
}
