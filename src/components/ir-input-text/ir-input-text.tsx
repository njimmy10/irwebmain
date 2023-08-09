import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'ir-input-text',
})
export class IrInputText {
  @Prop() text;
  @Prop() label = '<label>';
  @Prop() placeholder = '<placeholder>';
  @Prop() required: boolean;
  @Prop() LabelAvailable: boolean = true;
  @Prop() type = 'text';
  @State() valid: boolean;
  @State() initial: boolean = true;

  @Event() textChange: EventEmitter<any>;
  connectedCallback() {}
  disconnectedCallback() {}

  handleInputChange(event) {
    this.initial = false;
    if (this.required) {
      this.valid = event.target.checkValidity();
      const value = event.target.value;
      this.textChange.emit(value);
    } else {
      this.textChange.emit(event.target.value);
    }
  }
  render() {
    let className = 'form-control';
    let label = (
      <div class="input-group-prepend">
        <label class="input-group-text">
          {this.label}
          {this.required ? '*' : ''}
        </label>
      </div>
    );
    if (this.required && !this.valid && !this.initial) {
      className = 'form-control border-danger';
    }

    if (!this.LabelAvailable) {
      label = '';
    }

    return (
      <div class="form-group">
        <div class="input-group">
          {label}
          <input type={this.type} class={className} placeholder={this.placeholder} value={this.text} onInput={this.handleInputChange.bind(this)} required={this.required} />
        </div>
      </div>
    );
  }
}
