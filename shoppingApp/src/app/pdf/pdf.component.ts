import {Component, OnInit} from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {NavController, Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-pdf',
    templateUrl: './pdf.component.html',
    styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
    pdfData = {
        header: '',
        nick: '',
        text: '',
        shoppingListItems: []
    }

    pdfObj = null;
    selectedShoppingList: any;
    shoppingListsFromStorage: ShoppingList[];
    key: string = '';
    displayEmptyListAlert = false;

    constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener, private storage: Storage) {
    }

    ngOnInit() {
        this.readAllListsFromStorage();
    }

    readAllListsFromStorage() {
        this.storage.get('shopping-lists').then((val) => {
            if (val) this.shoppingListsFromStorage = val;
        });
    }

    readSingleListItemsFromStorage() {
        this.storage.get(this.key).then((val) => {
            if (val) {
                this.pdfData.shoppingListItems = val.map(a => a.name);
                if (this.pdfData.shoppingListItems.length > 0) {
                    this.displayEmptyListAlert = false;
                } else {
                    this.displayEmptyListAlert = true;
                }
            }
        });
    }

    createPdf() {
        var t0 = performance.now();
        let docDefinition = {
            content: [
                {text: this.pdfData.header, style: 'header'},
                {text: new Date().toLocaleString("pl-PL"), alignment: 'right'},

                {text: 'Stworzono przez: ', style: 'subheader'},
                {text: this.pdfData.nick},

                {text: 'Lista zakupów: ', margin: [0, 20, 0, 20]},
                {
                    ul: this.pdfData.shoppingListItems, margin: [40, 0, 40, 0]
                },

                {text: this.pdfData.text, style: 'additionalText', margin: [0, 20, 0, 20]}
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0]
                },
                additionalText: {
                    italic: true,
                    width: '50%',
                }
            }
        };
        this.pdfObj = pdfMake.createPdf(docDefinition);
        this.downloadPdf();
        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    }

    downloadPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                let blob = new Blob([buffer], {type: 'application/pdf'});
                this.file.writeFile(this.file.dataDirectory, 'shoppingList.pdf', blob, {replace: true}).then(fileEntry => {
                    this.fileOpener.open(this.file.dataDirectory + 'shoppingList.pdf', 'application/pdf');
                })
            });
        } else {
            this.pdfObj.download();
        }
    }

    select() {
        this.key = this.selectedShoppingList.replace(/ /g, "");
        this.pdfData.header = this.selectedShoppingList;
        this.readSingleListItemsFromStorage();
    }
}
