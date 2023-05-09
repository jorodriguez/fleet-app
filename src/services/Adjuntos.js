import { Alert } from 'react-native';
import { URL } from './Urls';
import { eliminarSesion, getTokenMensajeria, getUsuarioSesion } from './Sesion';
import Http from '../libs/http';

export const getImageUuid = async(uuid) => {

    console.log(`${URL.ADJUNTOS}`);

    return await Http.instance.get(`${URL.ADJUNTOS}/${uuid}`);
};