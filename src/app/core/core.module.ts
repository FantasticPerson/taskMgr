import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component'
import { loadSvgResources } from '../utils/svg.util'
import { AppRoutingModule } from '../app.routing.module'
import { ServivesModule } from '../servives/servives.module'
import 'hammerjs'
// import '../utils/debug.util'

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServivesModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    {
      provide: "BASE_CONFIG", useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule, ir: MatIconRegistry, ds: DomSanitizer) {
    if (parent) {
      return new Error('模块已经存在，不能再次加载')
    }
    loadSvgResources(ir, ds)
  }
}
