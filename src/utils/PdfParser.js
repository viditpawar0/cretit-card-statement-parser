import * as pdfjsLib from 'pdfjs-dist';

export default class PdfParser {
    static #allowCreation = false;
    
    constructor() {
        if (!PdfParser.#allowCreation) {
            throw new Error('Use PdfParser.newParser() to create an instance.');
        }
    }

    #textContent;

    static async newParser(pdfFile, pdfPassword) {
        PdfParser.#allowCreation = true;
        const parser = new PdfParser();
        PdfParser.#allowCreation = false;
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, password: pdfPassword }).promise;
        const page = await pdf.getPage(1);
        parser.#textContent = await page.getTextContent();
        return parser;
    }

    getTextByCoordinates(x1, x2, y1, y2) {
        const filteredItems = this.#textContent.items.filter(item => {
            const [, , , , x, y] = item.transform;
            return x >= x1 && x <= x2 && y >= y1 && y <= y2;
        });
    const extractedText = filteredItems.map(item => item.str).join(' ');
    return extractedText.trim();
    }
}