import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ResumeService } from '../../service/resume/resume.service'; 
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.css'],
})
export class CvBuilderComponent {
  resume: any = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    email: '',
    skills: [],
    experience: [],
    education: [],
  };

  pdfSrc: string | undefined;

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.loadResume();
  }

  loadResume() {
    forkJoin({
      traineeDetails: this.resumeService.getTraineeDetailById(),
      skills: this.resumeService.getSkillByTraineeDetail(),
      experience: this.resumeService.getExperienceByTraineeDetail(),
      education: this.resumeService.getEducationByTraineeDetail(),
      languages: this.resumeService.getLanguageByTraineeDetail(),
      socialMedia: this.resumeService.getSocialMediaByTraineeDetail(),
    }).subscribe((response) => {
 
      if (response.traineeDetails && response.traineeDetails.data) {
        const data = response.traineeDetails.data;
        this.resume.firstName = data.firstName || '';
        this.resume.lastName = data.lastName || '';
        this.resume.dateOfBirth = data.dateOfBirth || '';
        this.resume.placeOfBirth = data.placeOfBirth || '';
        this.resume.email = data.email || '';
      }

      this.resume.skills =
        response.skills?.data?.map((skill: any) => ({
          skillName: skill.skill || '',
          level: skill.level || '',
        })) || [];

 
      this.resume.experience =
        response.experience?.data?.map((exp: any) => ({
          company: exp.companyName || '',
          position: exp.position || '',
          dates: `${exp.startDate || ''} - ${exp.endDate || ''}`,
          responsibilities: exp.responsibilities || [],
        })) || [];


      this.resume.education =
        response.education?.data?.map((edu: any) => ({
          institution: edu.institutionName || '',
          degree: edu.fieldOfStudy || '',
          dates: edu.graduationYear || '',
          courses: [`CGPA: ${edu.cgpa || 'Not specified'}`],
        })) || [];

    
      this.resume.languages = response.languages?.data || [];

      this.resume.socialMedia = response.socialMedia?.data || [];

      console.log('Resume data loaded', this.resume);
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    // Informasi Pribadi
    doc.setFontSize(12);
    doc.text(`Name: ${this.resume.firstName} ${this.resume.lastName}`, 10, 10);
    // doc.text(`Date of Birth: ${this.resume.dateOfBirth}`, 10, 20);
    doc.text(`Address: ${this.resume.placeOfBirth}`, 10, 20);
    doc.text(`Email: ${this.resume.email}`, 10, 30);

    let y = 50;
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    // Keterampilan
    doc.setFontSize(14);
    doc.text('Skills:', 10, y);
    y += 10;
    doc.setFontSize(12);
    this.resume.skills.forEach((skill: any) => {
      doc.text(`- ${skill.skillName}`, 10, y); 
      y += 10;
    });
    y += 5;
    doc.line(10, y, 200, y);
    y += 10;

    // Pengalaman Kerja
    doc.setFontSize(14);
    doc.text('Experience:', 10, y);
    y += 10;
    doc.setFontSize(12);
    this.resume.experience.forEach((exp: any) => {
      doc.text(`${exp.position} at ${exp.company} (${exp.dates})`, 10, y);
      y += 10;
      exp.responsibilities.forEach((resp: any) => {
        doc.text(`  - ${resp}`, 10, y);
        y += 10;
      });
      y += 5;
    });
    doc.line(10, y, 200, y);
    y += 10;

    // Pendidikan
    doc.setFontSize(14);
    doc.text('Education:', 10, y);
    y += 10;
    doc.setFontSize(12);
    this.resume.education.forEach((edu: any) => {
      doc.text(`${edu.degree} in ${edu.institution} (${edu.dates})`, 10, y);
      y += 10;
      edu.courses.forEach((course: any) => {
        doc.text(`  - ${course}`, 10, y);
        y += 10;
      });
      y += 5;
    });

    const pdfOutput = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfOutput);
    console.log('PDF URL:', pdfURL);
    this.pdfSrc = pdfURL;
    console.log('PDF Source:', this.pdfSrc);
  }

  downloadPDF() {
    if (this.pdfSrc) {
      const link = document.createElement('a');
      link.href = this.pdfSrc;
      link.download = 'resume.pdf';
      link.click();
    } else {
      console.error('PDF source is not available');
    }
  }
}
