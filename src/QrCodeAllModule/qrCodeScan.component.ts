import { Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    ElementRef,
    ViewChild,
    Renderer2, 
    EventEmitter
} from '@angular/core';
import { QRCode } from '../lib/qr-decoder/qrcode';

@Component({
    selector: 'app-qrcode-scan',
    template: `
        <ng-container [ngSwitch]="isCanvasSupported">
            <ng-container *ngSwitchDefault>
                <canvas #qrCodeCanvas [hidden]="hideCanvas" [width]="canvasWidth" [height]="canvasHeight"></canvas>
                <div #videoWrapper [style.width]="canvasWidth" [style.height]="canvasHeight"></div>
            </ng-container>
            <ng-container *ngSwitchCase="false">
                <p>You are using an <strong>outdated</strong> browser</p>
            </ng-container>
        </ng-container>
    `,
    styles: [
        ':host video {height: auto, width: 100%}',
        ':host {}'
    ]
})
export class QrCodeScanComponent implements OnInit, OnDestroy, AfterViewInit {

    get isCanvasSupported(): boolean {
        const tempCanvas:HTMLCanvasElement = this.renderer.createElement('canvas');
        return !!(tempCanvas && tempCanvas.getContext && tempCanvas.getContext('2d'));
    }

    set isCanvasSupported(value: boolean) {
        this.isCanvasSupported = value;
    }
    @Input('canvasWidth') canvasWidth: number = 640;
    @Input('canvasHeight') canvasHeight: number = 480;
    @Input('debug') debug: boolean = false;
    @Input('stopAfterScan') stopAfterScan: boolean = true;
    @Input('updateTime') updateTime: number = 500;

    @Output('onCapture') onCapture = new EventEmitter();

    @ViewChild('qrCodeCanvas') canvasRef: ElementRef;
    @ViewChild('videoWrapper') videoRef: ElementRef;
    public qrcode: QRCode;
    public stream: MediaStream | null;
    public gCtx: CanvasRenderingContext2D;
    public videoElement: HTMLVideoElement;
    public stopTimeout: any;
    private hideCanvas: boolean = true;


    constructor(public renderer: Renderer2) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if(this.isCanvasSupported) {
            if(this.debug) console.debug('The canvas is supprted on your browser');
            this.gCtx = this.canvasRef.nativeElement.getContext('2d');
            this.gCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.qrcode = new QRCode();
            if(this.debug) this.qrcode.debug = true;
            this.qrcode.myCallback = (decoded: string) => { this.QrCodeCallback(decoded); };
            this.initCameraComponents();
        }
    }

    ngOnDestroy() {
        
    }

    initCameraComponents() {
        const browser = <any>navigator,
        constraints: MediaStreamConstraints = {
            audio: false,
            video: true
        };

        if(this.stopTimeout) {
            this.stopScanning();
        }

        if(!this.videoElement) {
            this.videoElement = this.renderer.createElement('video');
            this.videoElement.setAttribute('autoplay', 'true');
            this.videoElement.setAttribute('muted', 'true');
            this.renderer.appendChild(this.videoRef.nativeElement, this.videoElement);
        }

        browser.getUserMedia = (browser.getUserMedia || 
            browser.webkitGetUserMedia || 
            browser.mozGetUserMedia || 
            browser.msGetUserMedia);
        browser.mediaDevices.getUserMedia(constraints)
        .then((stream: MediaStream) => {
            this.setStream(stream);
        })
        .catch((err: any) => {
            console.error(err);
            this.isCanvasSupported = false;
        });
    }

    QrCodeCallback(decodedData: string) {
        if(this.stopAfterScan) {
            this.onCapture.next(decodedData);
            this.stopScanning();
        } else {
            this.onCapture.next(decodedData);
            this.stopTimeout = setTimeout(() => this.captureCanvas(), this.updateTime);
        }
    }

    setStream(stream: MediaStream) {
        this.hideCanvas = true;
        this.gCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.stream = stream;
        if(this.videoElement) this.videoElement.srcObject = stream;
        this.stopTimeout = setTimeout(() => this.captureCanvas(), this.updateTime);
    }

    captureCanvas() {
        try {
            this.gCtx.drawImage(this.videoElement, this.canvasWidth, this.canvasHeight);
            this.qrcode.decode(this.canvasRef.nativeElement);
        } catch(e) {
            this.debug && console.error(e);
            this.stopTimeout = setTimeout(() => this.captureCanvas(), this.updateTime);
        }
    }

    stopScanning() {
        if(this.stopTimeout) {
            clearTimeout(this.stopTimeout);
            this.stopTimeout = 0;
        }
        this.hideCanvas = false;
        if(this.stream && this.stream.getTracks().length) {
            this.stream.getTracks().forEach((device) => {
                device && device.enabled && device.stop();
            });
            this.stream = null;
        }
    }

}