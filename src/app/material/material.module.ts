import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTreeModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatGridListModule
} from "@angular/material";

const MAT_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTreeModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatGridListModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES
})
export class MaterialModule {}
