import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {

  constructor(private http:HttpClient) { }

    getAllClients():Observable<Array<Client>>{
      return this.http.get<Client[]>("http://localhost:8085/api/clients");
    }

    getAllclientsByName(keyword : string):Observable<Array<Client>>{
      return this.http.get<Client[]>("http://localhost:8085/api/clients/search?search="+keyword);

    }
      deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8085/api/clients/${id}`);
      }

      deleteCredit(creditId: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8085/api/credits/${creditId}`);
      }
      addClient(client: { nom: string; email: string }): Observable<Client> {
        return this.http.post<Client>('http://localhost:8085/api/clients', client);
      }
}
