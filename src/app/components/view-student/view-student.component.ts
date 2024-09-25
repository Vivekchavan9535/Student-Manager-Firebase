import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/modal/student';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  student_id: string | null = null;
  student: Student | null = null; 

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to route parameters and fetch student_id
    this.route.paramMap.subscribe(params => {
      this.student_id = params.get('student_id');
      
      // Only fetch student details if student_id is present
      if (this.student_id) {
        this.getStudentDetails(this.student_id);
      }
    });
  }

  // Method to fetch student details
  getStudentDetails(student_id: string){
    this.data.getSingleStudent(student_id).subscribe(
      (doc) => {
        if (doc.payload.exists) {
          const studentData = doc.payload.data() as Student | undefined;
          if (studentData) {
            // Assign the ID separately only if it's not part of the data
            this.student = studentData;
            this.student.id = doc.payload.id;
          }
        } else {
          console.error('Student not found');
        }
      },
      (error) => {
        console.error('Error fetching student details', error);
      }
    );
  }
  
  
}
