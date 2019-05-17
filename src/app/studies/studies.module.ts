import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudiesRoutingModule } from './studies-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitStudyfieldsComponent } from './list/submit-studyfields/submit-studyfields.component';

@NgModule({
  declarations: [ListComponent, SubmitStudyfieldsComponent],
  imports: [
    CommonModule,
    StudiesRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [ListComponent]
})
export class StudiesModule { }
