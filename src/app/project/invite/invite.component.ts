import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'zhangsan'
    },
    {
      id: 2,
      name: 'lisi'
    },
    {
      id: 3,
      name: 'wangwu'
    },
    {
      id: 4,
      name: 'zhaoliu'
    },
    {
      id: 6,
      name: 'zhangsan'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

  displayUser(user:{id:any,name:string}) {
    return user ? user.name : ''
  }

  onClose(){
    
  }
}
