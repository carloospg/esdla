import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { RouterLink } from '@angular/router';

import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-crear-anillo',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './crear.html',
  styleUrl: './crear.css',
})
export class CrearAnillo {
  razas = ['Elfo', 'Enano', 'Humano', 'Maiar', 'Orco', 'Espectro'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    poder: new FormControl('', [Validators.required, Validators.minLength(5)]),
    portador: new FormControl('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl('', [Validators.required]),
    corrupcion: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
  });

  enviar() {
    if (this.formulario.valid) {
      alert('Anillo creado correctamente');
      this.formulario.setValue({
        nombre: '',
        poder: '',
        portador: '',
        raza: null,
        corrupcion: 50,
      });
      this.formulario.markAsUntouched();
      this.formulario.markAsPristine();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
