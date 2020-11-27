<!-- TODO: Take inspiration from
https://startbootstrap.com/previews/sb-admin-2/
https://keenthemes.com/keen/preview/demo1/index.html

TODO: redo the side bar with different sections based on what a person has access too
Ex: QA has QA Sections, Support gets support section, partner gets partner section, etc

TODO: Allow for color variants to dynamically style

TODO: Add dropdown support

TODO: Change this into a component that can have elements defined using an object {title: "example", icon: "fa-example"}

TODO: Store sidebarExpanded in the store and change the wrapper size based on it
-->

<template>
  <ul class="sidebar navbar-nav" :class="{'expanded': sidebarExpanded}">
    <li>
      <button
        class="btn btn-link sidebar-toggle btn-sm order-1 order-sm-0"
        @click="toggleSidebar"
      >
        <font-awesome-icon v-if="sidebarExpanded" icon="angle-left" />
        <font-awesome-icon v-else icon="angle-right" />
      </button>
    </li>
    <li v-for="item in navItems" :key="item.title" :class="amIActive(item.link)" class="nav-item">
      <router-link class="nav-link" :to="item.link">
        <div class="active-indicator" />
        <div class="identifying-information">
          <Icon :name="item.icon" :width="'13'" :size="sidebarIconSize" :type="item.iconType" />
          <span>{{ item.title }}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Icon from '~/components/utils/BlustreamIconCmp.vue'

const sidebarStorageKey = 'nav.sidebar:expanded'

export default {
  components: { Icon },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      sidebarExpanded: (localStorage.getItem(sidebarStorageKey) === 'true')
    }
  },
  computed: {
    sidebarIconSize () {
      return this.sidebarExpanded ? '3' : '3'
    }
  },
  beforeMount () {
    this.$emit('expandedStateChange', this.sidebarExpanded)
  },
  methods: {
    toggleSidebar () {
      this.sidebarExpanded = !this.sidebarExpanded

      this.$emit('expandedStateChange', this.sidebarExpanded)
      if (process.browser) {
        localStorage.setItem(sidebarStorageKey, this.sidebarExpanded)
      }
    },
    amIActive (link) {
      return this.$route.fullPath === link ? 'active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>

// TODO implement drop down css
// .sidebar .nav-item .dropdown-menu {
//   position: absolute !important;
//   -webkit-transform: none !important;
//   transform: none !important;
//   left: calc(90px + 0.5rem) !important;
//   margin: 0;
// }

// .sidebar .nav-item .dropdown-menu.dropup {
//   bottom: 0;
//   top: auto !important;
// }

// .sidebar .nav-item.dropdown .dropdown-toggle::after {
//   display: none;
// }

.sidebar .nav-item .nav-link {
  color: color(text-disabled);
  display: inline-flex;
  padding: 0;

  &:hover {
    color: color(text);

  }

}

svg {
  .nav-item & {
    fill: color(text-disabled);
    padding: 2px;
    transition: padding 0.2s ease;
  }
  .nav-item:hover & {
    fill: color(text);
    padding: 0;
    transition: padding 0.2s ease;
  }
  .nuxt-link-active & {
    fill: color(text);
  }
}

span {
  font-size: 0.65rem;
  display: block;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.125s, color 0.2s;
  transition-timing-function: linear;
  text-transform: uppercase;
  margin-top: 8px;

  .expanded & {
    font-size: 0.65rem;
    display: block;

    visibility: visible;
    opacity: 1;
    transition: opacity 1.2s, color 0.2s;
    transition-timing-function: ease;
    margin-top: 5px;
  }

  .nuxt-link-active & {
    color: color(text);
  }
}

.sidebar {
  @include media-query(extra-small) {
    display: none;
  }
  position: fixed;
  top: 56px;

  display: flex;
  width: 50px;
  background-color: color(nav-accent);
  height: calc(100vh - 56px);

  transition-property: width, padding, display;
  transition: width 0.5s;
  transition-timing-function: ease;

  .sidebar-toggle {
    visibility: hidden;

    color: color(text-disabled);
    float:right;
    padding: 0.1rem 0.5rem;

    &:focus {
      box-shadow: none;
    }
    &:hover {
      color: color(text);
    }
  }

  &:hover .sidebar-toggle {
    visibility: visible;
  }

  .toggled {
    width: 0 !important;
    overflow: hidden;
  }

  & .nav-item:last-child {
    margin-bottom: 2vh;
  }

}

.expanded {
  overflow: visible;
  width: 75px !important;

  & .nav-item .nav-link {
    text-align: center;
    padding: 0;
    width: 100%;

    transition: padding 0.5s ease;
  }
}

.active-indicator {
  background: transparent;
  width: 2px;
  height: 53px;
  display: inline-block;
  transition: width 0.5s ease, height 0.5s ease;

  .nuxt-link-active & {
    background: color(text);
  }
  .expanded & {
    height: 75px;
  }
}

.identifying-information {
  display: inline-block;
  height: 53px;

  width: 48px;
  text-align: center;

  padding: 5% 2px 5% 0;
  transition: width 0.5s ease, height 0.5s ease;

  .nuxt-link-active & {
    background: color(layout-10);
  }
  .expanded & {
    height: 75px;
    width: 73px;
    transition: width 0.5s ease, height .5s ease;
  }
}

@media (min-width: 768px) {

  /* Possibly support dropdown menus in the future */
  /* .sidebar .nav-item .dropdown-menu {
    position: static !important;
    margin: 0 1rem;
    top: 0;
  }
  .sidebar .nav-item.dropdown .dropdown-toggle::after {
    display: block;
  } */

  /* Possibly support dropdown menus in the future */
  /* .expanded .nav-item .dropdown-menu {
    position: absolute !important;
    -webkit-transform: none !important;
    transform: none !important;
    left: calc(90px + 0.5rem) !important;
    margin: 0;
  }
  .expanded .nav-item .dropdown-menu.dropup {
    bottom: 0;
    top: auto !important;
  }
  .expanded .nav-item.dropdown .dropdown-toggle::after {
    display: none;
  } */
}
</style>
