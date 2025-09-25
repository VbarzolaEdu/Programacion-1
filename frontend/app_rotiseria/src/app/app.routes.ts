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
import { HomeIndex } from './pages/admin/home-index/home-index';
import { PedidosAdmin } from './pages/admin/pedidos/pedidos';
import { Precios } from './pages/admin/precios/precios';
import { Productos } from './pages/admin/productos/productos';
import { Promociones } from './pages/admin/promociones/promociones';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { EmpleadoIndex } from './pages/empleado/empleado-index/empleado-index';
import { EmpleadoStock } from './pages/empleado/empleado-stock/empleado-stock';
import { EstadoP } from './pages/empleado/estado-p/estado-p';
import { GDU } from './pages/empleado/gdu/gdu';


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

    { path: 'cliente/hacer-pedido/:id', component: HacerPedido },

    { path: 'admin/home-index', component: HomeIndex },

    { path: 'admin/pedidos', component: PedidosAdmin },

    { path: 'admin/precios', component: Precios },

    { path: 'admin/productos', component: Productos },

    { path: 'admin/promociones', component: Promociones },

    { path: 'admin/usuarios', component: Usuarios },

    { path: 'empleado/empleado-index', component: EmpleadoIndex },

    { path: 'empleado/empleado-stock', component: EmpleadoStock },

    { path: 'empleado/estado-p', component: EstadoP },

    { path: 'empleado/gdu', component: GDU }





    
    

    
];