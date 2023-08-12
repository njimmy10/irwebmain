import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';
import { selectOption } from '../../common/models';

@Component({
  tag: 'ir-select',
})
export class IrSelect {
  @Prop() name: string;
  @Prop() data: selectOption[];
  @Prop() label = '<label>';
  @Prop({ reflect: true, mutable: true }) selectedValue = null;
  @Prop() required: boolean;
  @Prop() LabelAvailable: boolean = true;
  @Prop() firstOption: string = 'Select';
  @Prop() selectStyle: boolean = true;
  @Prop() submited: boolean = false;

  @State() initial: boolean = true;
  @State() valid: boolean = false;
  @Event() selectChange: EventEmitter;

  @Watch('selectedValue')
  watchHandler(newValue: string) {
    if (newValue !== null && this.required) {
      this.valid = true;
    }
  }
  @Watch('submited')
  watchHandler2(newValue: boolean) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }

  componentwillload() {}
  disconnectedCallback() {}
  handleSelectChange(event) {
    if (this.required) {
      this.initial = false;
      this.valid = event.target.checkValidity();
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    } else {
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
  }
  count = 0;

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
    if (this.selectStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }

    if (!this.LabelAvailable) {
      label = '';
    }

    return (
      <div class="form-group">
        <div class="input-group">
          {label}
          <select class={className} onInput={this.handleSelectChange.bind(this)} required={this.required}>
            <option value={null}>{this.firstOption}</option>
            {this.data.map(item => {
              if (this.selectedValue === item.value) {
                return (
                  <option selected value={item.value}>
                    {item.text}
                  </option>
                );
              } else {
                return <option value={item.value}>{item.text}</option>;
              }
            })}
          </select>
        </div>
      </div>
    );
  }
}
