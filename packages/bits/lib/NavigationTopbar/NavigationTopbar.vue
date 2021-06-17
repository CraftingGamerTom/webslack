<template>
  <!-- TODO: MAKE RESPONSIVE FOR MOBILE. Create a user-action menu in collapse that is only visible below 'md' and then make the outside defines user-actions display:none below 'md' -->
  <div>
    <b-navbar toggleable="md" type="dark" fixed="top">
      <b-navbar-brand to="/" @click="isNavbarCollapseOpen = false">
        <Icon :name="brandImage.icon" :location="brandImage.managedIconLocation" :width="brandImage.width" :size="brandImage.size" :type="brandImage.iconType" />
      </b-navbar-brand>

      <b-navbar-nav id="user-actions-mobile-bar" class="navbar-right d-md-none">
        <slot name="user-actions-mobile-bar"/>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" >
        <template #default="{ expanded }">
          <!-- <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon> -->
          <svg width="30" height="30" stroke="currentColor" fill="none" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" data-attributes-set=",xmlns:xlink,xmlns,viewBox,preserveAspectRatio,xmlns:xlink,xmlns,viewBox,preserveAspectRatio"><path xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" v-model="isNavbarCollapseOpen" is-nav>
        <div class="vertical" />

        <b-navbar-nav id="user-actions-mobile-dropdown" class="navbar-right d-md-none">
          <slot name="user-actions-mobile-dropdown"/>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item v-for="item in navItems" :key="item.title" :class="amIActive(item.link)" :to="item.link">
            {{item.title}}
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="user-actions-desktop" class="ml-auto d-none d-md-block">
          <slot name="user-actions-desktop"/>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style lang="scss" scoped>
nav {
  background-color: #C2C2C2;
  padding: 2px 5px;
}

.navbar-nav a.nav-link {
    display:block;
    -ms-transform: inherit;
    transform: inherit;

    text-align:center;
    color: #FFFFFF;
    text-transform: uppercase;
    position: relative;
    top: 50%;

  &.nuxt-link-active {
    color: #E0E0E0;
    font-weight: bold;
  }
  &:hover {
  color: #E0E0E0;
  }
  &:before {
    display: block;
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
}

.navbar-brand {
    display: inline-block;
    padding-top: 3px;
    padding-bottom: 7px;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.nav-logo {
    width: auto;
    max-height: 41px;
}
.vertical {
  border-left: 1px solid #E0E0E0;
  height: 25px;
  width:0;
  margin-right: 8px;
  display: none;
}

nav.navbar .btn {
  margin: 5px 0;
  margin-right: 15px;
  border-radius: border-radius(nav-btn);
  font-family: font(primary);
  height: 30px;
  line-height: 16px;
  padding: 6px 12px;
  background-color: #C2C2C2;
  color: #E0E0E0;
  border: none;

  &:hover {
    box-shadow: none;
    border: none;
    color: #E0E0E0;
    background-color: #C2C2C2;

  }
  &:active, &:focus {
    box-shadow: none;
    border: none;
    background-color: none;

  }

  & svg {
    margin-right: 4px;
    fill: #FFFFFF;
  }
}

#user-actions {
  display: flex;
}

#user-actions-mobile-bar {
  right: 75px;
  position: fixed;
  top: 9px;
}

  @media only screen and (min-width: 768px) {
  .vertical {
    display:block;
  }
  #user-actions {
    display: inline-flex;
  }
  .navbar-nav a.nav-link {
    display:inline-block;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

// .custom-class {
//   display: none;
// }
// @include media-breakpoint-up(md) {
//   .vertical {
//     display:block;
//   }
// }

</style>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem } from 'bootstrap-vue'
import Icon from '../QuickIcon/QuickIcon.vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
    Icon
  },
  props: {
    navItems: {
      type: Array,
      required: true
    },
    brandImage: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
      isNavbarCollapseOpen: false
    }
  },
  methods: {
    amIActive (link) {
      if(this.$route) {
        return this.$route.fullPath === link ? 'active' : ''
      } else {
        console.error("App is not compatible with nuxt. Tried to use: 'this.$route'. Got undefined")
      }
    }
  }
}
</script>
