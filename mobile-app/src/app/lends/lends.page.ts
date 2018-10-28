import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';

import { Storage } from "@ionic/storage";
import { w3, collateral } from '../web3/w3.js';

import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-lends',
  templateUrl: './lends.page.html',
  styleUrls: ['./lends.page.scss'],
})
export class LendsPage extends RouterPage implements OnInit, OnDestroy {

  items = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage
  ) {
    super(router, route);
   }

  ngOnInit() {
    
  }

  onEnter() {
    console.log('My page enter');
    console.log(this.items);
    this.items = [];
    this.storage.get('account').then(account => {
      let broker = collateral.broker();
      if (account === broker) {
        this.items = ['Cryptobox 1 lend'];
      }
    });
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.router.navigateByUrl('tabs/(lends:lend/' + item + ')');
  }

  createLend() {
    this.router.navigateByUrl('create-lend');
  }

}
