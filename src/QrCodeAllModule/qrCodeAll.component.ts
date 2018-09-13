import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'qr-code-all',
    template: `
    <h1>Scan or Create QR Codes in your applications</h1>
    <ng-container [ngSwitch]="scanQrCode">
    <ng-container *ngSwitchDefault>
        <app-qrcode-create [qrCodeType]="qrCodeType"
        [qrCodeVersion]="qrCodeVersion"
        [qrCodeStyle]="qrCodeClass"
        [width]="width"
        [margin]="margin"
        [scale]="scale"
        [qrCodeECLevel]="qrCodeECLevel"
        [qrCodeValue]="qrCodeValue"
        [qrCodeColorLight]="qrCodeColorLight"
        [qrCodeColorDark]="qrCodeColorDark">
        </app-qrcode-create>
    </ng-container>
    <ng-container *ngSwitchCase="true">
        <app-qrcode-scan [canvasWidth]="canvasWidth"
        [canvasHeight]="canvasHeight"
        [debug]="debug"
        [stopAfterScan]="stopAfterScan"
        [updateTime]="updateTime"
        (onCapture)="emitDecodedData($event)">
        </app-qrcode-scan>
    </ng-container>
</ng-container>
    `
})
export class QrCodeAllComponent implements OnInit {

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

    @Input('canvasWidth') canvasWidth: number = 640;
    @Input('canvasHeight') canvasHeight: number = 480;
    @Input('debug') debug: boolean = false;
    @Input('stopAfterScan') stopAfterScan: boolean = true;
    @Input('updateTime') updateTime: number = 500;
    @Input('scanQrCode') scanQrCode: boolean = false;

    @Output('onCapture') onCapture = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        this.setDefaultValues();
    }

    setDefaultValues() {
        if(this.notSafe(this.qrCodeType)) this.qrCodeType = 'url';
        if(this.notSafe(this.qrCodeVersion)) this.qrCodeVersion = '';
        if(this.notSafe(this.qrCodeClass)) this.qrCodeClass = 'qrcodecss';
        if(this.notSafe(this.width)) this.width = 11;
        if(this.notSafe(this.margin)) this.margin = 4;
        if(this.notSafe(this.qrScale)) this.qrScale = 4;
        if(this.notSafe(this.qrCodeECLevel)) this.qrCodeECLevel = 'M';
        if(this.notSafe(this.qrCodeValue)) this.qrCodeValue = 'SK2504 is the best in the world';
        if(this.notSafe(this.qrCodeColorLight)) this.qrCodeColorLight = '#ffffff';
        if(this.notSafe(this.qrCodeColorDark)) this.qrCodeColorDark = '#000000';
        if(this.notSafe(this.canvasWidth)) this.canvasWidth = 640;
        if(this.notSafe(this.canvasHeight)) this.canvasHeight = 480;
        if(this.notSafe(this.stopAfterScan)) this.stopAfterScan = true;
        if(this.notSafe(this.updateTime)) this.updateTime = 500;
    }

    notSafe(variable: any): boolean {
        return (variable === null || variable === undefined);
    }

    emitDecodedData(decoded: string) {
        this.onCapture.emit(decoded);
    }
    
}