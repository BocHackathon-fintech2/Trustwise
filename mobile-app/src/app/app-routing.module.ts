import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  { path: 'loans', loadChildren: './loans/loans.module#LoansPageModule' },
  { path: 'lends', loadChildren: './lends/lends.module#LendsPageModule' },
  { path: 'create-lend', loadChildren: './create-lend/create-lend.module#CreateLendPageModule' },
  { path: 'contract', loadChildren: './contract/contract.module#ContractPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
