import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Storage } from "@ionic/storage";
import { w3, collateral } from '../web3/w3.js';

import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage extends RouterPage implements OnInit, OnDestroy {

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
      let loaner = collateral.loaner();
      if (account === loaner) {
        this.items = ['Cryptobox 1 loan'];
      }
    });
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.router.navigateByUrl('tabs/(loans:loan/' + item + ')');
  }

}
