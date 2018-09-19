import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatToolbarModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { DirectiveModule } from '../directive/directive.module'

const MATERIAL_MODULES = [
  MatToolbarModule, MatSidenavModule, MatAutocompleteModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatProgressBarModule, MatRadioModule, MatSelectModule, MatTabsModule,
  MatTooltipModule, MatSlideToggleModule,
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    DirectiveModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    ...MATERIAL_MODULES,
    CommonModule,
    DirectiveModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  declarations: [ConfirmDialogComponent]
})
export class SharedModule { }
