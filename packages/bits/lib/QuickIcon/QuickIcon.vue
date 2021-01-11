<template>
  <component :is="imageComponent" :fill="color" :class="[calculatedWidth, calculatedSize]" />
</template>

<script>
/*
 * QuickIcon Component to import svgs into with built in styling
 *
 * Variables and how to use them
 * name:      The file name of the svg (Ex 'image' for the file 'image.svg')
 * type:      The type of icon to use (CURRENTLY ONLY 'managed' SUPPORTED) // TODO support font-awesome, inline, and external
 * location:  The location for the icons, defines the file path (default: 'icons'). (Ex of subfolders: 'icons/subfolder')
 * width:     The width of the area the svg should be in
 * size:      The size of the svg
 * color:     The fill color of the svg
 *
 */

export default {
  name: 'QuickIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    type: { // TODO Support font-awesome, inline svg, and external svg
      type: String,
      default: 'managed'
    },
    location: {
      type: String,
      default: '~/assets/icons'
    },
    width: {
      type: String,
      default: '20'
    },
    size: {
      type: String,
      default: '1'
    },
    color: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      imageComponent: null
    }
  },
  computed: {
    calculatedWidth () {
      return 'width--' + this.width
    },
    calculatedSize () {
      return 'size--' + this.size + 'x'
    }

  },
  watch: {
    // whenever image name changes, this function will run
    name (newVal, oldVal) {
      this.setImage()
    }
  },
  mounted () {
    this.setImage()
  },
  methods: {
    setImage () {
      switch (this.type) {
        case 'managed':
          try {
            // this.imageComponent = require(this.location + '/' + this.name + '.svg?inline')
            this.imageComponent = require('~/assets/icons/' + this.name + '.svg?inline') // For testing
            // console.debug('QuickIcon:', this.imageComponent)
          } catch (err) {
            console.error('QuickIcon: Could not find the icon. Did you define "name" ?', err)
          }
          break
        //   case 'fa': // TODO support font-awesome
        //     break
        //   case 'inline': // TODO support inline
        //     break
        //   case 'external': // TODO support external
        //     break
        default:
          console.error('QuickIcon: "' + this.type + '" is not a supported "type"')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
    display: inline-block;
    font-size: inherit;
    height: 1em;

    &.size {
        &--1x {
            font-size:1em;
        }
        &--2x {
            font-size:2em;
        }
        &--3x {
            font-size:3em;
        }
        &--4x {
            font-size:4em;
        }
   }

    &.width {
        &--1 {
            width: 0.0625em;
        }
        &--2 {
            width: 0.125em;
        }
        &--3 {
            width: 0.1875em;
        }
        &--4 {
            width: 0.25em;
        }
        &--5 {
            width: 0.3125em;
        }
        &--6 {
            width: 0.375em;
        }
        &--7 {
            width: 0.4375em;
        }
        &--8 {
            width: 0.5em;
        }
        &--9 {
            width: 0.5625em;
        }
        &--10 {
            width: 0.625em;
        }
        &--11 {
            width: 0.6875em;
        }
        &--12 {
            width: 0.75em;
        }
        &--13 {
            width: 0.8125em;
        }
        &--14 {
            width: 0.875em;
        }
        &--15 {
            width: 0.9375em;
        }
        &--16 {
            width: 1em;
        }
        &--17 {
            width: 1.0625em;
        }
        &--18 {
            width: 1.125em;
        }
        &--19 {
            width: 1.1875em;
        }
        &--20 {
            width: 1.25em;
        }
    }
}
</style>