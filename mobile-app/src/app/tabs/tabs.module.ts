import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { HomePageModule } from '../home/home.module';

import { LendsPageModule } from './../lends/lends.module';
import { LoansPageModule } from './../loans/loans.module';
import { WalletPageModule } from './../wallet/wallet.module';
import { ContractPageModule } from './../contract/contract.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AboutPageModule,
    ContactPageModule,
    WalletPageModule,
    LoansPageModule,
    LendsPageModule,
    ContractPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
