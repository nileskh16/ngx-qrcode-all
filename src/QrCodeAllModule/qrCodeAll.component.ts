import { Component, OnInit, OnChanges, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
declare var require: any;
const QrCode = require('qrcode');

@Component({
    selector: 'qr-code-all',
    template: '<div [class]="qrCodeClass" #qrCodeDiv></div>'
})
export class QrCodeAllComponent implements OnInit, OnChanges {

    @Input('qrCodeType') qrCodeType: 'url' | 'img' | 'canvas' = 'url';
    @Input('qrCodeVersion') qrCodeVersion: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '' = '';
    @Input('qrCodeStyle') qrCodeClass: 'qrcodecss';
    @Input('width') width: number = 11;
    @Input('margin') margin: number = 4;
    @Input('scale') qrScale: number = 4;
    @Input('qrCodeECLevel') qrCodeECLevel: 'L' | 'M' | 'H' | 'Q' = 'M';
    @Input('qrCodeValue') qrCodeValue: string = 'SK2504 is the best in the world';
    @Input('qrCodeColorLight') qrCodeColorLight: string = '#ffffff';
    @Input('qrCodeColorDark') qrCodeColorDark: string = '#000000';
    @ViewChild('qrCodeDiv') qrCodeDiv: ElementRef;

    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.produceQrCode();
    }

    produceQrCode() {
        if(this.qrCodeValue) {
            switch(this.qrCodeType) {
                case 'canvas':
                    this.createQrCanvas();
                    break;
                case 'img':
                case 'url':
                default:
                    this.createQrUrlImage();
                    break;
            }
        } else {
            return;
        }
    }

    createQrCanvas() {
        const canvasEl: HTMLCanvasElement = this.renderer.createElement('canvas');
        this.toCanvasQr(canvasEl).then((data) => {
            this.renderElement(canvasEl);
        }).catch((error) => {
            console.error(error);
        });
    }

    createQrUrlImage() {
        const imgEl: HTMLImageElement = this.renderer.createElement('img');
        this.toImgUrlQr().then((url: string) => {
            imgEl.setAttribute('src', url);
            this.renderElement(imgEl);
        }).catch((err) => {
            console.error(err);
        });
    }

    toCanvasQr(canvasEl: HTMLCanvasElement) {
        return new Promise((resolve, reject) => {
            QrCode.toCanvas(canvasEl, this.qrCodeValue, {
                version: this.qrCodeVersion,
                errorCorrectionLevel: this.qrCodeECLevel,
                width: this.width,
                margin: this.margin,
                scale: this.qrScale,
                color: {
                    light: this.qrCodeColorLight,
                    dark: this.qrCodeColorDark
                }
            }, (error: any) => {
                error ? reject(error) : resolve('success');
            });
        });
    }

    toImgUrlQr() {
        return new Promise((resolve, reject) => {
            QrCode.toDataURL(this.qrCodeValue, {
                version: this.qrCodeVersion,
                errorCorrectionLevel: this.qrCodeECLevel,
                width: this.width,
                margin: this.margin,
                scale: this.qrScale,
                color: {
                    light: this.qrCodeColorLight,
                    dark: this.qrCodeColorDark
                }
            }, (error: any, url: string) => {
                error ? reject(error) : resolve(url);
            });
        });
    }

    renderElement(element: any) {
        if(this.qrCodeDiv) {
            for(let child of this.qrCodeDiv.nativeElement.childNodes) {
                this.renderer.removeChild(this.qrCodeDiv.nativeElement, child);
            }
            this.renderer.appendChild(this.qrCodeDiv.nativeElement, element);
        }
    }
}