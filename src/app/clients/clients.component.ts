import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {Client} from '../model/client.model';
import {ClientserviceService} from '../services/clientservice.service';
import {AsyncPipe, CurrencyPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    CurrencyPipe,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  clients$ !:Observable<Client[] | null>
  errormes! : string
  searchformGroup !: FormGroup

  constructor(private clservice : ClientserviceService,private fb:FormBuilder,private router:Router) {
  }

  ngOnInit() {
    this.searchformGroup = this.fb.group(
      {
        search :this.fb.control("")

      }
    )
    this.handleseach()
  }

  getallClients(){
    this.clients$=this.clservice.getAllClients().pipe(
        catchError(err => {
          console.error('Erreur lors du chargement des clients :', err);
          this.errormes = err.message
          return of(null);

        })
    )
  }

  handleseach(){
   let keyword = this.searchformGroup?.value.search
    this.clients$ = this.clservice.getAllclientsByName(keyword).pipe(
      catchError(err => {
        console.error('Erreur lors du chargement des clients :', err);
        this.errormes = err.message
        return of(null);
      }
      )
      )
  }
  deleteClient(id: number) {
    if(confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.clservice.deleteClient(id).subscribe({
        next: () => {
          alert('Client supprimé avec succès');
          this.getallClients();
        },
        error: err => {
          console.error(err);
          alert('Erreur lors de la suppression du client');
        }
      });
    }
  }

  deleteCredit(creditId: number) {
    if(confirm('Voulez-vous vraiment supprimer ce crédit ?')) {
      this.clservice.deleteCredit(creditId).subscribe({
        next: () => {
          alert('Crédit supprimé avec succès');
          this.getallClients();
        },
        error: err => {
          console.error(err);
          alert('Erreur lors de la suppression du crédit');
        }
      });
    }
  }

  goToAddClient() {
    this.router.navigate(['/new-client']); // adapte selon ta route
  }


}
