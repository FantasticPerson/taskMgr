import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  coverImages = []
  title: string = ""
  form:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<NewProjectComponent>, private oc: OverlayContainer,private fb:FormBuilder) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails
    if(this.data.project){
      this.form = this.fb.group({
        name:[this.data.project.name,Validators.required],
        desc:[this.data.project.desc],
        coverImg:[this.data.img]
      })
      this.title = '修改项目'
    } else {
      this.form = this.fb.group({
        name:['',Validators.required],
        desc:[],
        coverImg:[this.data.img]
      })
      this.title = '创建项目'
    }
  }

  onSubmit({value,valid},ev:Event) {
    ev.preventDefault()
    if(!valid){
      return
    }
    console.log('on submit')
    this.dialogRef.close(value)
  }
}
