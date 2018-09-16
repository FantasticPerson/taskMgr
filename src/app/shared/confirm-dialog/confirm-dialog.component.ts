import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title = ''
  content = ''
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef) { }

  ngOnInit() {
    this.title = this.data.title
    this.content = this.data.content
  }
  onClick(result: boolean) {
    this.dialogRef.close(result)
  }
}
