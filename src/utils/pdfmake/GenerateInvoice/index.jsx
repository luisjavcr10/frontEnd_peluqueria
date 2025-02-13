import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "./logoBase64";

// Asigna vfs si existe, de lo contrario, usa un objeto vacío
pdfMake.vfs = pdfFonts?.pdfMake?.vfs || {};

const generateInvoice = (saleData) => {
    const typeProof = (saleData.saleData.idCustomer.length === 8) ? 'BOLETA' : 'FACTURA';
    const head = saleData.saleData;
    const body = saleData.saleDetailsData;
    const divisor = '-'.repeat(150);
    const correo = saleData.correo !==''? saleData.correo : 'No especificado';
    const fecha = new Date(saleData.date);
    const formattedDate = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    const hour = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    console.log(saleData);

    const docDefinition = {
        content: [
            {
                text: 'DAMARIS SALÓN',
                style: 'header',
                alignment: 'center',
                margin:[0, 7, 0, 7],
            },
            {
                text: [
                    'Calle 123, Urb. Barcelona \n',
                    'Trujillo - Perú\n',
                    'Teléfono: 999999999\n',
                    'RUC: 12345678987\n',
                ],
                fontSize: 13,
                alignment: 'center'
            },
            {
                text:[`${typeProof} DE VENTA ELECTRONICA\n`,
                    `${head.idSales}`
                ],
                style:'subheader',
                alignment:'center',
                margin:[0, 7, 0, 7],
            },
            {
                text:`${divisor}`,
                alignment: 'center'
            },
            {
                text:
                [
                    {text:'Nombres de cliente:',bold: true,},` ${head.nameCustomer}\n`,
                    {text:'Nro Documento:',bold: true,},` ${head.idCustomer}\n`,
                    {text:'Correo Electronico:',bold: true,},` ${correo}\n`
                ],
                fontSize: 13,
                alignment: 'start',
                margin: [100, 10, 0, 10],
            },
            {
                text:`${divisor}`,
                alignment: 'center'
            },
            {
                table: {
                    headerRows: 1,
                    body: [
                        [
                            {text:'Item', style:'tableHeader'},
                            {text:'Cantidad', style:'tableHeader'},
                            {text:'Precio Unitario', style:'tableHeader'},
                            {text:'SubTotal', style:'tableHeader'}
                        ],
                        ...body.map(item => [
                            {text: `${item.name}`, alignment: 'left'}, 
                            {text: `${item.quantity}`, alignment: 'right'},
                            {text: `${item.unitPrice}`, alignment: 'right'},
                            {text: `${item.subtotal}`, alignment: 'right'}
                        ]),
                        [
                            {text: 'TOTAL GRAVADO',style:'tableHeader', colSpan: 3, alignment: 'left'},{},{},
                            {text: `${head.totalGravado}`, alignment: 'right'}
                        ],
                        [
                            {text: 'I.G.V.',style:'tableHeader', colSpan: 3, alignment: 'left'},{},{},
                            {text: `${head.igv}`, alignment: 'right'}
                        ],
                        [
                            {text: 'TOTAL',style:'tableHeader', colSpan: 3, alignment: 'left'},{},{},
                            {text: `S/. ${head.total}`,style:'tableHeader', alignment: 'right'}
                        ]
                    ],
                },
                margin: [50, 7, 0, 7],
			    layout: 'headerLineOnly'
            },
            {
                text:`${divisor}`,
                alignment: 'center'
            },
            {
                columns:[
                    {
                        image: `${logo}`, 
                        fit: [100, 100],
			            opacity: 0.5,
                        alignment: 'right'
                    },
                    {
                        text:[
                            {text:'¡Gracias por su visita!\n',bold: true,margin:[3,3,3,3]},
                            {text:'Fecha de emisión:',bold: true,},` ${formattedDate}\n`,
                            {text:'Hora:',bold: true,},` ${hour}\n`,
                            {text:'Forma de pago:',bold: true,},` ${head.methodPayment}\n`,
                        ],
                        margin:[10,0]

                    }
                ]
            }
        ],
        styles:{
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'justify'
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    };

    pdfMake.createPdf(docDefinition).download(`Invoice_${head.idSales}.pdf`);
};

export default generateInvoice;
