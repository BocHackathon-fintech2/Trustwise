import { Component, OnInit } from '@angular/core';
import { w3 } from '../web3/w3.js';
import { Storage } from "@ionic/storage";
// import { AndroidPermissions } from '@ionic-native/android-permissions';

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

  constructor(
    private storage: Storage) { }

    // private androidPermissions: AndroidPermissions

    ngOnInit() {
    // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
    // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => )
    // );

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => )
    // );

    this.addresses = w3.eth.accounts;
    this.storage.get('account').then(account => {
      if (account) {
        this.selectedAddress = account;
      }
    });
  }

  selectAddress() {
    console.log('In selectAddress');
    console.log(this.selectedAddress);
    this.storage.set('account', this.selectedAddress);
    
  }

}
