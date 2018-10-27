import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage implements OnInit {

  loan = false;
  lend = false;
  state = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let current_url = window.location.href;
    this.loan = current_url.includes(':loan');
    this.lend = current_url.includes(':lend');
  }

}
