import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-bd',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterLink],
  templateUrl: './bd.component.html',
  styleUrl: './bd.component.css'
})
export class BdComponent {

}
