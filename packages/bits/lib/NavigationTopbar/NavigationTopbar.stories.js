import { storiesOf } from '@storybook/vue'
import NavigationTopbar from './NavigationTopbar.vue'

storiesOf('NavigationTopbar', module)
  .add('normal', () => ({
    components: { NavigationTopbar },
    template:
    `
    <navigation-topbar :nav-items="topbarItems" />
    `,
    data() {
        return {
          topbarItems: [
            {
              title: 'home',
              link: '/home'
            },
            {
              title: 'example',
              link: '/example'
            }
          ],
          brandImageSrc: "./brands/example-brand.png"
        }
    }
  }))