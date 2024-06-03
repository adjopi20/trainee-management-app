import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BdService } from '../../../service/bd/bd.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css',
})
export class DetailClientComponent {
  id!: string;
  details: any = {
    bdClientId: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BdService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.bdService.getClientById(this.id).subscribe({
      next: (res) => {
        this.details = res.data;
        console.log(this.details);
      },
      error: (err) => {},
    });
  }

  doEdit() {
    this.router.navigate(['/bd/client/detail', this.id, 'update']);
  }

  createVacant() {
    this.router.navigate(['bd/vacancy/create', this.id]);
  }
}
