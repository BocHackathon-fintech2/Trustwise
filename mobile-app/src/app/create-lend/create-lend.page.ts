import { Component, OnInit } from '@angular/core';
import { w3 } from '../web3/w3.js';

@Component({
  selector: 'app-create-lend',
  templateUrl: './create-lend.page.html',
  styleUrls: ['./create-lend.page.scss'],
})
export class CreateLendPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test() {    
    console.log(w3.eth.accounts);
    w3.eth.sendTransaction({from: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", to: "0xe414D4b9b33C5C00fc173dCc8f07d7607faFA6c7", value: 100})
        
  }

}
