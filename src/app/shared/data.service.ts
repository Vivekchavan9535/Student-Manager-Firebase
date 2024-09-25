import { Injectable } from '@angular/core';
import { Student } from '../modal/student';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addStudent(student: Student) {
    student.id = this.afs.createId()
    this.afs.collection('/Students').add(student)

  }

  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges()
  }

  
  getSingleStudent(studentId: string) {
    return this.afs.doc(`/Students/${studentId}`).snapshotChanges();
  }

  deleteStudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete()
  }

  updateStudent(student: Student) {
    return this.afs.doc('/Students/'+student.id).update(student)
  }

} 
