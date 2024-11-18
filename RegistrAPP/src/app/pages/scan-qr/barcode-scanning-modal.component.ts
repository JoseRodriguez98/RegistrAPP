import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-barcode-scanning',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="tertiary">
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div #square class="square"></div>
      <ion-fab
        *ngIf="isTorchAvailable"
        slot="fixed"
        horizontal="end"
        vertical="bottom"
      >
        <ion-fab-button (click)="toggleTorch()">
          <ion-icon name="flashlight"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        --background: transparent;
      }

      .square {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        width: 200px;
        height: 200px;
        border: 6px solid white;
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class BarcodeScanningModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public formats: BarcodeFormat[] = [];
  @Input()
  public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square')
  public squareElement: ElementRef<HTMLDivElement> | undefined;

  public isTorchAvailable = false;

  constructor(
    private readonly ngZone: NgZone,
    private modalController: ModalController
  ) { }

  public ngOnInit(): void {
    BarcodeScanner.isTorchAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.startScan();
    }, 250);
  }

  public ngOnDestroy(): void {
    
  }

  public async closeModal(barcode?: Barcode): Promise<void> {
    this.modalController.dismiss({ barcode });
  }

  public async toggleTorch(): Promise<void> {
    await BarcodeScanner.toggleTorch();
  }

  private async startScan(): Promise<void> {
    // Detecta el tipo de dispositivo
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(navigator.userAgent || '');
    const lensFacing = isMobile ? LensFacing.Back : LensFacing.Front;
  
    // Solicita los permisos necesarios
    const permissionStatus = await BarcodeScanner.checkPermissions();
    if (permissionStatus.camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }
  
    // Configura las opciones de escaneo
    const options: StartScanOptions = {
      formats: this.formats,
      lensFacing: lensFacing,
    };
  
    // Inicia el escaneo
    const listener = await BarcodeScanner.addListener('barcodeScanned', async (event) => {
      this.ngZone.run(() => {
        listener.remove();
        this.closeModal(event.barcode);
      });
    });
  
    await BarcodeScanner.startScan(options);
  }
  
  
}
