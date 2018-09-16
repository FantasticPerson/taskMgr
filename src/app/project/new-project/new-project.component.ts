import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
title:string=""
  constructor(@Inject(MAT_DIALOG_DATA) private data,private dialogRef:MatDialogRef<NewProjectComponent>,private oc:OverlayContainer) { }

  ngOnInit() {
    console.log(JSON.stringify(this.data))
    this.title = this.data.title
  }

  onClose(){
    this.dialogRef.close('I receive your message')
  }
}
