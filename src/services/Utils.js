import moment from 'moment';
import "moment/min/locales";
moment.locale("es-mx");


export const fixDecimal = (num) => {
    return parseFloat(num).toFixed(2);
}

export const truncateDecimal = (num) => {
    const places = 2;
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

export const formatCurrency = (value) => {
    //let formateo ='';   
    //if(value && value > 0){
    let val = (value / 1).toFixed(2).replace(',', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //}
    //return formateo;
}



export const formatFecha = (_fecha) => {
    const fecha = _fecha.substring(0, 10);

    const hora = _fecha.substring(11, 16);

    //const fechaCompleta = moment((fecha+" "+hora),"YYYY-MM-DD h:mm");

    //return moment(fechaCompleta, "YYYYMMDD").fromNow();
    return (fecha + " " + hora);
}


export const formatFechaHace = (_fecha) => {

    const fecha = _fecha.substring(0, 10);

    const hora = _fecha.substring(11, 16);

    const fechaCompleta = moment((fecha + " " + hora), "YYYY-MM-DD h:mm");

    return moment(fechaCompleta, "YYYYMMDD").fromNow();

}

export const formatFechaYYYYMMDDHace = (_fecha) => {
    const fecha = _fecha.substring(0, 10);

    return moment(fecha, "YYYYMMDD").fromNow();

}