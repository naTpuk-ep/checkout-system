import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityComponent<T> implements ControlValueAccessor {
  @Input() item!: T;

  controlValue: T[] = [];
  private onChange!: (_: T[]) => void;

  constructor(@Self() private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  plusClick() {
    this.controlValue.push(this.item);
    this.onChange([...this.controlValue]);
  }

  minusClick() {
    this.controlValue.pop();
    this.onChange([...this.controlValue]);
  }

  writeValue(value: T[]) {
    this.controlValue = [...value];
  }
  registerOnChange(fn: (_: T[]) => void) {
    this.onChange = fn;
  }
  registerOnTouched() {}
}
