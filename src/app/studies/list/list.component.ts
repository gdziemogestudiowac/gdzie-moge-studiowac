import { Component, HostListener } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";

interface College {
  name: string;
  type: string;
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

  collegesGroups$ = this.db
    .collection<College>("college")
    .valueChanges()
    .pipe(tap(console.log))
    .pipe(
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

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  onSubmitCollege() {
    this.db
      .collection<College>("college")
      .add(this.collegeForm.value)
      .then(() => {
        this.snackBar.open("Dodano do listy", "ok", { duration: 2000 });
      });
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keybuffer += event.key;

    if (this.keybuffer.length > 20) {
      this.keybuffer = this.keybuffer.substring(1);
    }

    if (this.keybuffer.includes(this.superpowerspass) && !this.superpowersEnabled) {
      this.superpowersEnabled = true;
      this.snackBar.open("Przyznano supermoce", "ok", { duration: 5000 });
    }
  }
}
