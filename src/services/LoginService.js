

import { Alert } from 'react-native';
import { URL } from './Urls';
import { eliminarSesion, getTokenMensajeria, getUsuarioSesion } from './Sesion';

export function login(email, password) {
    return fetch(URL.LOGIN,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        });
};

//FIXME: pendiente
export async function cerrarSesion() {    
    try {
        const sesion = await getUsuarioSesion();        
        const tokenMensajeria = await getTokenMensajeria();
        eliminarSesion();        
        return {usuarioSesion:sesion.usuarioSesion,tokenMensajeria};
    } catch (e) {
        return "error al eliminar cerrar sesion " + e;
    }
}

