import { Component, OnDestroy, OnInit } from '@angular/core';
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
  clientDialog: boolean = false;
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
  ngOnDestroy(): void {

  }

  save(): void {
    this.submitted = true;
    if (this.clientToUpdate) {
      this.updateClient(this.client);
    }
    this.clientDialog = false;
  }

  private updateClient(clientDto: Client): void {
    if (this.clientToUpdate) {
      this.clientService.updateClient(clientDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
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

  searchClients(event) {
    console.log("client selected is " + event);
    this.filteredData = this.clients.filter(item => item.username.toLowerCase().startsWith(event.toLowerCase()));
  }

  toClient(client: Client) {
    this.router.navigate(['dashboard/pages/clients', client.id]);
  }

  openNew() {
   this.client = new Client();
    this.submitted = false;
    this.clientDialog = true;
  }

  openDialog(client?: Client) {
    this.clientToUpdate = client;
    this.clientDialog = true;
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

}
