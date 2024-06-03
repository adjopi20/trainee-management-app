import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BdService } from '../../service/bd/bd.service';

export interface bdClient {
  clientAddress: string;
  clientEmail: string;
  clientName: string;
}

export interface vacancy {
  bdClient: bdClient;
  quota: number;
  id: string;
  description: string;
  position: string;
  status: string;
}

@Component({
  selector: 'app-vacancy-bd',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './vacancy-bd.component.html',
  styleUrl: './vacancy-bd.component.css',
})
export class VacancyBdComponent {
  vacants: vacancy[] = [];
  constructor(private bdService: BdService) {}

  ngOnInit() {
    this.bdService.getVacancy().subscribe({
      next: (res: any) => {
        this.vacants = res.data;
      },
    });
  }
}
