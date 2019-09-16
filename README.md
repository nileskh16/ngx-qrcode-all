# **ngx-qrcode-all**

The module is developed for producing or scanning the QR(Quick Response) codes inside your angular 6 or ionic 3 applications.
You can use the **ngx-qrcode-all** to generate QR codes through images, urls or canvas or read the QR codes to obtain the decoded information from QR codes inside your application with ease. The module now comes with two modes for scanning and generating the QR codes each with QR code **generation** as the default active mode.

## How to install **ngx-qrcode-all**
To use **ngx-qrcode-all** inside your project, install it via npm: 
```sh
$ npm install ngx-qrcode-all --save
```

## How to use **ngx-qrcode-all**
In order to use the **ngx-qrcode-all** module, you will have to first import QrCodeAllModule from **ngx-qrcode-all** module

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeAllModule } from 'ngx-qrcode-all';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        CommonModule,
        QrCodeAllModule
    ],
    declarations: [
        AppComponent
    ]
})
export class AppModule {
    constructor() {}
}
```

Then inside your component template,
1. QR Code Generation mode
```html
<div id="qrcodeid">
    <qr-code-all [qrCodeType]="url" 
        [qrCodeValue]="'SK is the best in the world!'"
        [qrCodeVersion]="'1'"
        [qrCodeECLevel]="'M'"
        [qrCodeColorLight]="'#ffffff'"
        [qrCodeColorDark]="'#000000'"
        [width]="11"
        [margin]="4"
        [scale]="4"
        [scanQrCode]="false">
    </qr-code-all>
</div>
```
2. QR Code Scanning mode
```html
<div id="qrcodeid">
    <qr-code-all [canvasWidth]="640"
        [canvasHeight]="480"
        [debug]="false"
        [stopAfterScan]="true"
        [updateTime]="500"
        (onCapture)="captureImage($event)"
        [scanQrCode]="true">
    </qr-code-all>
</div>
```

## Component Properties
- For QR Code Generation mode
- _qrCodeValue_: Actual value for which you are generating the QR code.
- _qrCodeType_: Specify this option if it is of 'url', 'img' or 'canvas' type.
- _qrCodeVersion_: Specify version of QR code of '1' through '40'.
- _qrCodeECLevel_: QR Code error correction level('L', 'M', 'H', 'Q').
- _qrCodeColorLight_: The light color inside your QR code image
- _qrCodeColorDark_: The dark color inside your QR code image

- For QR code scanning mode
- _canvasWidth_: The QR scanning window width you want to set.
- _canvasHeight_: The QR scanning window height you want to set.
- _debug_: Set debug mode for the application
- _stopAfterScan_: Set if you want to stop scanning after decoding QR code.
- _updateTime_: Time interval in milliseconds of capturing consecutive QR code frames.
- _onCapture_: The event on succssful identification of QR code.

- For switching between QR code **generation** and **scanning** modes
- _scanQrCode_: Set to true to turn Scanning mode on else generation mode

## Report Issues
If you find any bug or an issue, then please report it on [**ngx-qrcode-all** issue link](https://github.com/nileskh16/ngx-qrcode-all/issues "ngx-qrcode-all issues")


## License
MIT.
