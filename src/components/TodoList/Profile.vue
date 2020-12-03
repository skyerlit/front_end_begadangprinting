<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Profile</h3>
          <v-card>
              <v-card-text>
                  <v-container>
                      <v-img max-height="150" max-width="250" :src="dasarPath + profile.fileUpload"></v-img>
                      <v-text-field v-model="profile.name" label="Nama" required></v-text-field>
                      <v-text-field v-model="profile.email" label="Email" disabled></v-text-field>
                      <input type="file" @change="onFileSelected">
                      <v-checkbox v-model="checkboxPassword" hide-details label="Change Password?"></v-checkbox>
                      <div v-show="checkboxPassword">
                          <v-text-field v-model="form.password" label="Old Password" type="password"></v-text-field>
                          <v-text-field v-model="form.newPassword" label="New Password" required type="password"></v-text-field>
                          <v-text-field v-model="form.newPasswordConfirm" label="New Password Confirmation" required type="password"></v-text-field>
                      </div>
                  </v-container>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancel">
                      Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="update">
                      Save
                  </v-btn>
              </v-card-actions>
          </v-card>

        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "list",
    data(){
        return{
            load:false,
            error_message: '',
            color: '',
            profile:{
                name:null,
                email:null,
                fileUpload:null,
            },
            checkboxPassword:false,
            form:{

                password:null,
                newPassword:null,
                newPasswordConfirm:null,
            },
            selectedFile:null,
            masukin: new FormData,
            snackbar:false,
            dasarPath: 'http://localhost:8000/storage/gambarUser/',
        };
    },
    methods:{
        //read data user
        readData(){
            var url = this.$api + '/profil/' + localStorage.getItem('id');
            this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.profile = response.data.data;
            })
            .catch((error) => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
            this.resetForm();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            //this.inputType = 'Tambah';
        },
        resetForm(){
            this.form.password = null;
            this.form.newPassword = null;
            this.form.newPasswordConfirm = null;
            this.checkboxPassword = false;
        },

        update(){
            // let newData = {
            //     name: this.profile.name,
            //     email: this.profile.email,
            //     password: this.form.password,
            //     newPassword: this.form.newPassword,
            //     newPasswordConfirm: this.form.newPasswordConfirm,
            // }
            this.masukin.append('name', this.profile.name);
            this.masukin.append('email', this.profile.email);

            if(this.form.password==null && this.selectedFile!=null){
                this.masukin.append('fileUpload', this.selectedFile);
            }
            else if(this.form.password!=null && this.selectedFile!=null){
                this.masukin.append('password', this.form.password);
                this.masukin.append('newPassword', this.form.newPassword);
                this.masukin.append('newPasswordConfirm', this.form.newPasswordConfirm);
                this.masukin.append('fileUpload', this.selectedFile);
            }else{
                this.masukin.append('password', this.form.password);
                this.masukin.append('newPassword', this.form.newPassword);
                this.masukin.append('newPasswordConfirm', this.form.newPasswordConfirm);
            }

            var url = this.$api + '/profil/' + localStorage.getItem('id') + '?_method=PUT';
            this.load = true
            this.$http.post(url, this.masukin,{
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.resetForm();
                this.readData(); //mengambil data
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red"
                this.snackbar = true;
                this.load = false;
                this.resetForm();
            })
            this.resetForm();
        },
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
        }
    },
    computed: {
        formTitle(){
            return 'PROFILE'
        },
    },
    mounted(){
        this.readData();
    },
};
</script>
