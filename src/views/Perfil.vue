<template>
  <div class="dashboard">
    <header
      class="mt-5 mb-10 pb-10 page-header-light bg-white"
      v-if="!loanding"
    >
      <div v-if="typeUser != 'Votante'">
        <NotAccess />
      </div>
      <div v-else>
        <div class="page-header-content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-4 mb-5">
                <img
                  class="mb-4"
                  src="https://www.flaticon.es/svg/static/icons/svg/3288/3288367.svg"
                  style="width: 10rem;"
                />
                <h1 class="text-blue font-weight-bold">
                  {{ currentUser.nombres }}
                </h1>
                <p class="page-header-text">
                  Crea cursos, temas y clases para tus estudiantes.
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

              <div class="col-xl-8 col-lg-10 text-center pt-5">
                <div class="row">
                  <div class="col-md-6">
                    <router-link
                      class="card text-decoration-none lift mb-4"
                      :to="{ path: '/votar' }"
                    >
                      <div class="card-body">
                        <div class="align-items-center">
                          <div
                            class="icon-stack icon-stack-lg bg-primary-soft text-dark font-weight-bold"
                          >
                            <img
                              class="icon-details"
                              src="https://www.flaticon.es/svg/static/icons/svg/3179/3179338.svg"
                              alt="School Icon"
                            />
                          </div>
                          <div class="text-center mt-2">
                            <h2 class="text-primary font-weight-bold">
                              Elecciones
                            </h2>
                            <p class="card-text text-gray-600">
                              Mira las elecciones que hay en tu organización y
                              vota!
                            </p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link
                      class="card text-decoration-none lift mb-4"
                      :to="{ path: '/comunicados' }"
                    >
                      <div class="card-body">
                        <div class="align-items-center">
                          <div
                            class="icon-stack icon-stack-lg bg-warning-soft text-dark font-weight-bold"
                          >
                            <img
                              class="icon-details"
                              src="https://www.flaticon.es/svg/static/icons/svg/1301/1301416.svg"
                              alt="School Icon"
                            />
                          </div>
                          <div class="text-center mt-2">
                            <h2 class="text-primary font-weight-bold">
                              Comunicados
                            </h2>
                            <p class="card-text text-gray-600">
                              Lista de noticias que tu organización tiene para
                              ti.
                            </p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      grados: [],
      host: this.$store.getters.getHost
    };
  },
  created() {
    this.getGrados(this.$store.getters.getCurrentUserId);
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
  methods: {
    getGrados: async function(_docente) {
      const response = await fetch(
        this.host + "/mayvoto/api/actions/grados.php?docente=" + _docente
      );
      const data = await response.json();
      this.grados = await data;
    },
    checkPrimaria: function() {
      let _grado = 0;
      for (let i = 0; i < this.grados.length; i++) {
        if (this.grados[i].category == 1) {
          _grado++;
        }
      }
      return _grado;
    },
    checkSecundaria: function() {
      let _grado = 0;
      for (let i = 0; i < this.grados.length; i++) {
        if (this.grados[i].category == 2) {
          _grado++;
        }
      }
      return _grado;
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
</style>
