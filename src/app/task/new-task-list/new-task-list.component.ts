import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.css']
})
export class NewTaskListComponent implements OnInit {
  title: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef) { }

  ngOnInit() {
    this.title = this.data.title
  }
  onClick(){
    this.dialogRef.close(this.title)
  }
}
