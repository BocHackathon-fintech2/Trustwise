import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  addresses = [
    'address1',
    'address2'
  ]
  selectedAddress;

  constructor() { }

  ngOnInit() {
  }

}
