import { Routes } from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {AddClientComponent} from './add-client/add-client.component';

export const routes: Routes = [

  {
    path:"clients",component:ClientsComponent
  },
  {
    path:"new-client",component:AddClientComponent
  }
];
