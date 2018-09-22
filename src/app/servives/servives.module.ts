import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { QuoteService } from './quote.service'

@NgModule()
export class ServivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServivesModule,
      providers: [
        QuoteService
      ]
    }
  }
}
