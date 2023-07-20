const { createBot,
    createProvider,
    createFlow,
    addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const status = require('./helpers/status');
// const express = require('express');
const { body, validationResult } = require('express-validator');



const flowPrincipal = addKeyword(['hola', 'buenas tardes', 'buenos dias', 'buenas', 'solicitud', 'Menu']).addAction(async (ctx, { endFlow }) => {
    nombre = ctx.pushName;
    console.log(nombre)

})
    .addAnswer(`Hola partir de este momento inicia la conversación con el Bot`)
    .addAnswer([`¡Bienvenido a *Sinertica*  `, 'Mi nombre es Athena 🤖, soy una asistente virtual y estoy para ayudarte en lo que necesités.',])
    .addAnswer(['Digite una opcion: ', '*1.* Ver Status', '*2.* Solicitud'])



//--------------------------prueba api--------------------------------------//
const flowStatus = addKeyword('1')
    .addAnswer('Digite el *numero de solicitud* a solicitar', {
        capture: true,

    })
    .addAnswer(`Permitame un mmento `)
    .addAction(async (ctx, { flowDynamic }) => {
        console.log(ctx.body)
        // console.log(ctx.from)
        // console.log(ctx.pushName)

        status.getStatus(ctx.body).then(resp => {
            // let prueba = [];
            // prueba.push(resp);
            // prueba.forEach(function (datos) {
            //     console.log("prueba status: " + datos.StatusCode);
            //     flowDynamic([{ body: `StatusCode: ${datos.StatusCode}` }, { body: `Status: ${datos.Data.status}` }]);
            // });
            console.log(resp);
            // console.log(prueba);
            var prueba_json1 = JSON.stringify(resp);
            var prueba_json = JSON.parse(prueba_json1);
            console.log("JSON: " + prueba_json.StatusCode);

            return flowDynamic([{ body: `StatusCode: ${prueba_json.StatusCode}` }, { body: `Status: ${prueba_json.Data.Status}` }]);



        })
    })
//--------------------------prueba api--------------------------------------//


const flowDatos = addKeyword('2')
    // .addAnswer('Digite su numero de cédula:', {
    //     capture: true,
    // }, (ctx, { fallBack }) => {
    //     cedula = ctx.body
    //     console.log(' Cedula: ', cedula)
    //     if (cedula == '') {
    //         return fallBack()
    //     }

    // })
    .addAnswer('Indica cual es tu email:', {
        capture: true,
    }, (ctx, { fallBack }) => {
        // if (!ctx.body.includes('@')) return fallBack()
        console.log(' email: ', ctx.body)
        const result = validationResult(ctx.body);
        console.log(result.isEmail());
        // if (body().isEmail()) {
        //     console.log("Formato correcto");
        // }
        // else {
        //     console.log("Formato incorrecto");
        // }


    })

    .addAnswer('Digite su numero de Telefono:', {
        capture: true,
    }, (ctx, { fallBack }) => {
        telefono = ctx.body
        console.log(' Telefono: ', telefono)
        if (telefono == '') {
            return fallBack()
        }

    })
    .addAnswer('Digite el monto a consultar: ', {
        capture: true,
    }, (ctx, { fallBack }) => {
        monto = ctx.body
        console.log(' Monto: ', monto)
        if (monto == '') {
            return fallBack()
        }

    })
    .addAnswer(['Permitame un moemnto, estamos atendiendo su solicitud'])





const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowDatos])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

