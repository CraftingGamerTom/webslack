# Quick Icon

Library to handle icons easily [quick-icon](https://github.com/CraftingGamerTom/webslack)

## Install

`npm install @craftinggamertom/quick-icon --save`

or

`yarn add @craftinggamertom/quick-icon`


## Usage

### Code Example
```
  <!-- eslint-disable-next-line vue/attribute-hyphenation -->
  <Icon :name="'image-name'" :width="'20'" :size="dynamicValueExample" :type="'notRequiredItIsHereForLaterSupport'" viewBox="0 9 32 32" />
```

```
import Icon from '@craftinggamertom/quick-icon/QuickIcon.vue'
 
export default {
    components: { Icon }
}
```

### Note:
`viewBox` is a variable that directly manipulates the created svg tag, eslint does not play nice with lowerCamelCase. Eslint is used for auto-formatting, it requires an 'ignore' comment above the line that uses viewBox (shown in the code example).
If using a property that requires lowerCamelCase, that comment is required, otherwise, disregard.


## Develop

This is a mono repository, managed with [lerna](https://lerna.js.org/).

Follow the instructions for the top-level repo.
1. `git clone` this repo & `cd` into it as usual
2. Run `npm install` to install top-level dependencies.


## Run

- `npm run dev`


## Test

- `npm lint` run just eslint
- `npm test` run lint and tests




# Copyright & License

Copyright (c) 2020 CraftingGamerTom - Released under the [MIT license](LICENSE).
