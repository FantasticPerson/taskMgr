import { NgModule,SkipSelf,Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports:[
    HeaderComponent, FooterComponent, SidebarComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent:CoreModule){
    if(parent){
      throw new Error('模块已经存在，不需要再次加载！');
    }
  }
}
