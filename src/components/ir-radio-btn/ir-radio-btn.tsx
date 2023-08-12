import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { selectOption } from '../../common/models';

@Component({
  tag: 'ir-radio-btn',
  styleUrl: 'ir-radio-btn.css',
})
export class MyComponent {
  @Prop({ reflect: true, mutable: true }) selectedValue = null;
  @Prop() data: selectOption[];
  @Prop() disabled: boolean;
  @Event() selectChange: EventEmitter;

  _handleClick(item) {
    this.selectedValue = item.value;
    this.selectChange.emit(this.selectedValue);
  }

  _renderButton(item) {
    return (
      <div>
        <input
          class="state iradio_square-red hover mr-1"
          type="radio"
          onClick={() => this._handleClick(item)}
          value={item.value}
          checked={this.selectedValue === item.value}
          disabled={this.disabled}
        />
        <label>{item.text}</label>
      </div>
    );
  }

  render() {
    return <div>{this.data.map((item) => this._renderButton(item))}</div>;
  }
}
