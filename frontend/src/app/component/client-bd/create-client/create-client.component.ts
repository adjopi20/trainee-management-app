import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BdService } from '../../../service/bd/bd.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css',
})
export class CreateClientComponent {
  constructor(private bdService: BdService, private router: Router) {}

  createForm = new FormGroup({
    clientName: new FormControl('', [Validators.required]),
    clientEmail: new FormControl('', [Validators.email, Validators.required]),
    clientAddress: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.createForm.invalid) {
      Swal.fire('Error', 'Please fill in all the required fields', 'error');
      return;
    }

    this.bdService.createClient(this.createForm.value).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Client created successfully', 'success');
        this.router.navigateByUrl('bd/client');
      },
      error: (err) => {
        Swal.fire('Error', 'Client creation failed', 'error');
        this.router.navigateByUrl('bd/client');
      },
    });
  }
}
