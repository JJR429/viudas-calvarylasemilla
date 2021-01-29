<template>
  <div class="dashboard">
    <header
      class="mt-5 mb-10 pb-10 page-header-light bg-white"
      v-if="!loanding"
    >
      <div v-if="typeUser != 'Organizador'">
        <NotAccess />
      </div>
      <div v-else>
        <div class="page-header-content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-4 mb-5 mt-2">
                <div class="align-items-center">
                  <div class="text-center mt-2">
                    <h2>Bienvenido {{ currentUser.nombres }}</h2>
                    {{ typeUser }}
                  </div>
                </div>
                <hr />
                <p class="page-header-text">
                  Podrás crear elecciones, editar, hacer preguntas y opciones,
                  ver listados de usuarios y dar de alta votantes.
                </p>
                <hr />
                <h2>Organización</h2>
                <strong>Nombre:</strong> {{ currentUser.organizacion[0].nombres
                }}<br />
                <strong>Descripción:</strong>
                {{ currentUser.organizacion[0].descipcion }}<br />
                <strong>Dirección:</strong>
                {{ currentUser.organizacion[0].direccion }}<br />
                <template v-if="currentUser.organizacion[0].estado == 0">
                  <strong>Estado:</strong> <b class="text-warning">INACTIVO</b
                  ><br />
                </template>
                <template v-if="currentUser.organizacion[0].estado == 1">
                  <strong>Estado:</strong> <b class="text-warning">ACTIVO</b
                  ><br />
                </template>
                <template v-if="currentUser.organizacion[0].estado == 2">
                  <strong>Estado:</strong> <b class="text-warning">SUSPENDIDO</b
                  ><br />
                </template>
                <strong>Fecha Creada:</strong>
                {{ currentUser.organizacion[0].fechacreada }}
              </div>

              <div class="col-xl-8 col-lg-10 text-center pt-2">
                <div class="row d-flex justify-content-between mb-4">
                  <!-- Header section for buttons {create} -->
                  <div>
                    <h1 class="text-capitalize text-primary font-weight-bold">
                      Organizacion: {{ currentUser.organizacion[0].nombres }}
                    </h1>
                  </div>
                  <div></div>
                </div>
                <div class="row">
                  <router-link
                    class="card col-md-5 text-decoration-none lift mb-4 m-2"
                    :to="{
                      path: '/elecciones/'
                    }"
                  >
                    <div class="card-body">
                      <div class="align-items-center">
                        <div class="text-center mt-2">
                          <div
                            class="icon-stack icon-stack-lg bg-success-soft text-dark font-weight-bold"
                          >
                            <img
                              alt="Imagen"
                              src="https://www.flaticon.com/svg/static/icons/svg/1533/1533913.svg"
                              width="50"
                            />
                          </div>
                          <h2 class="text-primary font-weight-bold">
                            Elecciones
                          </h2>
                        </div>
                      </div>
                    </div>
                  </router-link>
                  <router-link
                    class="card col-md-5 text-decoration-none lift mb-4 m-2"
                    :to="{
                      path: '/votantes/'
                    }"
                  >
                    <div class="card-body">
                      <div class="align-items-center">
                        <div class="text-center mt-2">
                          <div
                            class="icon-stack icon-stack-lg bg-success-soft text-dark font-weight-bold"
                          >
                            <img
                              alt="Imagen"
                              src="https://www.flaticon.com/svg/static/icons/svg/681/681392.svg"
                              width="50"
                            />
                          </div>
                          <h2 class="text-primary font-weight-bold">
                            Votantes
                          </h2>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Save Curso -->
        <b-modal id="modalSave" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-blue">Agregar Curso</h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre del Curso</label
                >
                <input
                  v-model="cursoToSave.name"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descripción del Curso</label
                >
                <textarea
                  v-model="cursoToSave.description"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600"
                  >Escoge la Categoria al que pertenece este Curso</label
                >
                <select
                  v-model="cursoToSave.idmateria"
                  class="form-control rounded-pill"
                >
                  <option value="0" selected>Escoge una opción</option>
                  <option value="1">Lenguaje y Comunicación</option>
                  <option value="2">Matemáticas</option>
                  <option value="3">Biología</option>
                  <option value="4">Química</option>
                  <option value="5">Física</option>
                  <option value="6">Historia</option>
                  <option value="7">Geografía</option>
                  <option value="8">Ciencias Sociales</option>
                  <option value="9">Idiomas</option>
                  <option value="10">Educación Física</option>
                  <option value="11">Artes Visuales o Artes Musicales</option>
                  <option value="12">Educación Tecnológica</option>
                  <option value="13">Psicología</option>
                  <option value="14">Filosofía</option>
                  <option value="15">Otros</option>
                </select>
              </div>
            </div>
            <div class="error-modal" v-if="cursoToSave.error">
              <span class="text-red"> {{ cursoToSave.error_message }}</span>
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
              @click="saveCurso"
              ref="btnSaveCurso"
            >
              Agregar Curso
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

        <!-- Modal Update Curso -->
        <b-modal id="modalUpdate" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-blue">
              Editar Curso de
              <span class="font-weight-bold">{{ cursoToUpdate.name }}</span>
            </h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre del Curso</label
                >
                <input
                  v-model="cursoToUpdate.name"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descripción del Curso</label
                >
                <textarea
                  v-model="cursoToUpdate.description"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600"
                  >Escoge la Categoria al que pertenece este Curso</label
                >
                <select
                  v-model="cursoToUpdate.idmateria"
                  class="form-control rounded-pill"
                >
                  <option value="0" selected>Escoge una opción</option>
                  <option value="1">Lenguaje y Comunicación</option>
                  <option value="2">Matemáticas</option>
                  <option value="3">Biología</option>
                  <option value="4">Química</option>
                  <option value="5">Física</option>
                  <option value="6">Historia</option>
                  <option value="7">Geografía</option>
                  <option value="8">Ciencias Sociales</option>
                  <option value="9">Idiomas</option>
                  <option value="10">Educación Física</option>
                  <option value="11">Artes Visuales o Artes Musicales</option>
                  <option value="12">Educación Tecnológica</option>
                  <option value="13">Psicología</option>
                  <option value="15">Otros</option>
                </select>
              </div>
            </div>
            <div class="error-modal" v-if="cursoToUpdate.error">
              <span class="text-red"> {{ cursoToUpdate.error_message }}</span>
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
              @click="updateCurso"
              ref="btnUpdateCurso"
            >
              Guardar Cambios
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

export default {
  components: {
    NotAccess
  },
  data() {
    return {
      loanding: true,
      error: true,
      cursos: {
        data: [],
        loanding: true
      },
      cursoToUpdate: {
        id: 0,
        name: "",
        description: "",
        idmateria: 0,
        error: false,
        error_message: ""
      },
      cursoToSave: {
        name: "",
        description: "",
        idmateria: 0,
        error: false,
        error_message: ""
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
  created() {
    if (this.$route.query.grado == null) {
      this.error = true;
      // console.log('Some Query Params are empty')
    } else {
      this.error = false;
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
  mounted() {
    // getter
    // this.currentUser = this.$store.getters.getCurrentUserData
    this.loanding = false;
  },
  methods: {}
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
