import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BdService } from '../../service/bd/bd.service';
import Swal from 'sweetalert2';

interface Client {
  bdClientId: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
}

@Component({
  selector: 'app-client-bd',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-bd.component.html',
  styleUrl: './client-bd.component.css',
})
export class ClientBdComponent {
  clients: Client[] = [];
  constructor(private bdService: BdService) {}

  ngOnInit() {
    this.bdService.getClient().subscribe({
      next: (res: any) => {
        this.clients = res.data;
      },
    });
  }

  doDelete(id: string) {
    this.bdService.deleteClient(id).subscribe({
      next: (res) => {
        console.log('Client deleted successfully:', res);
        Swal.fire('Success', 'Client deleted successfully', 'success');
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error deleting client:', err);
        Swal.fire(
          'Error',
          'Failed to delete client. Please try again later.',
          'error'
        );
      },
    });
  }
}
