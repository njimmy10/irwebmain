import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ir-checkbox',
  styleUrl: 'ir-checkbox.css',
})
export class IrCheckBox {
  @Prop() name: string;
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() label = '<label>';
  connectedCallback() {
    this.checked;
  }
  disconnectedCallback() {}
  @Event() checkboxChange: EventEmitter<boolean>;
  handleInputChange() {
    this.checked = !this.checked;
    this.checkboxChange.emit(this.checked);
  }
  render() {
    return (
      <label class="check-container">
        <span>{this.label}</span>
        <input type="checkbox" checked={this.checked} onInput={this.handleInputChange.bind(this)} />
        <span class="checkmark"></span>
      </label>
    );
  }
}
