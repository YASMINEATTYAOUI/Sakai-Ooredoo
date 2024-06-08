import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Client } from 'src/app/demo/models/client';
import { ClientService } from 'src/app/demo/service/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  providers:[MessageService],
})

export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[];
  filteredData: Client[];
  name: any;

  client: Client;
  clientToUpdate: Client;

  selectedClients: Client[];

  messages: Message[];

  totalElements: number = 0;
  tableLoading: boolean = false;

  submitted: boolean = false;

  clientId: any;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    this.getClients();
  }
  ngOnDestroy(): void {}

  getSeverity(status: boolean): string {
    return status ? 'success' : 'danger';
  }

  toggleClient(client: any): void {
    this.clientService.toggleClientStatus(client.id).subscribe({
      next: (updatedClient: any) => {
        client.status = updatedClient.status,
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Updated', life: 2000 })
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Toggling Privilege Failed' }),
      complete: () => { }
    });
  }

  getClients() {
    this.tableLoading = true;
    this.clientService.getClients().subscribe({
      next: (response: any) => {
        this.clients = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.clients;
      },
      error: (e: any) => {
        this.messages = [{ severity: 'error', summary: 'Failed to load Data', detail: 'Server issue' }];
        this.tableLoading = false;
      },
      complete: () => {
        this.tableLoading = false;
      }
    });
  }

  searchClients(query: string): void {
    this.filteredData = this.clients.filter(client =>
      client.username.toLowerCase().includes(query.toLowerCase()) ||
      client.fullName.toLowerCase().includes(query.toLowerCase()) ||
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.phoneNumber.toString().toLocaleLowerCase().includes(query.toLowerCase()) ||
      client.adress.toLowerCase().includes(query.toLowerCase())
     );
  }

  toClient(client: Client) {
    this.router.navigate(['dashboard/pages/clients', client.id]);
  }
}
