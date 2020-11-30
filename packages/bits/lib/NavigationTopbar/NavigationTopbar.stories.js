import { storiesOf } from '@storybook/vue'
import NavigationTopbar from './NavigationTopbar.vue'

storiesOf('NavigationTopbar', module)
  .add('normal', () => ({
    components: { NavigationTopbar },
    template:
    `
    <navigation-topbar :nav-items="topbarItems" :brand-image="brandImage" />
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
          brandImage: {
            icon: "mobile-icon",
            managedIconLocation: "./icons",
            width: "12",
            size: "2",
            iconType: "managed"
          }
        }
    }
  }))