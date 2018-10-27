import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';
import { w3, collateral } from '../web3/w3.js';
import { Storage } from "@ionic/storage";

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

  constructor(private barcodeScanner: BarcodeScanner, private storage: Storage) { }

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

  test() {    
    console.log(w3.eth.accounts);
    w3.eth.sendTransaction({from: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", to: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", value: 100})
    console.log(collateral);
    
    console.log(collateral.extraCondition())
    this.storage.get('account').then(account => {
      if (account) {
        console.log(account);
        collateral.fireExtraCondition.sendTransaction({from: account})
        console.log(collateral.extraCondition())
      }
    });

        
  }

}
