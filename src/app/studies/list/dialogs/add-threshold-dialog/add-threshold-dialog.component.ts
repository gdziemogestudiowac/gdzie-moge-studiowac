import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { StudyField } from "src/app/studies/list/types/studyfield";

@Component({
  selector: "app-add-threshold-dialog",
  templateUrl: "./add-threshold-dialog.component.html",
  styleUrls: ["./add-threshold-dialog.component.scss"]
})
export class AddThresholdDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddThresholdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudyField
  ) {}

  threshold = {
    year: 2018,
    value: 0,
    formula: ""
  };
}
