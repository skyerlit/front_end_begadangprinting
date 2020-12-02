
<template>
    <div>
    <!-- Buat Navbar -->
    <v-app-bar color="white" light app style="opacity: 0.8">

      <v-toolbar-title ><img src="../components/logo.png" style="width: 40px; height:40px; position: relative; top: 3px;" >
        <font style="position: fixed; top: 15px; opacity: 1 !important " size="5">
        <font color="#D80F6D">Begadang</font>
        <font color="#0D8A9E">Printing</font>
      </font></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="login" style="opacity: 0.5">Login</v-btn>
      <v-btn @click="signup" style="opacity: 0.5">Sign Up</v-btn>
      </v-app-bar>

        <!-- carousel -->
        <v-carousel hide-delimiter style="position: fixed;  bottom: 0px; top: 0px; height: 100%; width: 100vw;">
            <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            ><img :src="item.src"></v-carousel-item>
        </v-carousel>

    
        </div>  
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: require("../components/landingkata.png"),
          },
          {
            src: require("../components/landingkata2.png"),
          },
          {
            src: require("../components/landingkata3.png"),
          },
        ],
      }
    },
    methods: {
        login() {
            this.$router.push({
                name: 'Login',
            })
        },
        about() {
            this.$router.push({
                name:'About',
            })
        }
    }
  }
</script>