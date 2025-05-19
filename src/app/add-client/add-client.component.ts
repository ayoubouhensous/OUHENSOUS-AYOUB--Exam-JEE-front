import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientserviceService} from '../services/clientservice.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit{


  newCustomerFormGroup !: FormGroup

  constructor(private fb:FormBuilder,private clservice:ClientserviceService,private router:Router) {
  }
  ngOnInit() {
    this.newCustomerFormGroup = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  handlesavecustomer() {
    if (this.newCustomerFormGroup.valid) {
      const clientData = this.newCustomerFormGroup.value;

      this.clservice.addClient(clientData).subscribe({
        next: () => {
          alert('Client ajouté avec succès !');
          this.router.navigate(['/clients']); // redirige vers la liste des clients
        },
        error: err => {
          console.error('Erreur lors de l\'ajout du client', err);
          alert('Erreur lors de l\'ajout du client');
        }
      });
    }
  }

}
