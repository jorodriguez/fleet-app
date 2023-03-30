import { getUsuarioSesion } from '../services/Sesion';


class Http {

    //Singleton de esta clase
    static instance = new Http();

    async get(url) {        
        try {
            
            const sesion =  await getUsuarioSesion();            
            const token = sesion.usuarioSesion.accessToken;

            console.log("TOKEN SEND "+token);

            const req = await fetch(url,{
                method:'GET',
                headers: new Headers({
                        'Authorization':`Bearer ${token}`
                })
            });
            const json = await req.json();            
            console.log(json);
            
            if(json.status == 401){
                throw new Error("Sesion expirada");        
            }

            return json;
        } catch (error) {
            console.log(`http get error url = ${url}`, error);
            throw new Error(error);
        }
    }

    async getRequest(url) {
        try {             
            const sesion =  await getUsuarioSesion();            
            const token = sesion.usuarioSesion.accessToken;

            return fetch(url,{
                method:'GET',
                headers: new Headers({
                        'Authorization':`Bearer ${token}`,
                        'Content-Type': "application/json"
                })
            });
        } catch (error) {
            console.log(`http getRequest error url = ${url}`, error);
            throw new Error(error);
        }
    }


    async postFile(url, bodyFormData) {
        try {

            const sesion =  await getUsuarioSesion();            
            
            const token = sesion.usuarioSesion.accessToken;

            const req = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization':`Bearer ${token}`,       
                    'Content-Type': 'multipart/form-data'                 
                }),
                body: bodyFormData
            });
            const json = await req.json();
            return json;
        } catch (error) {
            console.log(`http postFile form data error url = ${url} `, error);
            throw new Error(error);
        }
    }

    async post(url, body) {
        try {

            const sesion =  await getUsuarioSesion();            
            
            const token = sesion.usuarioSesion.accessToken;

            const req = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization':`Bearer ${token}`,       
                    'Content-Type': "application/json"
                }),
                body: JSON.stringify(body)
            });
            const json = await req.json();
            return json;
        } catch (error) {
            console.log(`http post error url = ${url} `, error);
            throw new Error(error);
        }
    }



    async postRequest(url, body) {
        try {
            const sesion =  await getUsuarioSesion();            
            
            const token = sesion.usuarioSesion.accessToken;

            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization':`Bearer ${token}`,  
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)                
            });                        
        } catch (error) {
            console.log(`http post error url = ${url} body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async put(url, id, body) {
        try {
            const req = fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization':`Bearer ${token}`,      
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)                
            });

            const json = await req.json();
            return json;
        } catch (error) {
            console.log(`http put error url = ${url} id =${id} body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async delete(url, id, body) {
        try {
            const sesion =  await getUsuarioSesion();            
            
            const token = sesion.usuarioSesion.accessToken;

            const req = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization':`Bearer ${token}`,       
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)                
            });

            const json = req.json();
            return json;
        } catch (error) {
            console.log(`http put error url = ${url} id =${id} body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async deleteRequest(url, body) {
        try {
            const sesion =  await getUsuarioSesion();            
            
            const token = sesion.usuarioSesion.accessToken;
            return fetch(`${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization':`Bearer ${token}`,       
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)                
            });                        
        } catch (error) {
            console.log(`http put error url = ${url}  body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

}

export default Http;
