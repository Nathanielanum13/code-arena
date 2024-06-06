<template>
  <Page>
    <ActionBar>
      <Label text="Register"/>
    </ActionBar>

    <!-- <GridLayout rows="*" v-if="loading" class="loading-overlay">
      <ActivityIndicator :busy="true" />
    </GridLayout> -->

    <GridLayout>
      <!-- <WebView src="http://10.61.3.29:5500/" @message="onWebViewMessage"  @loadFinished="onLoadFinished" /> -->
      <WebViewExt src="http://10.61.3.29:5500/" @user-registration="onUserRegistration" supportZoom="false" displayZoomControls="false" @skip-button="goToLogin" @loadFinished="loadFinished"></WebViewExt>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { WebView } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { CustomWebChromeClient } from "../services/CustomWebChromeClient"
  import WebViewExt from "@nota/nativescript-webview-ext/vue"
  import Register from "./Register.vue"

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
      // onLoadFinished(args: any) {
      //   const webView = args.object as WebView;

      //   // const settings = webView.android.getSettings();
      //   // settings.setJavaScriptEnabled(true);

      //   // const nativeView = webView.nativeView;

      //   // Create an instance of the custom WebChromeClient
      //   const customWebChromeClient = new CustomWebChromeClient(webView);

      //   webView.android.setWebChromeClient(customWebChromeClient)

      //   // const webView = args.object;
      //   const settings = webView.android.getSettings();
      //   settings.setJavaScriptEnabled(true);
        
      // },
      loadFinished(args: any) {
        console.log("I am done loading")
        this.loading = false
      },
      onUserRegistration(data: any) {
        console.log("I am here too", data?.eventName)
      },
      goToLogin() {
        this.$navigateTo(Register, {})
      }
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
