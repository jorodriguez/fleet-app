

import { Alert } from 'react-native';
import { URL } from './Urls';
import { eliminarSesion, getTokenMensajeria, getUsuarioSesion } from './Sesion';
import Http from '../libs/http';

export const getAsignacionVehiculo = async () =>{            
    
    console.log(`${URL.ASIGNACION_VEHICULO}`);
    
    return await Http.instance.get(`${URL.ASIGNACION_VEHICULO}/usuario`);
};
