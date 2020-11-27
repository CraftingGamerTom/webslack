import { storiesOf } from '@storybook/vue'
import QuickIcon from './QuickIcon.vue'

storiesOf('QuickIcon', module)
  .add('normal', () => ({
    components: { QuickIcon },
    template:
    `
    <QuickIcon :location="'./icons'" :color="'black'" :name="'check-icon'" :width="'20'" :size="'4'" viewBox="0 0 32 32" />
    `
  }))