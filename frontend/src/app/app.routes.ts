import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductComponent } from './components/product/product.component';
import { SaleComponent } from './components/sale/sale.component';
import { ReportComponent } from './components/report/report.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReceiptDetailsComponent } from './components/receipt-details/receipt-details.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },{
        path:'login',
        component:LoginComponent,
    },{
        path:'home',
        component:HomeComponent,
    },{
        path:'home/product',
        component:ProductComponent,
    },{
        path:'home/receipt',
        component:ReceiptComponent,
    },{
        path:'home/receipt-details',
        component:ReceiptDetailsComponent   ,
    },{
        path:'home/report',
        component:ReportComponent,
    },{
        path:'home/report-details',
        component:ReportDetailsComponent,
    },{
        path:'home/sale',
        component:SaleComponent,
    }
];
