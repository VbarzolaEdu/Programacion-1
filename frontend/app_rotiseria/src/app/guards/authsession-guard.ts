import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authsessionGuard = (allowedRoles?: string[]): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
    
    // Verificar si está autenticado
    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }
    
    // Si no se especifican roles, solo verificar autenticación
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    
    // Verificar roles
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.rol;
      
      if (allowedRoles.includes(userRole)) {
        return true;
      }
      
      // Si no tiene permiso, redirigir según su rol
      if (userRole === 'admin') {
        router.navigate(['/admin/usuarios']);
      } else if (userRole === 'empleado') {
        router.navigate(['/empleado/gdu']);
      } else if (userRole === 'cliente') {
        router.navigate(['/cliente/cliente-home']);
      } else {
        router.navigate(['/home']);
      }
      
      return false;
    } catch (error) {
      // Token inválido
      localStorage.removeItem('token');
      router.navigate(['/auth/login']);
      return false;
    }
  };
};
