import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';

@Component({
  tag: 'ir-input-text',
})
export class IrInputText {
  @Prop() name: string;
  @Prop() text;
  @Prop() label = '<label>';
  @Prop() placeholder = '<placeholder>';
  @Prop() required: boolean;
  @Prop() LabelAvailable: boolean = true;
  @Prop() type = 'text';
  @Prop() submited: boolean = false;
  @Prop() inputStyle: boolean = true;

  @State() valid: boolean;
  @State() initial: boolean = true;

  @Event() textChange: EventEmitter<any>;
  connectedCallback() {}
  disconnectedCallback() {}

  @Watch('text')
  watchHandler(newValue: string) {
    if (newValue !== '' && this.required) {
      this.valid = true;
    }
  }
  @Watch('submited')
  watchHandler2(newValue: boolean) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }

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
    if (!this.LabelAvailable) {
      label = '';
    }
    if (this.inputStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
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
