import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
})
export class LoansPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  items = [
    'Loan 1',
    'Loan 2',
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.router.navigateByUrl('tabs/(loans:loan/' + item + ')');
  }

}
