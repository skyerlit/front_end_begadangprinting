<template>
  <div class="dashboard">
    <!-- Buat Navbar -->
    <v-app-bar color="white" light app style="opacity: 0.8">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title ><img src="~@/components/logo.png" style="width: 40px; height:40px; position: relative; top: 3px;" >
      <font style="position: fixed; top: 15px; opacity: 1 !important " size="5">
        <font color="#D80F6D">Begadang</font>
        <font color="#0D8A9E">Printing</font>
      </font></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="about">About</v-btn>
      <v-btn @click="logout">Log Out</v-btn>
      

    </v-app-bar>
    <!-- -->

    <!-- Buat Sidebar -->
    <v-navigation-drawer v-model="drawer" absolute temporary color="#0D8A9E">
      <!-- Cashier Icon dan nama -->
      <v-img
        max-height="150"
        max-width="250"
        src="https://www.flaticon.com/free-icon/customer_3225069?term=customer&page=1&position=30&related_item_id=3225069"
      ></v-img>

<v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
    
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--  -->

    <div class="grey lighten-4 fullheight pa-10" :style="{ backgroundImage: 'url(' + require('@/components/background.jpg') + ')', height: '100%', width: '100vw', position: 'fixed', top: '0', objectFit: 'cover', backgroundSize: 'cover'} ">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  name: "Dashboard",
  data() {
    return {
      drawer: false,
      group: null,
      svgPath: mdiAccount,
      props:true,
      items: [
        { title: "Dashboard", to: "/"},
        { title: "Profile", to: "/profile"},
        { title: "Order", to: "/order" },
        { title: "History", to: "/history" },
        { title: "Promo", to: "/promo" }
        //{ title: "Login", to: "/login" },
        //{ title: "Register", to: "/register" },
      ],
    };
  },
  methods:{
    logout() {
            localStorage.setItem('id', '');
            localStorage.setItem('token', '');

            this.$router.push({
                name: 'Login',
            });
        },
      
    about() {
          this.$router.push({
            name:'About',
          });
    }
  },

  computed: {
    platform() {
      return "$" + this.user.platform;
    },
  },
};
</script>

<style scoped>

.fullheight {
  min-height: 100vh !important;
  height: 100%;
  width: 100vw;
  position: fixed;
  top: 0;

}
</style>