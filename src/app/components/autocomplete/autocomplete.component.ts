import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"]
})
export class AutocompleteComponent {
  @Input() options: string[];
  @Output() select = new EventEmitter<string>();

  optionCtrl = new FormControl();

  filteredOptions = this.optionCtrl.valueChanges.pipe(
    startWith(""),
    map(option => (option ? this._filterOptions(option) : this.options.slice()))
  );

  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
