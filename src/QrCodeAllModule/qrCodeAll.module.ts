import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeAllComponent } from './qrCodeAll.component';
import { QrCodeScanComponent } from './qrCodeScan.component';
import { QrCodeCreateComponent } from './qrCodeCreate.component';

@NgModule({
    declarations: [
        QrCodeAllComponent,
        QrCodeScanComponent,
        QrCodeCreateComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        QrCodeAllComponent
    ]
})
export class QrCodeAllModule {
    constructor() {}

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: QrCodeAllModule,
            providers: []
        }
    }
}