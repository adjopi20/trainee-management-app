import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TrainerService } from '../../service/trainer/trainer.service';

@Component({
  selector: 'app-grades',
  standalone: true,
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements AfterViewInit {
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart<'doughnut', number[], string>;

  ngAfterViewInit() {
    this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Front End', 'Back End', 'Mobile'],
        datasets: [
          {
            label: 'Class Grades',
            data: [89, 90, 78], // Dummy data
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Class Grades Distribution',
          },
        },
      },
    });
  }
}
