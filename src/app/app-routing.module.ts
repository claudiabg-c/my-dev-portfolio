import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {path: '', redirectTo: 'es/index', pathMatch: 'full'},
  {path: ':lang/index', component: IndexComponent},

  {path: '**', redirectTo: 'es/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
