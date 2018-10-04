import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;
interface Lookup {
  label: string,
  value: string
}
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupComponent),
      multi: true
    }
  ]
})
export class LookupComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  optionsCopy: Lookup[] = [];
  filter: string = '';

  @Input() options: Lookup[] = [];
  @Input() placeholder: string = '';
  @Input() maxLengthFilter: number;
  @Input() disabled: boolean = false;
  @Input() name: string = '';

  @Output() click = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  filterName: string = 'filter_';

  ngOnInit() {
    if (this.name.length == 0)
      this.name = 'lu_' + Math.floor((Math.random() * 100) + 1);
    this.filterName += this.name;
    this.optionsCopy = this.options.slice(0, this.options.length);
  }

  _onChange(selected: string) {
  }

  _onTouched() { }

  clicked() {
    this.click.emit('clicked');
    this._onTouched();
  }

  writeValue(selected: string): void {
    if (selected && selected.length > 0) {
      for (let index = 0; index < this.options.length; index++) {
        const element = this.options[index];
        if (element.value == selected) {
          this.placeholder = element.label;
          this._onChange(element.value);
          break;
        }
      }
    }
  }

  registerOnChange(fn) {
    this._onChange = fn;
  }

  registerOnTouched(fn) {
    this._onTouched = fn;
  }

  filterOptions() {
    this.options = this.optionsCopy.slice(0, this.optionsCopy.length);
    let filtered: Lookup[] = [];
    for (let index = 0; index < this.options.length; index++) {
      const element = this.options[index];
      if (element.label.toLowerCase().indexOf(this.filter.toLowerCase()) != -1)
        filtered.push(element);
    }
    this.options = filtered;
  }

  selectOption(index) {
    event.preventDefault();
    this.writeValue(this.options[index].value);
    this.select.emit(this.options[index].value);
  }

  clearFilter() {
    var dd = $(event.currentTarget).closest('div.dropdown');
    this.filter = '';
    this.filterOptions();
    setTimeout(() => {
      $(dd).find('button').click();
    }, 1);
  }

}
