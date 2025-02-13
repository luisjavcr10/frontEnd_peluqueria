import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const GenerateInvoice = (saleData)=>{
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    }

    pdfMake.createPdf(docDefinition).open();
};

export default GenerateInvoice;