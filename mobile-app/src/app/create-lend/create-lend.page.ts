import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-lend',
  templateUrl: './create-lend.page.html',
  styleUrls: ['./create-lend.page.scss'],
})
export class CreateLendPage implements OnInit {

  boxAddress = null;
  loanerAddress = null;
  current_date = null;
  current_year = null;

  selected_date = null;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.current_date = new Date().toISOString();
    this.current_year = new Date().getFullYear();
    this.selected_date = this.current_date;
  }

  scanLoanerAddress() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.loanerAddress = barcodeData.text;
    })
  }

  scanBoxAddress() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.boxAddress = barcodeData.text;
    })
  }

}
