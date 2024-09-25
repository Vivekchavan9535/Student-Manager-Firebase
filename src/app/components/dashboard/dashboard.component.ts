import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/modal/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private data: DataService, private auth: AuthService) { }

  studentList: Student[] = [];


  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    mobile: ''

  }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  course: string = '';
  mobile: string = '';




  ngOnInit(): void {
    this.getAllStudents()
  }



  resetForm() {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.mobile = '';
    this.course = '';

  }

  selectStudent: Student | null = null



  addStudent() {
    if (this.email == '' || this.firstName == '' || this.lastName == '' || this.mobile == '' || this.course == '') {
      alert("Fill all the input")
      return;
    }
    this.studentObj.id = '';
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;
    this.studentObj.course = this.course;


    this.data.addStudent(this.studentObj)
    this.resetForm()

  }

  getAllStudents() {
    this.data.getAllStudents().subscribe((res) => {
      this.studentList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }

  deleteStudent(student: Student) {
    if (window.confirm("Do you want to delete?")) {
      this.data.deleteStudent(student)
    }
  }

  selectStudentToEdit(student: Student) {
    this.selectStudent = { ...student }
  }

  updateStudent(student: Student) {
    if (student && student.id) {
      this.data.updateStudent(student).then(() => {
        alert("Update Successfull")

      }, err => {
        alert(err.message)
      })

    }
  }


  
  logout() {
    this.auth.logout()
  }




}
