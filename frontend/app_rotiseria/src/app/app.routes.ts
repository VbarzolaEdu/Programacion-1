import { Routes } from '@angular/router';
import { Home} from './pages/home/home';
import { Calificaciones } from './pages/cliente/calificaciones/calificaciones';
import { Calificar } from './pages/cliente/calificar/calificar';
import { Carrito } from './pages/cliente/carrito/carrito';
import { ClienteHome } from './pages/cliente/cliente-home/cliente-home';
import { Pedidos } from './pages/cliente/pedidos/pedidos';
import { HacerPedido } from './pages/cliente/hacer-pedido/hacer-pedido';
import { Perfil } from './pages/cliente/perfil/perfil';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';


export const routes: Routes = [

    {path: 'home', component: Home},
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'cliente/calificaciones', component: Calificaciones},

    {path: 'cliente/calificar', component: Calificar},

    {path: 'cliente/carrito', component: Carrito},

    {path: 'cliente/cliente-home', component: ClienteHome},

    {path: 'cliente/pedidos', component: Pedidos},

    {path: 'cliente/hacer-pedido', component: HacerPedido},

    {path: 'cliente/perfil', component: Perfil},

    {path: 'auth/login', component: Login},

    {path: 'auth/register', component: Register},
    
    

    
];
