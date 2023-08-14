import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ir-checkbox',
  styleUrl: 'ir-checkbox.css',
})
export class IrCheckBox {
  @Prop() name: string;
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  @Prop() label: string = '<label>';
  @Prop() disabled: boolean = false;
  @Prop() value: string; // Added value property

  @Event() checkboxChange: EventEmitter<{ name: string; value: string; checked: boolean }>;

  handleInputChange = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkboxChange.emit({ name: this.name, value: this.value, checked: this.checked });
    }
  };

  render() {
    return (
      <label class="check-container">
        <span>{this.label}</span>
        <input type="checkbox" name={this.name} value={this.value} checked={this.checked} disabled={this.disabled} onInput={this.handleInputChange} />
        <span class="checkmark"></span>
      </label>
    );
  }
}
