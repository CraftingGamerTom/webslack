import { storiesOf } from '@storybook/vue'
import QuickIcon from './QuickIcon.vue'

storiesOf('QuickIcon', module)
  .add('normal', () => ({
    components: { QuickIcon },
    template:
    `
    <QuickIcon :name="'check-icon'" :width="'20'" :size="'1'" viewBox="0 9 32 32" />
    `
  }))