import { Component, Prop, h, Event, EventEmitter, State, Watch } from '@stencil/core';
import { selectOption } from '../../common/models';

@Component({
  tag: 'ir-select',
})
export class IrSelect {
  @Prop() data: selectOption[];
  @Prop() label = '<label>';
  @Prop({ reflect: true }) selectedValue = '';
  @Prop() required: boolean;
  @Prop() LabelAvailable: boolean = true;
  @Prop() firstOption: string = 'Select';
  @Prop() selectStyle: boolean = true;

  @State() selected: string;
  @State() initial: boolean = true;
  @Event() selectChange: EventEmitter;

  @Watch('selectedValue')
  watchHandler(newValue: string) {
    this.selected = newValue;
  }

  componentwillload() {
    this.selected = this.selectedValue;
  }
  disconnectedCallback() {}
  handleSelectChange(event) {
    if (this.required) {
      alert('required');
      this.initial = false;
      this.selected = event.target.value;
      this.selectChange.emit(this.selected);
    } else {
      alert('not required');
      this.selected = event.target.value;
      this.selectChange.emit(this.selected);
    }
  }

  render() {
    let className = 'form-control';
    if (this.selected === '' && !this.initial && this.required) {
      className = 'form-control border-danger';
    }

    if (this.selectStyle === false) {
      className = '';
    }

    return (
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">
              {this.label}
              {this.required ? '*' : ''}
            </label>
          </div>
          <select class={className} onInput={this.handleSelectChange.bind(this)} required={this.required}>
            <option value="">{this.firstOption}</option>
            {this.data.map(item => {
              if (this.selected === item.value) {
                console.log(this.selected);
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
