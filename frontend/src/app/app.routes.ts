import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { SaleComponent } from './components/sale/sale.component';
import { ReportComponent } from './components/report/report.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ReceiptDetailsComponent } from './components/receipt-details/receipt-details.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/home/product',
        pathMatch:'full'
    },{
        path:'login',
        component:LoginComponent,
        /*canActivate: [authenticatedGuard]*/
    },{
        path:'home',
        component:HomeComponent,
        /*canActivate: [authGuard]*/
    },{
        path:'home/product',
        component:ProductComponent,
        /*canActivate: [authGuard]*/
    },{
        path:'home/receipt',
        component:ReceiptComponent,
        /*canActivate: [authGuard]*/
    },{
        path:'home/receipt-details',
        component:ReceiptDetailsComponent,
        canActivate: [authGuard]
    },{
        path:'home/report',
        component:ReportComponent,
        canActivate: [authGuard]
    },{
        path:'home/report-details',
        component:ReportDetailsComponent,
        canActivate: [authGuard]
    },{
        path:'home/sale',
        component:SaleComponent,
        /*canActivate: [authGuard]*/
    }
];
