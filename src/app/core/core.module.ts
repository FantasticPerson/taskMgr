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
import { AppRoutingModule } from '../app-routing-module'
import {ServicesModule} from '../services/services.module'
import 'hammerjs'
import 'rxjs/add/operator/take'
import '../utils/debug.util'

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule.forRoot()
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports:[
    HeaderComponent, FooterComponent, SidebarComponent,AppRoutingModule,BrowserAnimationsModule
  ],
  providers:[
    {provide:'BASE_CONFIG',useValue:{
      uri:'http://localhost:3000'}
    }
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
