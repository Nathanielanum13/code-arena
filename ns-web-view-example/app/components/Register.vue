<template>
  <Page>
    <ActionBar>
      <Label text="Login"/>
    </ActionBar>

    <!-- <GridLayout rows="*" v-if="loading" class="loading-overlay">
      <ActivityIndicator :busy="true" />
    </GridLayout> -->
-
    <GridLayout>
      <WebViewExt src="http://10.61.3.29:5500/login"  supportZoom="false" displayZoomControls="false" @loadFinished="loadFinished"></WebViewExt>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import WebViewExt from "@nota/nativescript-webview-ext/vue"

  export default Vue.extend({
    data() {
      return {
        loading: true
      }
    },
    components: { WebViewExt },
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    },
    methods: {
      loadFinished(args: any) {
        console.log("I am done loading")
        this.loading = false
      },
    }
  });
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
