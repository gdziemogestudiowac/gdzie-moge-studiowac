import { ComponentsModule } from "src/app/components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudiesRoutingModule } from "./studies-routing.module";
import { ListComponent } from "./list/list.component";
import { MaterialModule } from "src/app/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SubmitStudyfieldsComponent } from "./list/submit-studyfields/submit-studyfields.component";
import { AddThresholdDialogComponent } from './list/dialogs/add-threshold-dialog/add-threshold-dialog.component';

@NgModule({
  declarations: [
    ListComponent,
    SubmitStudyfieldsComponent,
    AddThresholdDialogComponent
  ],
  imports: [
    CommonModule,
    StudiesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ComponentsModule
  ],
  entryComponents: [AddThresholdDialogComponent]
})
export class StudiesModule {}
