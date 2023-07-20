const { createBot,
    createProvider,
    createFlow,
    addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const Joi = require("joi");

const validate_datos = Joi.object({
    emial: Joi.string().email(),
    telefono: Joi.string().min(8).required(),
    identificacion: Joi.string().min(9).required(),
});

const flowPrincipal = addKeyword([
    "hola",
    "buenas tardes",
    "buenos dias",
    "buenas",
    "solicitud",
    "Menu",
])
    .addAction(async (ctx, { endFlow }) => {
        nombre = ctx.pushName;
        console.log(nombre);
    })
    .addAnswer(`Hola partir de este momento inicia la conversación con el Bot`)
    .addAnswer([
        `¡Bienvenido a *Sinertica*  `,
        "Mi nombre es Athena 🤖, soy una asistente virtual y estoy para ayudarte en lo que necesités.",
    ])
    .addAnswer(["Digite una opcion: ", "*1.* Ver Status", "*2.* Solicitud"]);

const flowDatos = addKeyword("2")
    .addAnswer(
        "Indica cual es tu email:",
        {
            capture: true,
        },
        (ctx, { fallBack, flowDynamic }) => {
            // if (!ctx.body.includes('@')) return fallBack()
            console.log(" email: ", ctx.body);
            const { error, value } = validate_datos.validate({ prueba: ctx.body });
            if (error) {
                console.log("error");
                return fallBack("Ingrese un formato correcto");
            } else if (value) {
                console.log("funciona");
            }
        }
    )
    .addAnswer(
        "Digite su numero de Telefono:",
        {
            capture: true,
        },
        (ctx, { fallBack }) => {
            telefono = ctx.body;
            const { error, value } = validate_datos.validate({ telefono: ctx.body });
            if (error) {
                console.log("error");
                console.log("error");

                return fallBack("Ingrese un formato correcto");
            } else if (value) {
            } else if (value) {
                console.log("funciona");
            }
        }
    )
    .addAnswer(
        "Digite el numero de cedula: ",
        {
            capture: true,
        },
        (ctx, { fallBack }) => {
            monto = ctx.body;
            const { error, value } = validate_datos.validate({ identificacion: ctx.body });
            if (error) {
                console.log("error");
                console.log("error");
                return fallBack("Ingrese un formato correcto");
            } else if (value) {
            } else if (value) {
                console.log("funciona");
            }
        }
    )
    .addAnswer(["Permitame un moemnto, estamos atendiendo su solicitud"]);




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

