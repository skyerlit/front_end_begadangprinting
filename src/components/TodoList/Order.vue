<template>
  <v-main class="list-UGD">
    <h3 class="text-h3 font-weight-medium mb-5">Order List</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialog = true">
          Tambah
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">
      
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="info" class="mr-2" @click="setFormEdit(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" @click="deleteItemConfirm(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Order Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
           
             <v-select
              v-model="formTodo.kategori"
              :items="['Brochure', 'Book', 'Card']"
              label="Kategori"
              required
            ></v-select>

            <v-select
              v-model="formTodo.namaItem"
              :items="['A3', 'A4', 'A5']"
              label="Paper"
              required
            ></v-select>

            <v-select
              v-model="formTodo.jenisWarna"
              :items="['Colored', 'Black and White']"
              label="Color"
              required
            ></v-select>

             <v-select
              v-model="formTodo.jenisServis"
              :items="['Delivery', 'Take Away']"
              label="Service"
              required
            ></v-select>

            <v-text-field
              v-model="formTodo.jumlah"
              label="Amount"
              required
            ></v-text-field>    
            
            <v-file-input
                v-model="filePesan" 
                @change="onFileSelected" 
                color="deep-purple accent-4" 
                label="File input" 
                placeholder="Select your files" 
                outlined>
            </v-file-input>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save(idEdit)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">
          Yakin ingin menghapus?
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelDelete">
            Tidak
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteItem()">
            Ya
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      search: null,
      dialog: false,    
      dialogDelete: false,
      items:[],
      //orders:[],

      headers: [
        {
          text: "Category",
          align: "start",
          sortable: true,
          value: "kategori",
        },
        { text: "Paper", value: "namaItem" },
        { text: "Color", value: "jenisWarna" },
        { text: "Service", value: "jenisServis" },
        { text: "Amount", value: "jumlah" },
        { text: "Price", value: "total" },
        { text: "Actions", value: "actions" },
      ],

      orders: [
        {
          kategori: "Book",
          namaItem: "A3",
          jenisWarna: "Color",
          jenisServis: "Delivery",
          jumlah: "1",
          total: "Rp 50.000",   
        },
        
      ],
      formTodo: {
          category: null,
          paper: null,
          color: null,
          service: null,
          amount: null,
          price: null,
      },
    };
  },
  methods: {
    save(idEdit = null) {
      idEdit == null ? this.add() : this.edit(idEdit);
      this.resetForm();
      this.dialog = false;
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
    },
    setFormEdit(item) {
      this.idEdit = this.todos.indexOf(item);
      this.formTodo.category = item.category;
      this.formTodo.paper = item.paper;
      this.formTodo.color = item.color;
      this.formTodo.service = item.service;
      this.formTodo.amount = item.amount;
      this.dialog = true;
    },
    resetForm() {
      this.formTodo = {
         category: null,
          paper: null,
          color: null,
          service: null,
          amount: null,
          price: null,
      };
      this.idEdit = null;
    },
    // CREATE ===========================================
    add() {
      this.todos.push(this.formTodo);
    },
    // EDIT ===========================================
    edit(idEdit) {
      this.todos[idEdit].category = this.formTodo.category;
      this.todos[idEdit].priority = this.formTodo.priority;
      this.todos[idEdit].note = this.formTodo.note;
      console.log(this.todos[idEdit]);
    },
    // DELETE ===========================================
    deleteItemConfirm(item) {
      this.idEdit = this.todos.indexOf(item);
      this.dialogDelete = true;
    },
    cancelDelete() {
      this.resetForm();
      this.dialogDelete = false;
    },
    deleteItem() {
      this.dialogRecycleBin.todos.push(this.todos[this.idEdit])
      this.todos.splice(this.idEdit, 1);
      this.resetForm();
      this.dialogDelete = false;
    },
    readData(){
        var url = this.$api + '/order'
        this.$http.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.orders = response.data.data
        })
    },
  },

  mounted(){
        this.readData();
},
};
</script>