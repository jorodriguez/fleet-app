
import AsyncStorage from '@react-native-community/async-storage';


export const getUsuarioSesion = async () => {
  try {
    let valores = await AsyncStorage.multiGet(['usuario', 'userToken']);
    let usuario = valores[0][1];
    let userToken = valores[1][1];
    return { usuarioSesion: JSON.parse(usuario), token: userToken };
  } catch (e) {
    console.log("Error al obtener el usuario en sesion", e);
    throw Error(e);
  }
}

export const setUsuarioSesion = async (login) => {
  console.log("@Guardando en local");
  try {
    await AsyncStorage.multiSet([
      ['logeado', JSON.stringify(!!login.accessToken)],
      ['userToken', JSON.stringify(login.accessToken)],
      ['usuario', JSON.stringify(login)],
      ['login', JSON.stringify(login)]
    ]);
    return true;
  } catch (e) {
    console.log("Error ", e);
    throw Error(e);    
  }
}

export const eliminarSesion = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


export const setTokenMensajeria = async (token) => {
  console.log("SETTTTOKEN "+token);
  await AsyncStorage.setItem('tokenMensajeria', token);
}

export const getTokenMensajeria = async () => {
  let token = await AsyncStorage.getItem('tokenMensajeria');
  console.log("TOKEN "+token);
  return token;
}


export const setPendientesSia = async (pendientes) => {
  await AsyncStorage.setItem('pendientesSia', JSON.stringify(pendientes));
}

export const getPendienteSia = async () => {
  const pendientes = await AsyncStorage.getItem('pendientesSia');
  return JSON.parse(pendientes);
}
