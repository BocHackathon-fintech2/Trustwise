import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lends',
  templateUrl: './lends.page.html',
  styleUrls: ['./lends.page.scss'],
})
export class LendsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  items = [
    'Lend 1',
    'Lend 2',
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.router.navigateByUrl('tabs/(lends:lend/' + item + ')');
  }

  createLend() {
    this.router.navigateByUrl('create-lend');
  }

}
