import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [AutocompleteComponent]
})
export class ComponentsModule {}
