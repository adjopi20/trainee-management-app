import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BdService } from '../../../service/bd/bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
})
export class UpdateClientComponent {
  id!: string;
  isLoading: boolean = true;
  isUpdating: boolean = false;
  updateForm!: FormGroup;

  constructor(
    private bdService: BdService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.updateForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.email, Validators.required]],
      clientAddress: ['', Validators.required],
    });

    this.loadClientData(this.id);
  }

  private loadClientData(id: string): void {
    this.bdService.getClientById(id).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.updateForm.patchValue({
            clientName: res.data.clientName,
            clientEmail: res.data.clientEmail,
            clientAddress: res.data.clientAddress,
          });
          this.isLoading = false;
        } else {
          Swal.fire('Error', 'Client data not found.', 'error');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching client data', err);
        Swal.fire(
          'Error',
          'Failed to load client data. Please try again later.',
          'error'
        );
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    const data = this.updateForm.value;

    this.isUpdating = true;
    this.bdService.updateClient(this.id, data).subscribe({
      next: (res) => {
        console.log('Client updated successfully:', res);
        Swal.fire('Success', 'Client updated successfully', 'success');
        this.router.navigateByUrl(`bd/client/detail/${this.id}`);
      },
      error: (err) => {
        console.error('Error updating client:', err);
        this.isUpdating = false;
        Swal.fire(
          'Error',
          'Failed to update client. Please try again later.',
          'error'
        );
      },
    });
  }
}
