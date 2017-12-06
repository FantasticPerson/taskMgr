import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss']
})
export class ImageListSelectComponent implements OnInit {
  @Input() cols=6;
  @Input() rowHight='64px'
  @Input() title="选择"
  @Input() items:string[]=[]
  @Input() useSvgIcon:boolean=false;
  @Input() itemWidth='80px'
  selected:string
  constructor() { }

  ngOnInit() {
  }

  onChange(i){
    this.selected = this.items[i]
  }

}
