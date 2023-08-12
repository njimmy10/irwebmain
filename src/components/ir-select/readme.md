# ir-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type             | Default     |
| ---------------- | ----------------- | ----------- | ---------------- | ----------- |
| `LabelAvailable` | `label-available` |             | `boolean`        | `true`      |
| `data`           | --                |             | `selectOption[]` | `undefined` |
| `firstOption`    | `first-option`    |             | `string`         | `'Select'`  |
| `label`          | `label`           |             | `string`         | `'<label>'` |
| `name`           | `name`            |             | `string`         | `undefined` |
| `required`       | `required`        |             | `boolean`        | `undefined` |
| `selectStyle`    | `select-style`    |             | `boolean`        | `true`      |
| `selectedValue`  | `selected-value`  |             | `any`            | `null`      |
| `submited`       | `submited`        |             | `boolean`        | `false`     |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `selectChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ir-guest-info](../ir-guest-info)

### Graph
```mermaid
graph TD;
  ir-guest-info --> ir-select
  style ir-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
