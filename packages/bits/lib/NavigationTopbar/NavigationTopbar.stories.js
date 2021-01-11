import { storiesOf } from '@storybook/vue'
import NavigationTopbar from './NavigationTopbar.vue'

storiesOf('NavigationTopbar', module)
  .add('normal', () => ({
    components: { NavigationTopbar },
    template:
    `
    <navigation-topbar :nav-items="topbarItems" :brand-image="brandImage">
      <template v-slot:user-actions-desktop>
        <b-button variant="danger">Button</b-button>
      </template>
      <template v-slot:user-actions-mobile-dropdown>
        <b-button variant="success">Button</b-button>
      </template>
      <template v-slot:user-actions-mobile-bar>
        <b-button variant="info">Button</b-button>
      </template>
    </navigation-topbar>
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