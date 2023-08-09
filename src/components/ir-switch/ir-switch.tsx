import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import 'jquery';
import 'bootstrap-switch';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import $ from 'jquery';
import './jquery-extensions';

@Component({
  tag: 'ir-switch',
})
export class MyComponent {

  @Prop({ mutable: true }) value: boolean = false;
  @Event() valueChange: EventEmitter<boolean>;

  componentId: string = uuidv4();

  componentDidLoad() {
    // Check if jQuery is working
    const testElement = $(`#${this.componentId}`);
    if (testElement.length) {
      console.log('jQuery is working!');
      // Initialize Bootstrap Switch
      testElement.bootstrapSwitch();

      // Add event listener for switch change
      testElement.on('switchChange.bootstrapSwitch', (event, state) => {
        // state will be true if the switch is ON, and false if it's OFF
        console.log('Switch state:', state);
        console.log(event);
        // Call your custom callback function here if needed
        this.onSwitchChangeCallback(state);
      });
    } else {
      console.error('jQuery is not working!');
    }
  }

  onSwitchChangeCallback(state: boolean) {
    this.value = state;
    this.valueChange.emit(this.value);
  }

  render() {
    return (
     <input
      type="checkbox"
      id={this.componentId}
      checked={this.value} />
    )
  }
}
