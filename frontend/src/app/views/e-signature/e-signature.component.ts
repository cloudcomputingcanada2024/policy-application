import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  NgSignaturePadOptions,
  SignaturePadComponent,
} from '@almothafar/angular-signature-pad';
import { PointGroup } from 'signature_pad';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.css'],
})
export class ESignatureComponent implements AfterViewInit {
  isDrawn = false;
  // public placeholder: PointGroup[] = [];
  @ViewChild('signature')
  public signaturePad!: SignaturePadComponent;
  public signaturePadOption: NgSignaturePadOptions = {
    minWidth: 1,
    canvasWidth: 600,
    canvasHeight: 300,
    penColor: 'black',

    backgroundColor: 'white',
    dotSize: 1,
    maxWidth: 2,
    velocityFilterWeight: 1,
  };

  constructor(private spinner: NgxSpinnerService) {}

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
    this.isDrawn = true;
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }
  clear(): void {
    this.signaturePad.clear();
  }
  saveSVG(): void {
    this.spinner.show();
    setTimeout(() => {
      const data = this.signaturePad.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = data;
      link.download = 'signature.png';
      link.click();
    this.spinner.hide();
    }, 1000);
    
  }
  placeholder: PointGroup[] = [];
  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.fromData(this.placeholder);
    let canvas = this.signaturePad.getCanvas();
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let text = 'Draw Signature _________________________';
      const x = 20;
      const y = canvas.height - 40;
      ctx.font = '24px Arial';
      ctx.fillStyle = 'black';
      // ctx.fillText(text, x, y);
    }
  }
}
