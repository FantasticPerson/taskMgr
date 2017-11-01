import { NgModule,SkipSelf,Optional } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpModule } from '@angular/http'
import { MdIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { loadSvgResources } from '../utils/svg.util'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports:[
    HeaderComponent, FooterComponent, SidebarComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent:CoreModule,
  ir:MdIconRegistry,ds:DomSanitizer){
    if(parent){
      throw new Error('模块已经存在，不需要再次加载！');
    }
    loadSvgResources(ir,ds)
  }
}
