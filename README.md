# **ngx-qrcode-all**

The module is developed for producing the QR(Quick Response) codes inside your angular 6 or ionic 3 applications.
You can use the **ngx-qrcode-all** to generate QR codes through images, urls or canvas inside your application with ease.

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
        [scale]="4">
    </qr-code-all>
</div>
```

## Component Properties
- _qrCodeValue_: Actual value for which you are generating the QR code.
- _qrCodeType_: Specify this option if it is of 'url', 'img' or 'canvas' type.
- _qrCodeVersion_: Specify version of QR code of '1' through '40'.
- _qrCodeECLevel_: QR Code error correction level('L', 'M', 'H', 'Q').
- _qrCodeColorLight_: The light color inside your QR code image
- _qrCodeColorDark_: The dark color inside your QR code image

## Report Issues
If you find any bug or an issue, then please report it on [**ngx-qrcode-all** issue link](https://github.com/nileskh16/ngx-qrcode-all/issues "ngx-qrcode-all issues")

## Planned Features
Following features will soon be available to make the module complete:
- Scan and Create QR Code through this module.
- Events for the passing data out to the parent component.
- Performance improvements and issue fixes.

## License
MIT.