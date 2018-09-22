import { Component, OnInit, Inject,ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {
  lists: any[]
  constructor(@Inject(MAT_DIALOG_DATA) private data,private dialogRef:MatDialogRef<CopyTaskComponent>) { }

  ngOnInit() {
    console.log(this.data)
    this.lists = this.data.lists
  }

  onClose(){
    
  }

}
