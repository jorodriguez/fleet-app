import { Alert } from 'react-native';
import { URL } from './Urls';
import { eliminarSesion, getTokenMensajeria, getUsuarioSesion } from './Sesion';
import Http from '../libs/http';

export const getUltimoRegistro = async(uuid) => {

    console.log(`${URL.KILOMETRAJE}/vehiculo/${uuid}`);

    return await Http.instance.get(`${URL.KILOMETRAJE}/vehiculo/${uuid}`);
};


export const guardarKilometraje = async(body) => {

    console.log(`${URL.KILOMETRAJE}/vehiculo/${uuid}`);

    return await Http.instance.get(`${URL.KILOMETRAJE}/vehiculo/${uuid}`);
};