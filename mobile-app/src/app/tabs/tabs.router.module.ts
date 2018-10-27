import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';

import { LoansPage } from './../loans/loans.page';
import { LendsPage } from './../lends/lends.page';
import { WalletPage } from './../wallet/wallet.page';
import { ContractPage } from '../contract/contract.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(wallet:wallet)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
      },
      {
        path: 'wallet',
        outlet: 'wallet',
        component: WalletPage
      },
      {
        path: 'loans',
        outlet: 'loans',
        component: LoansPage
      },
      {
        path: 'loan/:id',
        outlet: 'loans',
        component: ContractPage
      },
      {
        path: 'lends',
        outlet: 'lends',
        component: LendsPage
      },
      {
        path: 'lend/:id',
        outlet: 'lends',
        component: ContractPage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(wallet:wallet)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
