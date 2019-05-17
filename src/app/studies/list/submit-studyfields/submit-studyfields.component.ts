import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { College } from "../types/college";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { StudyfieldsSubmitEvent } from './studyfields-submit-event';

@Component({
  selector: "app-submit-studyfields",
  templateUrl: "./submit-studyfields.component.html",
  styleUrls: ["./submit-studyfields.component.scss"]
})
export class SubmitStudyfieldsComponent implements OnInit {
  studyModes = ["stacjonarne", "niestacjonarne"];

  @Input() colleges: College[];

  @Output() submit: EventEmitter<StudyfieldsSubmitEvent> = new EventEmitter();

  collegeControl = new FormControl();

  divisionControl = new FormControl();

  filteredColleges$: Observable<string[]>;

  selectedCollege$: Observable<College>;

  ngOnInit() {
    this.filteredColleges$ = this.collegeControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filterCollege(value.toLowerCase()))
    );

    this.selectedCollege$ = this.collegeControl.valueChanges.pipe(
      map(collegeName => this.getCollegeByName(collegeName))
    );
  }

  getCollegeByName(name: string): College | undefined {
    const collegesNames = this.colleges.map(c => c.name);
    const collegeIndex = collegesNames.indexOf(name);

    return collegeIndex < 0 ? undefined : this.colleges[collegeIndex];
  }

  onSubmitStudyfields(
    college: string,
    division: string,
    mode: string,
    studyfields: string
  ) {
    const event: StudyfieldsSubmitEvent = {
      college,
      division,
      mode,
      studyfields: studyfields.split("\n")
    };
    this.submit.emit(event);
  }

  private _filterCollege(value: string) {
    return this.colleges
      .map(college => college.name)
      .filter(option => option.toLowerCase().includes(value));
  }

  private isExistingDivisionSelected(college: College) {
    return !college
      ? false
      : college.divisions.find(
          division => division.division === this.divisionControl.value
        );
  }
}
