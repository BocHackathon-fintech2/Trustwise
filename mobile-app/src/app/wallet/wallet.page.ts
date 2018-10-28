import { Component, OnInit, OnDestroy } from '@angular/core';
import { w3 } from '../web3/w3.js';
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from '@angular/router';

import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage extends RouterPage implements OnInit, OnDestroy {

  addresses = []
  selectedAddress;
  balance = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage
  ) {
    super(router, route);
  }

  ngOnInit() {
    this.addresses = w3.eth.accounts;
    this.addresses.splice(this.addresses.indexOf('0x00335edfc7ee8195ce528c24597d622b12293965'), 1);
    this.storage.get('account').then(account => {
      if (account) {
        this.selectedAddress = account;
      }
    });
  }

  onEnter() {
    console.log('My page enter');
    this.storage.get('account').then(account => {
      if (account) {
        this.balance = w3.eth.getBalance(account)
      }
    });
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  selectAddress() {
    console.log('In selectAddress');
    console.log(this.selectedAddress);
    this.storage.set('account', this.selectedAddress);
    this.balance = w3.eth.getBalance(this.selectedAddress);
  }

}
