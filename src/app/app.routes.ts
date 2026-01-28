import { Routes } from '@angular/router';
import { Detalle } from './anillo/detalle/detalle';
import { Busqueda } from './anillo/busqueda/busqueda';
import { CrearAnillo } from './anillo/crear/crear';
import { Detalle2 } from './raza/detalle/detalle';
import { Busqueda2 } from './raza/busqueda/busqueda';
import { CrearRaza } from './raza/crear/crear';
import { BuscarPersonaje } from './personajes/buscar-personaje/buscar-personaje';
import { DetallePersonaje } from './personajes/detalle-personaje/detalle-personaje';

export const routes: Routes = [
    { path: 'detalle', component: Detalle },
    { path: 'buscar', component: Busqueda },
    { path: 'crear', component: CrearAnillo },
    { path: 'detalle2', component: Detalle2 },
    { path: 'buscar2', component: Busqueda2 },
    { path: 'crear2', component:CrearRaza },
    { path: 'personajes', component:BuscarPersonaje },
    { path: 'editar/:id', component: DetallePersonaje },
    { path: 'crearPersonaje', component: DetallePersonaje }
];
