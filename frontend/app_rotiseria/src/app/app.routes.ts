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
import { PedidosAdmin } from './pages/admin/pedidos/pedidos';
import { Productos } from './pages/admin/productos/productos';
import { Promociones } from './pages/admin/promociones/promociones';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { EmpleadoStock } from './pages/empleado/empleado-stock/empleado-stock';
import { EstadoP } from './pages/empleado/estado-p/estado-p';
import { GDU } from './pages/empleado/gdu/gdu';
import { FormsModule } from '@angular/forms';
import { authsessionGuard } from './guards/authsession-guard';

export const routes: Routes = [

    // Rutas públicas
    {path: 'home', component: Home},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'auth/login', component: Login},
    {path: 'auth/register', component: Register},

    // Rutas de Cliente (accesibles por todos los roles autenticados)
    {path: 'cliente/cliente-home', component: ClienteHome, canActivate: [authsessionGuard()]},

    {path: 'cliente/calificaciones', component: Calificaciones, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/calificar/:idPedido', component: Calificar, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/carrito', component: Carrito, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/pedidos', component: Pedidos, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/hacer-pedido', component: HacerPedido, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/hacer-pedido/:id', component: HacerPedido, canActivate: [authsessionGuard(['cliente'])]},

    {path: 'cliente/perfil', component: Perfil, canActivate: [authsessionGuard(['cliente'])]},

    // Rutas de Admin (solo admin)
    {path: 'admin/pedidos', component: PedidosAdmin, canActivate: [authsessionGuard(['admin'])]},

    {path: 'admin/productos', component: Productos, canActivate: [authsessionGuard(['admin'])]},

    {path: 'admin/promociones', component: Promociones, canActivate: [authsessionGuard(['admin'])]},

    {path: 'admin/usuarios', component: Usuarios, canActivate: [authsessionGuard(['admin'])]},

    // Rutas de Empleado (solo empleado)
    {path: 'empleado/empleado-stock', component: EmpleadoStock, canActivate: [authsessionGuard(['empleado'])]},

    {path: 'empleado/estado-p', component: EstadoP, canActivate: [authsessionGuard(['empleado'])]},

    {path: 'empleado/gdu', component: GDU, canActivate: [authsessionGuard(['empleado'])]}
];
