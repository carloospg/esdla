import { Component } from '@angular/core';
import { ConfirmarPopup } from '../confirmar-popup/confirmar-popup';
import { BuscarPersonaje } from '../../personajes/buscar-personaje/buscar-personaje';
import { ConfiguracionPopup } from '../../interfaces/configuracion-popup';
import { ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-padre',
  imports: [ConfirmarPopup],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {
  parametrosModal: ConfiguracionPopup = {
    message: "Mi primer popup",
    header: "Personaje",
    nameButton: "Borrame",
    severity: "danger",
  }
}
