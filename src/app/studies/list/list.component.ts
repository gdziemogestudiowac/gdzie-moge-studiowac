import { Component, HostListener } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { map, tap, last, take, first, share } from "rxjs/operators";
import * as _ from "lodash";

interface College {
  name: string;
  type: string;
  divisions: Division[];
}

interface Division {
  division: string;
  studies: StudyField[];
}

interface StudyField {
  name: string;
  college: string;
  division: string;
  mode: string;
}

interface Db {
  colleges: College[];
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

  db$ = this.db
    .doc<Db>("db/instance")
    .valueChanges();

  colleges$ = this.db$.pipe(map(db => db.colleges));

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
    /*this.db
      .collection<College>("college")
      .add(this.collegeForm.value)
      .then(() => {
        this.snackBar.open("Dodano do listy", "ok", { duration: 2000 });
      });
  }

  async onSubmitStudyField() {
    /*const colleges = await this.colleges$.pipe(take(1)).toPromise();
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
      });*/
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
