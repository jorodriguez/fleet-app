import { getUsuarioSesion, eliminarSesion } from '../services/Sesion';

/* 
TO-FIX: Mejorrar esta parte para cachar la expiracion de sesión, Error boundary no funciona por que se hace en algunos lados se llama con settimeout
*/
import React from 'react'
import { Alert } from 'react-native';
import { navigate } from '@utility/navigation';


/*
Error de expiracion de sesion
    error: "Unauthorized"
    message: "Full authentication is required to access this resource"
    path: "/asignacion/usuario"
    status: 401
    tokenExpired: true
*/

class Http {

    //Singleton de esta clase
    static instance = new Http();

    async get(url) {
        try {

            const token =  await this.getTokenSesion();

            console.log("TOKEN SEND " + token);

            const req = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`
                })
            });

            const json = await req.json();
                        
            this.revisarSesion(json);

            return json;
        } catch (error) {
            console.log(`http get error url = ${url}`, error);
            throw new Error(error);
        }
    }

    async getRequest(url) {
        try {

            const token =  await this.getTokenSesion();

            return fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
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

            const token =  await this.getTokenSesion();

            const req = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }),
                body: bodyFormData
            });
            const json = await req.json();
            
            this.revisarSesion(json);

            return json;
        } catch (error) {
            console.log(`http postFile form data error url = ${url} `, error);
            throw new Error(error);
        }
    }

    async post(url, body) {
        try {

            const token =  await this.getTokenSesion();

            const req = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }),
                body: JSON.stringify(body)
            });
            
            const json = await req.json();
            
            this.revisarSesion(json);
            
            return json;
        } catch (error) {
            console.log(`http post error url = ${url} `, error);
            throw new Error(error);
        }
    }



    async postRequest(url, body) {
        try {

            const token =  await this.getTokenSesion();

            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

            const token =  await this.getTokenSesion();

            const req = fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)
            });

            const json = await req.json();
            
            this.revisarSesion(json);

            return json;
        } catch (error) {
            console.log(`http put error url = ${url} id =${id} body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async delete(url, id, body) {
        try {

            const token =  await this.getTokenSesion();

            const req = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)
            });

            const json = req.json();

            this.revisarSesion(json);

            return json;
        } catch (error) {
            console.log(`http put error url = ${url} id =${id} body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async deleteRequest(url, body) {
        try {
            
            const token =  await this.getTokenSesion();

            return fetch(`${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(`http put error url = ${url}  body =${JSON.stringify(body)}`, error);
            throw new Error(error);
        }
    }

    async revisarSesion(response){

        if (response.status == 401 && response.tokenExpired) {
        
            console.log("LANZANDO ERROR ");
            
            await eliminarSesion();
        
            //navigate("PublicSignIn");            
            navigate("PublicSplash");
            
            //Alert.alert("SESION","SSSS"+json);
            //throw new Error("Sesion expirada");

        }
    }

    async getTokenSesion(){
        
        console.log("@getTokenSesion");
        
        const sesion = await getUsuarioSesion();

        if(!sesion){
            console.log("X no hay sesion en el store - redireccion al login X");
            
            await eliminarSesion();

            navigate("PublicSplash");
            //navigate("PublicSignIn");            
        }

        console.log(" token en sesion "+sesion.usuarioSesion.accessToken)

        return sesion.usuarioSesion.accessToken;

    }

}

export default Http;