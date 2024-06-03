import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AccountViewComponent } from '../../account-view/account-view.component';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink, AccountViewComponent],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css',
})
export class TrainerComponent {}
