<!--<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-card class="elevation-12">
                            <v-window v-model="step">
                                <v-window-item :value="1">
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-card-text class="mt-12">
                                                <h2 class="text-center display-2 black--text text--accent-3">Log In</h2>
                                                <h4 class="text-center mlt-4">Ensure your email for registration</h4>
                                                <v-form>
                                                    <v-text-field v-model="email" label="E-mail"  prepend-icon="email" type="text" color="grey accent-3" :rules="emailRules"/>
                                                    <v-text-field v-model="password" label="Password" prepend-icon="lock" type="password" color="grey accent-3" :rules="passwordRules"/>
                                                
                                                </v-form>
                                                <h5 class="text-center mt-3">Forget your password ?</h5>
                                            </v-card-text>
                                            <div class="text-center mt-3">
                                                <v-btn rounded color="red accent-3" dark @click="submit">Log In</v-btn>
                                            </div>
                                        </v-col>
                                         
                                        <v-col cols="12" md="6" class="blue accent-3">
                                            <v-card-text class="white--text mt-12">
                                            
                                                <h1 class="text-center display-1">Begadang Printer</h1>
                                                <h5 class="text-center">Enter your personel details and start journey with us</h5>
                                                <h5 class="text-center">Not a member? </h5>
                                                <h5 class="text-center">Create your account by click</h5>
                                            </v-card-text>
                                            
                                            <v-div class="text-center">
                                                <v-btn rounded outlined="" dark @click="step++">SIGN UP</v-btn>
                                            </v-div>
                                        </v-col>
                                    </v-row>
                                </v-window-item >
                                <v-window-item :value="2">
                                    <v-row class="fill-height">
                                        <v-col cols="12" md="6" class="blue accent-3">
                                            <v-card-text class="white--text mt-12">
                                                <h1 class="text-center display-1">Begadang Printer</h1>
                                                <h5 class="text-center">To keep connected with us please create your account</h5>
                                                <h5 class="text-center">Have an account ?  Login </h5>
                                            </v-card-text>
                                            <div class="text-center">
                                                <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-card-text class="mt-12">
                                                <h2 class="text--center display-2 black--text text-accent-3">Sign Up</h2>
                                                <h4 class="text-center mt-4">Ensure your email for registration</h4>
                                                <v-form>
                                                    <v-text-field label="FullName" name="FullName" prepend-icon="person" type="text" color="teal accent-3"/>
                                                    <v-text-field label="Phone" name="Phone" prepend-icon="phone" type="text" color="teal accent-3"/>
                                                    <v-text-field label="Email" name="Email" prepend-icon="email" type="text" color="teal accent-3"/>
                                                    <v-text-field label="Username" name="Username" prepend-icon="name" type="text" color="teal accent-3"/>
                                                    <v-text-field label="Password" name="Password" prepend-icon="lock" type="password" color="teal accent-3"/>
                                                </v-form>
                                            </v-card-text>
                                            <div class="text-center mt-n5">
                                                <v-btn rounded color="red accent-3" dark @click="signUp">SIGN UP</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                            </v-window>
                        </v-card>
                    </v-col>
                    
                </v-row>
                <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
                    {{error_message}}
                </v-snackbar>
            </v-container>
            <h3>Copyright © 2020 BegadangPrinter.com All rights reserved</h3>
        </v-content>
    </v-app>
</template>

<script>
export default {
    // data: () => ({
    //     step: 1
    // }),
    // props: {
    //     source: String
    // }
    name: "Login",
    data(){
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules:[
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules:[
                (v) => !!v || 'E-mail tidak boleh kosong',
            ],
        };
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){ //cek apakah data yang akan dikirim sudah valid
                this.load = true
                    this.$http.post(this.$api + '/login',{
                        email: this.email,
                        password: this.password
                    }).then(response =>{
                            localStorage.setItem('id', response.data.user.id); //menyimpan id user yang sedang login
                            localStorage.setItem('token', response.data.access_token); //menyimpan auth token
                            this.error_message=response.data.message;
                            this.color="green"
                            this.snackbar=true;
                            this.load = false;
                            this.clear();
                            this.$router.push({
                                name: 'Profil'
                            })
                    }).catch(error => {
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.snackbar=true;
                        localStorage.removeItem('token')
                        this.load = false
                    })
            }
        },
        clear(){
            this.$refs.form.reset() //clear form login
        }
    },
};
</script>-->

<template>
  <main>
    <v-container fluid fill-height class="posisinya">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-toolbar class="grey darken-3">
            <v-toolbar-title class="grey--text">
              <h1>LOGIN USER</h1>
            </v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    min="8"
                    :rules="passwordRules"
                    counter
                    required
                  >
                  </v-text-field>
                  <v-layout justify-end>
                    <v-btn
                      class="mr-2"
                      @click="submit"
                      :class="{
                        'grey darken-1 white--text': valid,
                        disabled: !valid,
                      }"
                      >Go</v-btn
                    >
                    <v-btn @click="clear" class="grey darken-3 white--text"
                      >Clear</v-btn
                    >
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
.grey--text {
  font-family: "Jolly Lodger";
}
.posisinya {
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
}
</style>

<script>
export default {
  name: "Login",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong :("],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong :("],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek apakah data yang akan dikirim sudah valid
        this.load = true;
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if(response.data.user.status == 'admin'){
                this.error_message = 'Anda login sebagai admin';
                this.color = "red";
                this.snackbar = true;
                this.$router.push({
                    name: "Login",
                });

            }else{
                localStorage.setItem("id", response.data.user.id); //menyimpan id user yang sedang login
                localStorage.setItem("token", response.data.access_token);
                
                //menyimpan auth token
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.clear();
                this.$router.push({
                    name: "Profile",
                });
            }
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset(); //Clear form login
    },
  },
};
</script>