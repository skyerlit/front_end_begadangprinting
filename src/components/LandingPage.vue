
<template>
    <div>
      <v-container id="scroll-target" style="max-height: 500px" class="overflow-y-auto">
          <!-- Buat Navbar -->
          <v-app-bar app fixed height="75px" color="white" light style="opacity: 0.8">
            <v-toolbar-title ><img src="~@/components/TodoList/logo.png" style="width: 40px; height:40px; position: relative; top: 3px;" >
              <font style="position: fixed; top: 15px; opacity: 1 !important " size="5">
                <font color="#D80F6D">Begadang</font>
                <font color="#0D8A9E">Printing</font>
              </font></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="login" style="opacity: 0.5">Login</v-btn>
            <v-btn @click="signup" style="opacity: 0.5">Sign Up</v-btn>
          </v-app-bar>
      </v-container>
      <!-- carousel -->
      <v-carousel cycle height="100%" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(item, i) in items" :key="i">
          <v-sheet height="100%">
            <img :src="item.src" width="100%" height="100%">

          </v-sheet>
        </v-carousel-item>
      </v-carousel>
<!--      <v-carousel hide-delimiter style="position: fixed;  bottom: 200px; top: 95px; height: 100%; width: 100%;">-->
<!--        <v-carousel-item-->
<!--            v-for="(item,i) in items"-->
<!--            :key="i"-->
<!--        ><img :src="item.src"></v-carousel-item>-->
<!--      </v-carousel>-->

    </div>
</template>
<script>
  export default {
    data () {
      return {
        slide: [
          'First',
          'Second',
          'Third',
        ],
        items: [
          {
            src: require("../components/landingpage.jpg"),
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
