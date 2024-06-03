import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TrainerService } from '../../service/trainer/trainer.service';

@Component({
  selector: 'app-analytyc-trainer',
  standalone: true,
  templateUrl: './analytyc-trainer.component.html',
  styleUrls: ['./analytyc-trainer.component.css'],
})
export class AnalytycTrainerComponent implements AfterViewInit {
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart<'doughnut', number[], string>;
  allGrades: any[] = [];

  constructor(private trainerService: TrainerService) {}

  ngAfterViewInit() {
    this.getGrades();
  }

  getGrades() {
    this.trainerService.analytics().subscribe(
      (res: any) => {
        if (res.data) {
          this.flattenGrades(res.data);
          this.initializeChart(); // Initialize chart after data is fetched and processed
        } else {
          console.error('Unexpected data format', res.data);
        }
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }

  flattenGrades(data: any) {
    this.allGrades = [...data.backend, ...data.frontend, ...data.mobile];
  }

  initializeChart() {
    const averageGrades = this.calculateAverageGrades();
    console.log(averageGrades, 'Calculated Averages');

    this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Front End', 'Back End', 'Mobile'],
        datasets: [
          {
            label: 'Class Grades',
            data: [
              averageGrades.frontend,
              averageGrades.backend,
              averageGrades.mobile,
            ],
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

  calculateAverageGrades() {
    const grades = {
      frontend: this.allGrades
        .filter((grade: any) => grade.status === 'Frontend')
        .map((grade: any) => grade.grade),
      backend: this.allGrades
        .filter((grade: any) => grade.status === 'Backend')
        .map((grade: any) => grade.grade),
      mobile: this.allGrades
        .filter((grade: any) => grade.status === 'Mobile')
        .map((grade: any) => grade.grade),
    };

    const average = (arr: number[]) =>
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    return {
      frontend: average(grades.frontend),
      backend: average(grades.backend),
      mobile: average(grades.mobile),
    };
  }
}
