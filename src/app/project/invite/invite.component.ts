import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  @Input() label
  members: User[] = []
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members]
  }

  onSubmit(ev: Event, { valid, value }) {
    ev.preventDefault()
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members)
  }
}
