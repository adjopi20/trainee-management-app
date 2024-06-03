import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BdService } from '../../../service/bd/bd.service';
import { vacancy } from '../vacancy-bd.component';

@Component({
  selector: 'app-detail-vacancy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-vacancy.component.html',
  styleUrl: './detail-vacancy.component.css',
})
export class DetailVacancyComponent {
  id!: string;
  vacant: vacancy = {
    bdClient: {
      clientAddress: '',
      clientEmail: '',
      clientName: '',
    },
    description: '',
    id: '',
    position: '',
    quota: 0,
    status: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BdService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.bdService.getVacancyById(this.id).subscribe({
      next: (res) => {
        this.vacant = { ...res.data, id: this.id };
        console.log(this.vacant);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
