import { Component, HostListener } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { map, tap, last, take, first, share } from "rxjs/operators";
import * as _ from "lodash";

interface College {
  name: string;
  type: string;
}

interface StudyField {
  name: string;
  college: string;
  division: string;
  mode: string;
}

function includeDocId(actions) {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
}

function includeStudiesByDivisions(db: AngularFirestore) {
  return (col: Array<any>) => {
    return col.map(doc => ({
      ...doc,
      divisions$: db
        .collection(`college/${doc.id}/studyfields`)
        .valueChanges()
        .pipe(take(1))
        .pipe(
          map(colleges =>
            _(colleges)
              .groupBy((studyfield: StudyField) => studyfield.division)
              .map((value, key) => ({ division: key, studies: value }))
              .value()
          )
        )
    }));
  };
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  superpowersEnabled = false;
  superpowerspass = atob("amFuIHBhdCBpaQ==");
  keybuffer = "";

  colleges$ = this.db
    .collection<College>("college")
    .snapshotChanges()
    .pipe(map(includeDocId))
    .pipe(map(includeStudiesByDivisions(this.db)))
    .pipe(share());

  collegesGroups$ = this.colleges$.pipe(take(1)).pipe(
    map(colleges =>
      _(colleges)
        .groupBy((college: College) => college.type)
        .map((value, key) => ({ type: key, colleges: value }))
        .value()
    )
  );

  collegeForm = this.fb.group({
    name: ["", Validators.required],
    type: ["", Validators.required]
  });

  studyFieldForm = this.fb.group({
    name: ["", Validators.required],
    college: ["", Validators.required],
    division: ["", Validators.required],
    mode: ["", Validators.required]
  });

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  async onSubmitCollege() {
    this.db
      .collection<College>("college")
      .add(this.collegeForm.value)
      .then(() => {
        this.snackBar.open("Dodano do listy", "ok", { duration: 2000 });
      });
  }

  async onSubmitStudyField() {
    const colleges = await this.colleges$.pipe(take(1)).toPromise();
    const studyField: StudyField = this.studyFieldForm.value;
    const selectedCollege = colleges.find(
      college => college.name === studyField.college
    );

    if (!selectedCollege) {
      this.snackBar.open("Nie znaleziono uczelni", "szkoda :(", {
        duration: 4000
      });
      return;
    }

    this.db
      .collection(`college/${selectedCollege.id}/studyfields`)
      .add(studyField)
      .then(() => {
        this.snackBar.open("Dodano kierunek", "ok", { duration: 2000 });
      });
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keybuffer += event.key;

    if (this.keybuffer.length > 20) {
      this.keybuffer = this.keybuffer.substring(1);
    }

    if (
      this.keybuffer.includes(this.superpowerspass) &&
      !this.superpowersEnabled
    ) {
      this.superpowersEnabled = true;
      this.snackBar.open("Przyznano supermoce", "ok", { duration: 5000 });
    }
  }
}
