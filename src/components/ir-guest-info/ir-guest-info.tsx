import { Component, State, Event, EventEmitter, h, Prop, Watch, Listen } from '@stencil/core';
import { selectOption } from '../../common/models';
@Component({
  tag: 'ir-guest-info',
})
export class GuestInfo {
  @State() Modal = {
    firstName: '',
    lastName: '',
    email: '',
    altEmail: '',
    password: '',
    country: '',
    city: '',
    address: '',
    mobile: '',
    additionalNumber: '',
    newsletter: false,
    currency: '',
    language: '',
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    countryValid: false,
    passwordValid: false,
    mobileValid: false,
    additionalNumberValid: false,
    setupData: false,
  };
  @State() gotdata: boolean = false;

  @Event() submitForm: EventEmitter;
  @Event() getSetupData: EventEmitter;

  @Prop({ mutable: true, reflect: true }) setupDataCountries: selectOption[] = null;
  @Prop({ mutable: true, reflect: true }) setupDataCountriesCode: selectOption[] = null;
  @Prop({ reflect: true, mutable: true }) data: any = null;

  componentWillLoad() {
    this.getSetupData.emit();
    console.log('componentWillLoad');
  }

  @Watch('data')
  watchHandler() {
    if (this.data !== null) {
      this.Modal.firstName = this.data.firstName;
      this.Modal.lastName = this.data.lastName;
      this.Modal.email = this.data.email;
      this.Modal.altEmail = this.data.altEmail;
      this.Modal.password = this.data.password;
      this.Modal.country = this.data.country;
      this.Modal.city = this.data.city;
      this.Modal.address = this.data.address;
      this.Modal.mobile = this.data.mobile;
      this.Modal.additionalNumber = this.data.additionalNumber;
      this.Modal.newsletter = this.data.newsletter;
      this.Modal.currency = this.data.currency;
      this.Modal.language = this.data.language;
      this.Modal.firstNameValid = this.data.firstName.trim() !== '' ? true : false;
      this.Modal.lastNameValid = this.data.lastName.trim() !== '' ? true : false;
      this.Modal.emailValid = this.data.email.trim() !== '' ? true : false;
      this.Modal.countryValid = this.data.country !== '' ? true : false;
      this.Modal.passwordValid = this.data.password.trim() !== '' ? true : false;
      this.Modal.mobileValid = this.data.mobile.trim() !== '' ? true : false;
      this.Modal.additionalNumberValid = this.data.additionalNumber.trim() !== '' ? true : false;
      this.gotdata = true;
    } else {
      this.Modal.firstName = '';
      this.Modal.lastName = '';
      this.Modal.email = '';
      this.Modal.altEmail = '';
      this.Modal.password = '';
      this.Modal.country = '';
      this.Modal.city = '';
      this.Modal.address = '';
      this.Modal.mobile = '';
      this.Modal.additionalNumber = '';
      this.Modal.newsletter = false;
      this.Modal.currency = '';
      this.Modal.language = '';
    }
  }

  @Listen('textChange')
  @Listen('checkboxChange')
  @Listen('selectChange')
  handleInputChange(event) {
    alert('handleInputChange');
    const target = event.target;
    const name = target.label;
    if (target.required !== undefined) {
      const nameValid = `${name}Valid`;
      this.Modal[name] = event.detail;
      this.Modal[nameValid] = event.detail.trim() !== '' && event.detail !== null ? true : false;
      console.log(this.Modal[nameValid]);
      console.log(this.Modal[name]);
    } else {
      this.Modal[name] = event.detail;
    }
  }
  @Listen('clickHanlder')
  handleSubmit(e) {
    e.preventDefault();
    if (this.Modal.firstNameValid && this.Modal.lastNameValid && this.Modal.emailValid && this.Modal.countryValid && this.Modal.passwordValid) {
      this.submitForm.emit({
        firstName: this.Modal.firstName,
        lastName: this.Modal.lastName,
        email: this.Modal.email,
        altEmail: this.Modal.altEmail,
        password: this.Modal.password,
        country: this.Modal.country,
        city: this.Modal.city,
        address: this.Modal.address,
        mobile: this.Modal.mobile,
        additionalNumber: this.Modal.additionalNumber,
        newsletter: this.Modal.newsletter,
      });
    }
  }

  render() {
    console.log(this.Modal.country);
    let countries = null;
    let countryPrefix = null;
    if (this.setupDataCountries !== null && this.setupDataCountriesCode !== null) {
      countries = (
        <ir-select
          required
          label={'Country'}
          selectedValue={this.Modal.country.toString()}
          data={this.setupDataCountries.map(item => {
            return {
              value: item.value.toString(),
              text: item.text,
            };
          })}
          firstOption={'...'}
        ></ir-select>
      );

      countryPrefix = (
        <ir-select
          label={'Mobile'}
          selectedValue={this.Modal.additionalNumber}
          data={this.setupDataCountriesCode.map(item => {
            return {
              value: item.value.toString(),
              text: item.text,
            };
          })}
          firstOption={'...'}
          selectStyle={false}
          required
        ></ir-select>
      );
    }

    return [
      <h3>
        <strong>Guest Details</strong>
      </h3>,
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">
            Registration date : <strong>27-jul-2023</strong>
          </h4>
          <a class="heading-elements-toggle">
            <i class="la la-ellipsis-v font-medium-3"></i>
          </a>
          <div class="heading-elements">
            <ul class="list-inline mb-0">
              <li>
                <a data-action="reload">
                  <i class="ft-rotate-cw"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-content collapse show">
          <div class="card-body pt-0">
            <ir-input-text placeholder="" label="First Name" text={this.Modal.firstName} required></ir-input-text>
            <ir-input-text placeholder="" label="Last Name" text={this.Modal.lastName} required></ir-input-text>
            <ir-input-text placeholder="" label="Email" text={this.Modal.email} required></ir-input-text>
            <ir-input-text placeholder="" label="Alternative email" text={this.Modal.altEmail}></ir-input-text>
            <ir-input-text label="Password" placeholder="" type="password" text={this.Modal.password} required></ir-input-text>

            {countries}

            <ir-input-text placeholder="" label="City" text={this.Modal.city}></ir-input-text>
            <ir-input-text placeholder="" label="Address" text={this.Modal.address}></ir-input-text>

            {countryPrefix}

            <ir-input-text put-text LabelAvailable={false} placeholder="" text={this.Modal.mobile} required></ir-input-text>
            <ir-checkbox label="NewsLetter" checked={this.Modal.newsletter}></ir-checkbox>
            <p>
              <strong>Last used:</strong> Language:
              <strong>{this.Modal.language}</strong> --- Currency: <strong>{this.Modal.currency}</strong>
            </p>
            <hr />
            <ir-button text="Save" color="btn-primary"></ir-button>
          </div>
        </div>
      </div>,
    ];
  }
}
