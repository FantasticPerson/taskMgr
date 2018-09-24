import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconRegistry,
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDatepickerIntl,
  MAT_DATE_LOCALE
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterStateSerializer } from '@ngrx/router-store';

import { SharedModule } from '../shared';
import { AppRoutingModule } from './app-routing.module';
import { AppEffectsModule } from '../effects';
import { ServicesModule } from '../services';
import { AppStoreModule } from '../reducers';

import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { SidebarComponent } from './components/sidebar';
import { PageNotFoundComponent } from './containers/page-not-found';
import { AppComponent } from './containers/app';

import { loadSvgResources } from '../utils/svg.util';
import { DatepickerI18n } from '../shared/adapters/datepicker-i18n';
import { MD_FNS_DATE_FORMATS } from '../shared/adapters/date-formats';
import { CustomRouterStateSerializer } from '../utils/router.util';
@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [AppComponent, AppRoutingModule],
  providers: [
    { provide: 'BASE_CONFIG', useValue: { uri: 'http://localhost:3000' } },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MD_FNS_DATE_FORMATS },
    { provide: MatDatepickerIntl, useClass: DatepickerI18n },
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    AppComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }
}
