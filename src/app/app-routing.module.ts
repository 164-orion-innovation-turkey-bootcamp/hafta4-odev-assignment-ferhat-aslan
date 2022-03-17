import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ContentComponent } from './components/content/content.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { GuardGuard } from './guards/first.guard';

const routes: Routes = [

  {path:"home",component:ContentComponent, canActivate:[GuardGuard]},
  {path:"product/:id",component:DetailsComponent, canActivate:[GuardGuard]},
  {path:"login",component:LoginPageComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"cart",component:CartComponent, canActivate:[GuardGuard]},
  {path:"order",component:OrderComponent, canActivate:[GuardGuard]},
  {path:"profile",component:ProfileComponent, canActivate:[GuardGuard]},
  {path:'', component:ContentComponent, canActivate:[GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
