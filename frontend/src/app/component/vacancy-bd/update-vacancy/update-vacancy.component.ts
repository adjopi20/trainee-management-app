import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BdService } from '../../../service/bd/bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { StatusService } from '../../../service/status/status.service';

@Component({
  selector: 'app-update-vacancy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-vacancy.component.html',
  styleUrl: './update-vacancy.component.css',
})
export class UpdateVacancyComponent {
  id!: string;
  isLoading: boolean = true;
  isUpdating: boolean = false;
  updateForm!: FormGroup;
  statuses: any[] = [];

  constructor(
    private bdService: BdService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    console.log(this.id);

    this.updateForm = this.fb.group({
      quota: ['', Validators.required],
      description: ['', [Validators.maxLength(200), Validators.required]],
      position: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.statusService.getStatus().subscribe({
      next: (res: any) => {
        this.statuses = res.data;
        console.log(this.statuses);
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

    this.loadClientData(this.id);
  }

  private loadClientData(id: string): void {
    this.bdService.getVacancyById(id).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.updateForm.patchValue({
            quota: res.data.quota,
            description: res.data.description,
            position: res.data.position,
            status: res.data.status,
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

  onSubmit() {
    console.log(this.updateForm.value);
    if (this.updateForm.invalid) {
      Swal.fire('Error', 'Please fill in all the required fields', 'error');
      return;
    }

    this.bdService.updateVacancy(this.id, this.updateForm.value).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Success', 'Vacancy updated successfully', 'success');
        this.router.navigateByUrl(`bd/vacancy/detail/${this.id}`);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
