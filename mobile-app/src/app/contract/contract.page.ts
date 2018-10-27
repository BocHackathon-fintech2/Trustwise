import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';

import { w3, collateral } from '../web3/w3.js';
import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage extends RouterPage implements OnInit, OnDestroy {

  loan = false;
  lend = false;
  state = ''

  contract = {
    broker: null,
    loaner: null,
    amountToLoan: null,
    deadlineTimestamp: null,
    deadlineDate: null,
    deadlineTime: null,
    paybackAmount: null,
    vaultState: null,
    vaultAddress: '0x855DFeD6df01B9d18C21aEE2ADe7bEF2D36240B6'
  };

  states = ['Canceled', 'Available', 'Initialized', 'AgreedAndLocked', 'Confirmed', 'LoanFulfilled'];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private storage: Storage) 
  { 
    super(router, route);
  }

  ngOnInit() {
    this.refreshContent();
  }

  onEnter() {
    this.refreshContent();
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  refreshContent() {
    let current_url = window.location.href;
    this.loan = current_url.includes(':loan');
    this.lend = current_url.includes(':lend');

    this.contract.broker = collateral.broker();
    this.contract.loaner = collateral.loaner();
    this.contract.amountToLoan = collateral.amountToLoan();
    this.contract.deadlineTimestamp = collateral.deadlineTimestamp()*1000
    let date = new Date(this.contract.deadlineTimestamp); 
    this.contract.deadlineDate = date.toLocaleDateString();
    this.contract.deadlineTime = date.toLocaleTimeString().substr(0, 5);
    this.contract.paybackAmount = collateral.paybackAmount();
    this.contract.vaultState = this.states[collateral.vaultState()];

    let extraCondition = collateral.extraCondition();

    this.state = this.contract.vaultState;
  
    let now = new Date();
    if ((this.contract.vaultState == 'Confirmed') && ((date < now) || extraCondition)) {
      this.state = 'Expired';
    }
    console.log("State",this.state);

    if (this.state == 'Available') {
      this.router.navigateByUrl('/tabs/(wallet:wallet)');
    }
  }

  agreeOnConditions() {
    this.storage.get('account').then(account => {
      if (account) {
        let res = collateral.agreeAndLock.sendTransaction(
          {
            from: account
          })
        console.log(res);
        this.refreshContent();
      }
    }); 
  }

  confirm() {
    this.storage.get('account').then(account => {
      if (account) {
        let res = collateral.confirm.sendTransaction(
          {
            from: account
          })
        console.log(res);
        this.refreshContent();
      }
    }); 
  }

  unlock() {
    this.storage.get('account').then(account => {
      if (account) {
        let res = collateral.unlock.sendTransaction(
          {
            from: account
          })
        console.log(res);
        this.refreshContent();
      }
    }); 
  }

  pay() {
    this.storage.get('account').then(account => {
      if (account) {
        let res = collateral.loanFulfill.sendTransaction(
          {
            from: account,
            value: this.contract.paybackAmount
          })
        console.log(res);
        this.refreshContent();
      }
    }); 
  }

  cancel() {
    this.storage.get('account').then(account => {
      if (account) {
        let res = collateral.cancel.sendTransaction(
          {
            from: account
          })
        console.log(res);
        this.refreshContent();
      }
    }); 
  }

}
