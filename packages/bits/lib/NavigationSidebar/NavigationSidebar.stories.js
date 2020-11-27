import { storiesOf } from '@storybook/vue'
import NavigationSidebar from './NavigationSidebar.vue'

storiesOf('NavigationSidebar', module)
  .add('normal', () => ({
    components: { NavigationSidebar },
    template:
    `
    <navigation-sidebar :nav-items="navItems" @expandedStateChangeCallback="handleSidebarStateChange" />
    `,
    data() {
        return {
          navItems: [
            {
              title: 'mobile',
              iconType: 'managed',
              managedIconLocation: './icons',
              icon: 'mobile-icon',
              link: '/tests/mobile'
            },
            {
              title: 'server',
              iconType: 'managed',
              managedIconLocation: './icons',
              icon: 'servers-icon',
              link: '/tests/server'
            }
          ],
          isSidebarExpanded: undefined
        }
    },
    methods: {
      handleSidebarStateChange (stateValue) {
        this.isSidebarExpanded = stateValue
      }
    }
  }))