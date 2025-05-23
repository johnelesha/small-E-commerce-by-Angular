import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iti-tracks',
  imports: [FormsModule],
  templateUrl: './iti-tracks.component.html',
  styleUrl: './iti-tracks.component.css'
})
export class ItiTracksComponent {
  department: string = 'All';

  itiTracks: { id: number; name: string; department: string }[];
  filteredTracks: { id: number; name: string; department: string }[];
  constructor() {
    this.itiTracks = [
      { id: 1, name: "Frontend Basics", department: "SD" },
      { id: 2, name: "Java OOP", department: "Java" },
      { id: 3, name: "UI Design Principles", department: "Design" },
      { id: 4, name: "Spring Boot Intro", department: "Java" },
      { id: 5, name: "UX Fundamentals", department: "Design" },
      { id: 6, name: "Backend Essentials", department: "SD" },
      { id: 7, name: "Advanced JavaScript", department: "SD" },
      { id: 8, name: "Design Systems", department: "Design" },
      { id: 9, name: "Database Design", department: "Java" },
      { id: 10, name: "Agile UI Workflows", department: "Design" },
      { id: 11, name: "TypeScript with Angular", department: "SD" },
      { id: 12, name: "Java Testing Tools", department: "Java" },
      { id: 13, name: "Figma for Designers", department: "Design" },
      { id: 14, name: "REST APIs with Node", department: "SD" },
      { id: 15, name: "Clean Code in Java", department: "Java" },
    ];
    this.filteredTracks = this.itiTracks;
  }

  filterByDepartment() {
    this.filteredTracks =
      this.department == 'All'
        ? this.itiTracks
        : this.itiTracks.filter(
          (track) =>
            track.department.toLowerCase() == this.department.toLowerCase()
        );
  }
}
