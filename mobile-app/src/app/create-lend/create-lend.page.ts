import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';
import { w3, collateral } from '../web3/w3.js';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lend',
  templateUrl: './create-lend.page.html',
  styleUrls: ['./create-lend.page.scss'],
})
export class CreateLendPage implements OnInit {

  contract = {
    broker: null,
    loaner: null,
    amountToLoan: null,
    deadlineTimestamp: null,
    deadlineDate: null,
    deadlineTime: null,
    paybackAmount: null,
    vaultState: null,
    vaultAddress: null
  };

  current_date = null;
  current_year = null;

  constructor(private barcodeScanner: BarcodeScanner, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.current_date = new Date().toISOString();
    this.current_year = new Date().getFullYear();
    this.contract.deadlineDate = this.current_date;
    console.log(collateral.extraCondition())
    this.storage.get('account').then(account => {
      if (account) {
        this.contract.broker = account;
      }
    });
  }

  scanLoanerAddress() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.contract.loaner = barcodeData.text;
    })
  }

  scanBoxAddress() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.contract.vaultAddress = barcodeData.text;
    })
  }

  // test() {    
  //   console.log(w3.eth.accounts);
  //   w3.eth.sendTransaction({from: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", to: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", value: 100})
  //   console.log(collateral);
    
  //   console.log(collateral.extraCondition())
  //   this.storage.get('account').then(account => {
  //     if (account) {
  //       console.log(account);
  //       collateral.fireExtraCondition.sendTransaction({from: account})
  //       console.log(collateral.extraCondition())
  //     }
  //   });

        
  // }

  createContract() {
    console.log(this.contract);
    // TODO: Set this.contract.deadlineTimestamp
    
    this.contract.deadlineTimestamp = new Date(this.contract.deadlineDate)

    let [hours, minutes] = this.contract.deadlineTime.split(":").map(Number);
    this.contract.deadlineTimestamp.setHours(hours, minutes);
    this.contract.deadlineTimestamp = Math.round(this.contract.deadlineTimestamp.getTime()/1000);
    console.log(this.contract);

    let res = collateral.initializeCollateral.sendTransaction(
      this.contract.loaner,
      this.contract.amountToLoan,
      this.contract.deadlineTimestamp,
      this.contract.paybackAmount,
      {
        from: this.contract.broker,
        value: this.contract.amountToLoan
      })
    console.log(res);
    this.router.navigateByUrl('/tabs/(wallet:wallet)');
  }

}
