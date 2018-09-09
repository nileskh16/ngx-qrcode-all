import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeAllComponent } from './qrCodeAll.component';

@NgModule({
    declarations: [
        QrCodeAllComponent
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