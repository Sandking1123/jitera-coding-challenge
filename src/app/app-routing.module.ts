import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';
import { TravelOptionsComponent } from './travel-options/travel-options.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full'  },
  { path: 'form', component: FormPageComponent },
  { path: 'traveloptions', component: TravelOptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
