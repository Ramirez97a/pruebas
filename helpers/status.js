module.exports = {
    getStatus: getStatus,
}
const axios = require('axios');

function getStatus(parametro) {


    return new Promise(function (resolve, reject) {
        let url = ` https://ciclonweb.azurewebsites.net/api/request/StatusSolicitudCICOC?numeroSolicitud=${parametro}`;
        // let url =` https://ciclonweb.azurewebsites.net/api/request/StatusSolicitudCICOC?numeroSolicitud=79BC59B7-1CCB-4C18-A90C-B978D2A4949D`;
        axios.get(url).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        })

        // sql tabla cicoreques select top 5 requesid 

    })




}


