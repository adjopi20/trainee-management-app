import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BdService } from '../../../service/bd/bd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.css',
})
export class CreateVacancyComponent {
  id!: string;

  createFrom = new FormGroup({
    bdClientId: new FormControl(''),
    quota: new FormControl(1, [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    position: new FormControl('', [Validators.required]),
  });

  constructor(private bdService: BdService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    console.log(this.id);
  }

  onSubmit() {
    if (this.createFrom.invalid) {
      Swal.fire('Error', 'Please fill in all the required fields', 'error');
      return;
      console.log(this.createFrom.value);
    }
    const data = { ...this.createFrom.value, bdClientId: this.id };

    this.bdService
      .createVacancy(data)
      .pipe()
      .subscribe({
        next: (res) => {
          Swal.fire({
            text: res.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: (err) => {
          Swal.fire({
            text: 'something went wrong',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
  }
}
