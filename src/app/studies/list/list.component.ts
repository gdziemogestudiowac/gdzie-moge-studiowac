import { AddThresholdDialogComponent } from "./dialogs/add-threshold-dialog/add-threshold-dialog.component";
import { Component, HostListener } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatSnackBar, MatDialog } from "@angular/material";
import { take } from "rxjs/operators";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { Db } from "./types/db";
import { College } from "./types/college";
import { Division } from "./types/division";
import { StudyField } from "./types/studyfield";
import { StudyfieldsSubmitEvent } from "./submit-studyfields/studyfields-submit-event";

// TODO: Extract smaller components
// TODO: Extract DB service
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  superpowersEnabled = false;
  showColleges = true;
  superpowerspass = atob("amFuIHBhdCBpaQ==");
  keybuffer = "";

  db: Db;

  colleges: College[];
  selectedCollege = null as College;

  constructor(
    private afStore: AngularFirestore,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    (async () => {
      this.db = await afStore
        .doc<Db>("db/instance")
        .valueChanges()
        .pipe(take(1))
        .toPromise();

      this.colleges = this.db.colleges;
    })();
  }

  openAddThresholdDialog(studyfield) {
    this.dialog
      .open(AddThresholdDialogComponent, {
        data: studyfield
      })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          studyfield.thresholds = [
            ...(studyfield.thresholds || []),
            data
          ];
          this.saveDb("Dodano próg!");
        }
      });
  }

  onCollegeSelected(collegeName: string) {
    this.selectedCollege = this.getCollegeByName(collegeName);
    console.log(this.selectedCollege);
  }

  getCollegeNames() {
    return this.colleges.map(college => college.name);
  }

  sortCollegesByDivisionsLen() {
    this.db.colleges.sort((a, b) => a.divisions.length - b.divisions.length);
  }

  getCollegeByName(name: string): College | undefined {
    const collegesNames = this.colleges.map(c => c.name);
    const collegeIndex = collegesNames.indexOf(name);

    return collegeIndex < 0 ? undefined : this.colleges[collegeIndex];
  }

  getOverallStudiesCount() {
    const sum = (a, b) => a + b;

    return this.colleges
      .map(college =>
        college.divisions.map(division => division.studies.length)
      )
      .reduce((acc, studiesCounts) => acc + studiesCounts.reduce(sum, 0), 0);
  }

  onSubmitStudyfields(event: StudyfieldsSubmitEvent) {
    console.log(event);
    const studyfields = event.studyfields.map(
      (studyfieldName: string): StudyField => {
        const sf: StudyField = {
          college: event.college,
          division: event.division,
          mode: event.mode,
          name: studyfieldName
        };
        return sf;
      }
    );

    const selectedCollege = this.getCollegeByName(event.college);

    if (!selectedCollege) {
      return this.snackBar.open("Nie znaleziono uczelni", "szkoda :(", {
        duration: 4000
      });
    }

    const selectedDivision = selectedCollege.divisions.find(
      division => division.division === event.division
    );

    if (selectedDivision) {
      selectedDivision.studies.push(...studyfields);
    } else {
      const division: Division = {
        division: event.division,
        studies: studyfields
      };
      selectedCollege.divisions.push(division);
    }

    this.saveDb();
  }

  async saveDb(msg = "Zapisano!") {
    try {
      await this.afStore.doc("db/instance").set(this.db);
      this.snackBar.open(msg, "ok", { duration: 2500 });
    } catch {
      this.snackBar.open("Brak uprawnień?", "kurcze", { duration: 3500 });
    }
  }

  deleteStudyfield(division: Division, studyfield: StudyField) {
    if (confirm(`Na pewno usunąć "${studyfield.name} (${studyfield.mode})"?`)) {
      division.studies.splice(division.studies.indexOf(studyfield), 1);
      this.saveDb("Usunięto kierunek!");
    }
  }

  deleteDivision(college: College, division: Division) {
    if (confirm(`Na pewno usunąć "${division.division}"?`)) {
      college.divisions.splice(college.divisions.indexOf(division), 1);
      this.saveDb("Usunięto wydział!");
    }
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keybuffer += event.key;

    if (this.keybuffer.length > 20) {
      this.keybuffer = this.keybuffer.substring(1);
    }

    if (this.keybuffer.includes(this.superpowerspass)) {
      this.unlockSuperpowers();
    }
  }

  handleRotateEnd({ angle }) {
    if (angle > 20) {
      this.unlockSuperpowers();
    }
  }

  unlockSuperpowers() {
    if (!this.superpowersEnabled) {
      this.superpowersEnabled = true;
      this.snackBar.open("Przyznano supermoce", "ok", { duration: 5000 });
    }
  }
}
