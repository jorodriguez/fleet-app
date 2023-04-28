
const DEV = true;

const V1="v1";

const BASE = DEV ? `http://192.168.3.110:5000/api` : `http://192.168.3.105:5000/api`;

//nivel gateway
const BASE_VERSION = `2022-07-04 ${DEV ? '$$$DEVELOP$$$':''}`;

export const URL = {    
    BASE:BASE,
    LOGIN : `${BASE}/auth/signin`,
    BASE_VERSION : `${BASE_VERSION}`,    
    VEHICULO:`${BASE}/vehiculo`,    
    CHECKLIST:`${BASE}/checklist`,
    CARACTERISTICAS_CHECKLIST:`${BASE}/caracteristicas_checklist`,
    CATEGORIA_CARACTERISTICAS_CHECKLIST:`${BASE}/categoria_caracteristicas`,
    CAMBIO_CLAVE :`${BASE}/auth_cliente/`,    
    UPDATE_TOKEN:`${BASE}/token_mensajeria`,
    CLIENTE: `${BASE}/cliente/`,
    UPLOAD_PHOTO_CHECKLIST:`${BASE}/checklist/upload`,
    ASIGNACION_VEHICULO:`${BASE}/asignacion`,    
    KILOMETRAJE:`${BASE}/kilometraje`,    
};


