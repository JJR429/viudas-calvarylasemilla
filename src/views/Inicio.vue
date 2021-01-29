<template>
  <div class="inicio">
    <header class="page-header-light bg-white">
      <div class="page-header-content">
        <div class="content">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-10 text-center" data-aos="fade">
              <h1 class="page-header-title mt-5">
                Bienvenido al ministerio de viudas de <b>Calvary la Semilla</b>
              </h1>
              <p class="page-header-text">
                Estas son las personas que estamos ayudando, si quieres tener mayor información contáctanos por nuestra web o redes sociales.
              </p>
              

              <div class="">
                  <div class="row justify-content-center">
                    <div class="col-xl-4 mb-5">
                      <img src="https://calvarylasemilla.com/wp-content/uploads/2018/03/faviconcs.png" width="100px">
                      <h1 class="text-dark font-weight-bold">
                        Calvary la Semilla
                      </h1>
                      <p class="page-header-text">
                        Lista de Viudas
                      </p>

                      <hr />
                      <h2>Resumen</h2>
                      <strong>Viudas Activas:</strong> {{viudas.length}}<br />
                    </div>

                    <div class="col-xl-8 col-lg-10">
                      
                      <div class="mb-2" v-if="!loanding">
                      <div v-if="viudas.length > 0">
                        <div
                          class="card mx-2 my-2 px-2 py-2"
                          v-for="(viuda, index) in viudas"
                          v-bind:todo="viuda"
                          v-bind:key="viuda.id"
                        >
                          <div class="d-flex justify-content-between">
                            <div class="d-flex">
                              <div
                                class="icon-stack icon-stack bg-primary flex-shrink-0 mr-4"
                              >
                                {{ index + 1 }}
                              </div>


                              <div class="text-left title-tema">
                                <h2 class="text-dark font-weight-bold">
                                  {{ viuda.nombres }} {{ viuda.apellidos }}
                                </h2>
                                  <span class="text-left">{{ viuda.region }} | {{ viuda.ciudad }}</span>
                              </div>
                            </div>
                            <div>
                                <router-link
                                :to="{
                                name: 'viuda',
                                params: { id: viuda.id }
                              }"

                                  class="btn btn-sm btn-primary ml-2 mr-2"
                                >
                                Ver detalles
                                </router-link>
                            </div>

                          </div>
                          
                        </div>
                      </div>
                      <div
                        v-else
                        class="list-group list-group-flush text-left py-5 px-5"
                      >
                        <h2 class="text-warning">
                          No hay preguntas para esta elección.
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
        </div>
      </div>
    </header>
  </div>
</template>
<style scoped>
.categorias {
  display: flex;
  justify-content: space-around;
}
</style>
<script>
// @ is an alias to /src
// import store from "@/store.js"

export default {
  name: "Inicio",
  data() {
    return {
      loanding: true,
      viudas: [],
      host: this.$store.getters.getHost
    };
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
    this.Get();
  },
  methods: {
    Get: async function() {
      const response = await fetch(
        this.host + "/viudas/api/actions/viudas.php"
      );
      const data = await response.json();
      console.log(data);
      this.viudas = await data;
      this.loanding = false;
    }
  }
};
</script>
