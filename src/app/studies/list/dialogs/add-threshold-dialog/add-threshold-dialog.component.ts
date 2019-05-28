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

  exams = {
    "ustny polski": "UP",
    "ustny nowożytni": "UN",

    "pdst polski": "PP",
    "pdst nowożytni": "PN",

    "pdst mat": "PM",

    "roz. polski": "RP",
    "roz. mat": "RMAT",
    "roz. łac. i kultura": "RLACIK",
    "roz. WOS": "RWOS",
    "roz. INF": "RINF",
    "roz. BIOL": "RBIOL",
    "roz. FIL": "RFIL",
    "roz. HIS": "RHIS",
    "roz. h. sztuki": "RHS",
    "roz. chem": "RCHEM",
    "roz. geo": "RGEO",
    "roz. fiz": "RFIZ",
    "roz. h. muzyki": "RHM",
    "roz. angielski": "RA",
    "roz. niemiecki": "RN",
    "roz. rosyjski": "RR",
    "roz. francuski": "RFR",
    "roz. ukraiński": "RUK",
    "roz. białoruski": "RBIA",
    "roz. hiszpański": "RHISZP",
    "roz. włoski": "RWLOS"
  };

  threshold = {
    year: 2018,
    value: 0,
    formula: ""
  };

  addToFormula(value) {
    this.threshold.formula += value;
  }
}
