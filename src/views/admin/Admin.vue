<template>
  <div class="dashboard">
    <header class="mt-5 page-header-light bg-white" v-if="!loanding">
      <div v-if="typeUser != 'Admin'">
        <NotAccess />
      </div>
      <div v-else>
        <div class="page-header-content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-4 mb-5 mt-2">
                <div class="align-items-center">
                  <div class="text-center mt-2">
                    <p class="card-text text-gray-600">
                      <img
                        class="icon-details"
                        src="https://image.flaticon.com/icons/svg/1484/1484875.svg"
                        alt="School Icon"
                      />
                      <span>{{ typeUser }}</span>
                    </p>
                  </div>
                </div>
                <hr />
                <h1 class="text-blue font-weight-bold">
                  {{ currentUser.nombres }}
                </h1>
                <p class="page-header-text">
                  Manejo completo de usuarios
                </p>
              </div>

              <div class="col-xl-8 col-lg-10 text-center pt-2">
                <div class="row d-flex justify-content-between mb-4">
                  <!-- Header section for buttons {create} -->
                  <div>
                    <h1 class="text-capitalize text-dark font-weight-bold">
                      Usuarios
                    </h1>
                  </div>
                  <div>
                    <button
                      class="btn btn-primary rounded-pill flit"
                      @click="openModalSave()"
                      ref="btnSave"
                    >
                      Agregar Usuario <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-2 col-md-12" v-if="!usuarios.loanding">
                    <div
                      v-if="usuarios.data.length > 0"
                      class="list-group list-group-flush text-left"
                    >
                      <div
                        v-for="(usuario, index) in usuarios.data"
                        v-bind:todo="usuario"
                        v-bind:key="usuario.id"
                      >
                        <!-- v-ifs according to status -->
                        <div class="card mb-2" v-if="usuario.estado == 1">
                          <div
                            class="list-group-item list-group-item-action py-4"
                          >
                            <div class="d-flex justify-content-between">
                              <div class="mr-4 d-flex">
                                <div
                                  class="icon-stack icon-stack bg-green text-white flex-shrink-0 mr-4"
                                >
                                  <i class="fas fa-check"></i>
                                </div>
                                <div>
                                  <h2 class="text-green">
                                    {{ usuario.nombres }} {{ usuario.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    {{ usuario.tipo == 1 ? "ADMIN" : "USUARIO" }}
                                  </p>
                                </div>
                              </div>
                              <div
                                class="small text-dark flex-shrink-0 text-right"
                              >
                                <div
                                  class="badge badge-green badge-pill text-white"
                                >
                                  ACTIVO
                                </div>
                                
                                <div class="mt-2">
                                  <button
                                    class="btn btn-xs btn-indigo-soft ml-2 mr-2 text-indigo"
                                    @click="openModalUpdate(index)"
                                    ref="btnUpdate"
                                  >
                                    <i class="fas fa-edit"></i>
                                    <span class="hide-on-mobile"> Editar</span>
                                  </button>
                                </div>
                                <!-- If es director, mostrar estas opciones -->
                                <div class="mt-2">
                                  <!-- Si estado 0, o 2 :: 0: No plubicado, 1: Publicado, 2: Obervado -->
                                  <!-- Si estado 0, o 2 :: 0: No plubicado, 1: Publicado, 2: Obervado -->
                                  <button
                                    class="btn btn-xs btn-yellow ml-2 mr-2 text-white"
                                    @click="
                                      updateEstado(
                                        usuario.id,
                                        0
                                      )
                                    "
                                  >
                                    <i class="fas fa-hand-paper"></i>
                                    <span class="hide-on-mobile">Observar</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-2" v-if="usuario.estado == 0">
                          <div
                            class="list-group-item list-group-item-action py-4"
                          >
                            <div class="d-flex justify-content-between">
                              <div class="mr-4 d-flex">
                                <div
                                  class="icon-stack icon-stack bg-yellow text-white flex-shrink-0 mr-4"
                                >
                                  <i class="fas fa-hand-paper"></i>
                                </div>
                                <div>
                                  <h2 class="text-yellow">
                                    {{ usuario.nombres }} {{ usuario.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    {{ usuario.tipo == 1 ? "ADMIN" : "USUARIO" }}
                                  </p>
                                </div>
                              </div>
                              <div
                                class="small text-dark flex-shrink-0 text-right"
                              >
                                <div
                                  class="badge badge-yellow badge-pill text-white"
                                >
                                  Observado
                                </div>
                                <div class="mt-2">
                                  <button
                                    class="btn btn-xs btn-indigo-soft ml-2 mr-2 text-indigo"
                                    @click="openModalUpdate(index)"
                                    ref="btnUpdate"
                                  >
                                    <i class="fas fa-edit"></i>
                                    <span class="hide-on-mobile">Editar</span>
                                  </button>

                                  <button
                                    class="btn btn-xs btn-red-soft ml-2 mr-2 text-red"
                                    @click="
                                      updateEstado(
                                        usuario.id,
                                        2
                                      )
                                    "
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                    <span class="hide-on-mobile">Papelera</span>
                                  </button>
                                </div>
                                <!-- If es director, mostrar estas opciones -->
                                <div class="mt-2">
                                  <!-- Si estado 0, o 2 :: 0: No plubicado, 1: Publicado, 2: Obervado -->
                                  <button
                                    class="btn btn-xs btn-green-soft ml-2 mr-2 text-green"
                                    v-on:click="
                                      updateEstado(
                                        usuario.id,
                                        1
                                      )
                                    "
                                  >
                                    <i class="fas fa-laptop"></i>
                                    <span class="hide-on-mobile"> Activar</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-2" v-if="usuario.estado == 2">
                          <div
                            class="list-group-item list-group-item-action py-4"
                          >
                            <div class="d-flex justify-content-between">
                              <div class="mr-4 d-flex">
                                <div
                                  class="icon-stack icon-stack bg-red text-white flex-shrink-0 mr-4"
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                                <div>
                                  <h2 class="text-red">
                                    {{ usuario.nombres }} {{ usuario.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    {{ usuario.tipo == 1 ? "ADMIN" : "USUARIO" }}
                                  </p>
                                </div>
                              </div>
                              <div
                                class="small text-dark flex-shrink-0 text-right"
                              >
                                <div
                                  class="badge badge-red badge-pill text-white"
                                >
                                  En Papelera
                                </div>
                                <!-- If es director, mostrar estas opciones -->
                                <div class="mt-2">
                                  <!-- Si estado 0, o 2 :: 0: No plubicado, 1: Publicado, 2: Obervado -->
                                  <button
                                    class="btn btn-xs btn-yellow ml-2 mr-2 text-white"
                                    @click="
                                      updateEstado(
                                        usuario.id,
                                        0
                                      )
                                    "
                                  >
                                    <i class="fas fa-flag"></i>
                                    <span class="hide-on-mobile"> Observar</span>
                                  </button>
                                  <button
                                    class="btn btn-xs btn-red ml-2 mr-2 text-white"
                                    @click="openModalDelete(index)"
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                    <span class="hide-on-mobile"
                                      > Eliminar por completo</span
                                    >
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="list-group list-group-flush text-left py-5 px-5"
                    >
                      <h2 class="text-warning">
                        No hay Usuarios! Agrega uno.
                      </h2>
                    </div>
                  </div>
                  <div class="mb-2" v-else>
                    <h2>Cargando...</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Save Curso -->
        <b-modal id="modalSave" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">Agregar un Usuario</h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombres</label
                >
                <input
                  v-model="ToSave.nombres"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Apellidos</label
                >
                <input
                  v-model="ToSave.apellidos"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Email</label
                >
                <input
                  v-model="ToSave.email"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Username</label
                >
                <input
                  v-model="ToSave.username"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Contraseña</label
                >
                <input
                  v-model="ToSave.password"
                  class="form-control"
                  type="password"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Tipo Usuario</label
                >
                <select v-model="ToSave.tipo" class="form-control rounded-pill">
                  <option value="0" selected>Usuario</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Estado</label
                >
                <select v-model="ToSave.estado" class="form-control rounded-pill">
                  <option value="1" selected>Activo</option>
                  <option value="0">Observado</option>
                </select>
              </div>
            </div>
            <div class="error-modal" v-if="ToSave.error">
              <span class="text-red"> {{ ToSave.error_message }}</span>
            </div>
          </template>

          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button
              size="md"
              class="btn btn-danger rounded-pill"
              @click="cancel()"
            >
              Cancelar
            </b-button>
            <b-button
              size="md"
              class="btn btn-blue rounded-pill"
              @click="saveUsuario"
              ref="btnSaveUsuario"
            >
              Agregar Usuario
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

        <!-- Modal Update Curso -->
        <b-modal id="modalUpdate" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-blue">
              Editar Usuario
              <span class="font-weight-bold">{{ ToUpdate.nombres }}</span>
            </h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombres</label
                >
                <input
                  v-model="ToUpdate.nombres"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Apellidos</label
                >
                <input
                  v-model="ToUpdate.apellidos"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Email</label
                >
                <input
                  v-model="ToUpdate.email"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Username</label
                >
                <input
                  v-model="ToUpdate.username"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Contraseña</label
                >
                <input
                  v-model="ToUpdate.password"
                  class="form-control"
                  type="password"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Tipo Usuario</label
                >
                <select v-model="ToUpdate.tipo" class="form-control rounded-pill">
                  <option value="0" selected>Usuario</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Estado</label
                >
                <select v-model="ToUpdate.estado" class="form-control rounded-pill">
                  <option value="1" selected>Activo</option>
                  <option value="0">Observado</option>
                </select>
              </div>
            </div>
            <div class="error-modal" v-if="ToUpdate.error">
              <span class="text-red"> {{ ToUpdate.error_message }}</span>
            </div>
          </template>

          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button
              size="md"
              class="btn btn-danger rounded-pill"
              @click="cancel()"
            >
              Cancelar
            </b-button>
            <b-button
              size="md"
              class="btn btn-blue rounded-pill"
              @click="updateUsuario"
              ref="btnUpdate"
            >
              Guardar Cambios
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->
        <!-- Modal Delete Clase -->
        <b-modal id="modalDelete" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title">
              Estás a punto de eliminar el Usuario:
            </h3>
          </template>
          <template v-slot:default="">
            <h4 class="text-red">{{ ToDelete.nombres }}</h4>
          </template>
          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button
              size="md"
              class="btn btn-white rounded-pill"
              @click="cancel()"
            >
              Cancelar
            </b-button>
            <b-button
              size="md"
              class="btn btn-red rounded-pill"
              @click="deleteUsuario"
              ref="btnDelete"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->
      </div>
    </header>

    <div class="dash" v-else>
      <p>Loanding...</p>
    </div>
  </div>
</template>

<script>
import NotAccess from "@/components/NotAccess.vue";

import axios from "axios";

export default {
  components: {
    NotAccess
  },
  data() {
    return {
      loanding: true,
      error: false,
      usuarios: {
        data: [],
        loanding: true
      },
      ToUpdate: {
        id: 0,
        nombres: "",
        apellidos: "",
        email: "",
        username: "",
        password: "",
        tipo: 0,
        estado: 0,
        error: false,
        error_message: ""
      },
      ToSave: {
        nombres: "",
        apellidos: "",
        email: "",
        username: "",
        password: "",
        tipo: 0,
        estado: 1,
        error: false,
        error_message: ""
      },
      ToDelete: {
        id: 0,
        nombres: ""
      },
      host: this.$store.getters.getHost
    };
  },
  props: {
    slugGrado: {
      type: String,
      required: false
    }
  },
  computed: {
    // getter
    typeUser() {
      return this.$store.getters.getTypeUser;
    },
    currentUser() {
      // console.log('Current User Dash: '+this.$store.getters.getCurrentUserData)
      return this.$store.getters.getCurrentUserData;
    }
  },
  created() {
    this.error = false;
    this.getUsuarios();
  },
  mounted() {
    // getter
    // this.currentUser = this.$store.getters.getCurrentUserData
    this.loanding = false;
  },
  methods: {
    getUsuarios: async function() {
      this.usuarios.loanding = true;
      const response = await fetch(
        this.host + "/viudas/api/actions/usuarios.php"
      );
      const data = await response.json();
      this.usuarios.data = await data;
      this.usuarios.loanding = false;
    },
    saveUsuario: async function() {
      if (this.verifyInputsToSave()) {
        let _data = new FormData();
        _data.set("nombres", this.ToSave.nombres);
        _data.set("apellidos", this.ToSave.apellidos);
        _data.set("email", this.ToSave.email);
        _data.set("username", this.ToSave.username);
        _data.set("password", this.ToSave.password);
        _data.set("tipo", this.ToSave.tipo);
        _data.set("estado", this.ToSave.estado);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/usuario.save.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            //handle response
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalSave", "#btnSaveUsuario");
              this.getUsuarios();
            } else {
              console.log("Erro on save!");
            }
          })
          .catch(response => {
            //handle error
            this.error = true;
            console.log(response);
          });
      }
    },
    updateUsuario: async function() {
      if (this.verifyInputsToUpdate()) {
        let _data = new FormData();
        _data.set("id", this.ToUpdate.id);
        _data.set("nombres", this.ToUpdate.nombres);
        _data.set("apellidos", this.ToUpdate.apellidos);
        _data.set("email", this.ToUpdate.email);
        _data.set("username", this.ToUpdate.username);
        _data.set("password", this.ToUpdate.password);
        _data.set("tipo", this.ToUpdate.tipo);
        _data.set("estado", this.ToUpdate.estado);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/usuario.update.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalUpdate", "#btnUpdate");
              this.getUsuarios();
            } else {
              console.log("Error on update!");
            }
          })
          .catch(response => {
            //handle error
            this.error = true;
            console.log(response);
          });
      }
    },
    updateEstado: async function(_id, _estado) {
      let _data = new FormData();
      _data.set("id", _id);
      _data.set("estado", _estado);
      axios({
        method: "post",
        url:
          this.host + "/viudas/api/actions/usuario.update.estado.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.getUsuarios();
          } else {
            console.log("Error on Update Estado!");
          }
        })
        .catch(response => {
          //handle error
          this.error = true;
          console.log(response);
        });
    },
    deleteUsuario: async function() {
      let _data = new FormData();
      _data.set("id", this.ToDelete.id);
      axios({
        method: "post",
        url: this.host + "/viudas/api/actions/usuario.delete.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.$root.$emit("bv::hide::modal", "modalDelete", "#btnDelete");
            this.getUsuarios();
          } else {
            console.log("Error on Delete!");
          }
        })
        .catch(response => {
          //handle error
          this.error = true;
          console.log(response);
        });
    },
    verifyInputsToSave: function() {
      if (!this.validateText(this.ToSave.nombres)) {
        this.ToSave.error = true;
        this.ToSave.error_message = "Ingrese un nombre";
        return false;
      }
      // if (!this.validateSelects(this.ToSave.tipo)) {
      //   this.ToSave.error = true;
      //   this.ToSave.error_message = "Escoje una opción";
      //   return false;
      // }
      return true;
    },
    verifyInputsToUpdate: function() {
      if (!this.validateText(this.ToUpdate.nombres)) {
        this.ToUpdate.error = true;
        this.ToUpdate.error_message = "Ingrese un nombre válido";
        return false;
      }
      // if (!this.validateSelects(this.ToUpdate.tipo)) {
      //   this.ToUpdate.error = true;
      //   this.ToUpdate.error_message = "Escoja una opción";
      //   return false;
      // }
      return true;
    },
    openModalSave: function() {
      this.$root.$emit("bv::show::modal", "modalSave", "#btnSave");
    },
    resetCursoToSave: function() {
      this.ToSave.nombres = "";
      this.ToSave.apellidos = "";
      this.ToSave.email = "";
      this.ToSave.username = "";
      this.ToSave.password = "";
      this.ToSave.tipo = 0;
      this.ToSave.estado = 0;
      
    },
    openModalUpdate: function(_index) {
      this.$root.$emit("bv::show::modal", "modalUpdate", "#btnUpdate");
      this.ToUpdate.id = this.usuarios.data[_index].id;
      this.ToUpdate.nombres = this.usuarios.data[_index].nombres;
      this.ToUpdate.apellidos = this.usuarios.data[_index].apellidos;
      this.ToUpdate.email = this.usuarios.data[_index].email;
      this.ToUpdate.username = this.usuarios.data[_index].usuario;
      this.ToUpdate.password = "";
      this.ToUpdate.tipo = this.usuarios.data[_index].tipo;
      this.ToUpdate.estado = this.usuarios.data[_index].estado;
    },
    resetCursoToUpdate: function() {
      this.ToUpdate.id = 0;
      this.ToUpdate.nombres = "";
      this.ToUpdate.apellidos = "";
      this.ToUpdate.email = "";
      this.ToUpdate.username = "";
      this.ToUpdate.password = "";
      this.ToUpdate.tipo = 0;
      this.ToUpdate.estado = 0;
    },
    openModalDelete: function(_index) {
      this.ToDelete.id = this.usuarios.data[_index].id;
      this.ToDelete.nombres = this.usuarios.data[_index].nombres;
      this.$root.$emit("bv::show::modal", "modalDelete", "#btnDelete");
    },
    validateText: function(str) {
      return str.length > 1 ? true : false;
    },
    validateSelects: function(value) {
      return value != 0 ? true : false;
    }
  }
};
</script>
<style scoped>
.icon-details {
  width: 40px;
}
.icon-stacks {
  height: 50px;
}
@media only screen and (max-width: 600px) {
  .hide-on-mobile {
    display: none;
  }
}
</style>
