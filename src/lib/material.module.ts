import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatMenuModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatRadioModule,
  MatRippleModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  exports: [
    TextFieldModule,
    MatButtonModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSlideToggleModule,
    PortalModule,
    FlexLayoutModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule
  ]
})
export class MaterialModule {}
