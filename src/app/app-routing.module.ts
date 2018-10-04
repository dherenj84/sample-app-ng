import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GridComponent } from './grid/grid.component';
import { ReportCenterComponent } from './report-center/report-center.component';
import { SomepageComponent } from './somepage/somepage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'somepage/:id', component: SomepageComponent },
  { path: 'reportcenter', component: ReportCenterComponent },
  { path: 'grid', component: GridComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })]
})
export class AppRoutingModule {

}