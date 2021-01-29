<template>
  <div class="dashboard">
    <header
      class="mt-5 mb-10 pb-10 page-header-light bg-white"
      v-if="!loanding"
    >
      <div class="page-header-content">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-4 mb-5">
                <router-link
                      :to="{
                        path: '/'
                      }"
                      class="btn btn-primary rounded-pill"
                      ><i class="fas fa-arrow-left"></i> Regresar</router-link
                    >
                    <hr>
                <img
                  class="mb-4"
                  src="https://www.flaticon.es/svg/static/icons/svg/3288/3288367.svg"
                  style="width: 10rem;"
                />
                <h1 class="text-dark font-weight-bold">
                  {{viuda.nombres}} {{viuda.apellidos}}
                </h1>
                <p class="page-header-text">
                  {{viuda.region}} | {{viuda.ciudad}}
                </p>
                <hr />
                <h3 class="text-dark font-weight-bold">Datos Generales</h3>
                <ul class="text-left list-unstyled">
                  <li><b>DNI</b> {{viuda.dni}}</li>
                  <li><b>Región:</b> {{viuda.region}}</li>
                  <li><b>Ciudad:</b> {{viuda.ciudad}}</li>
                  <li><b>Dirección:</b> {{viuda.direccion}}</li>
                  <li><b>Referencia:</b> {{viuda.referencia}}</li>
                  <li><b>Celular:</b> {{viuda.celular}}</li>
                  <li><b>Fecha Nacimiento:</b> {{viuda.fecha_nacimiento}}</li>
                  <li><b>Edad:</b> {{viuda.fecha_nacimiento}}</li>
                </ul>
              </div>

              <div class="col-xl-8 col-lg-10 pt-5">
                <div class="row">
                  <div class="col-md-6 text-left">
                    <h2 class="text-dark font-weight-bold">Trabajo</h2>
                    <div>
                      <ul class="text-left list-unstyled">
                        <li>¿Tiene trabajo?: <b>{{viuda.tiene_trabajo == 1 ? 'SI':'NO' }}</b></li>
                        <li>¿Trabajo remunerado?: <b>{{viuda.trabajo_remunerado == 1 ? 'SI':'NO' }}</b></li>
                        <li>¿Tiene Pensión 65?: <b>{{viuda.pension_65 == 1 ? 'SI':'NO' }}</b></li>
                        <li>¿Tiene Seguro?: <b>{{viuda.tiene_seguro == 1 ? 'SI':'NO' }}</b></li>
                      </ul>
                    </div>

                    <h2 class="text-dark font-weight-bold">Discapacidad</h2>
                    <div>
                      <ul class="text-left list-unstyled">
                        <li>¿Tiene discapacidad? <b>{{viuda.tiene_discapacidad == 1 ? 'SI':'NO' }}</b></li>
                        <li>Discapacidad: <b>{{viuda.discapacidad}}</b></li>
                        <li>¿Toma medicamentos?: <b>{{viuda.toma_medicamentos == 1 ? 'SI':'NO' }}</b></li>
                        <li>Descricpión de los medicamentos: <b>{{viuda.descripcion_medicamentos}}</b></li>
                      </ul>
                    </div>

                    <h2 class="text-dark font-weight-bold">Pareja</h2>
                    <div>
                      <ul class="text-left list-unstyled">
                        <li>Viuda desde: <b>{{viuda.viuda_desde}}</b></li>
                        <li>Nombre pareja: <b>{{viuda.nombre_pareja}}</b></li>
                      </ul>
                    </div>
                    <h2 class="text-dark font-weight-bold">Hijos</h2>
                    Cantidad hijos: {{2}}
                    <div>
                      <ul class="text-left list-unstyled">
                        <li><b>Hijo 1: </b>  Hijo 1 | 28 años </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 text-left">
                    <h2 class="text-dark font-weight-bold">Relación con Dios</h2>
                    <div>
                      <ul class="text-left list-unstyled">
                        <li>Religión: <b>{{viuda.religion}}</b></li>
                        <li>¿Sabe de Dios?: <b>{{viuda.sabe_de_dios == 1 ? 'SI':'NO' }}</b></li>
                        <li>Conoce de Dios?: <b>{{viuda.conoce_de_dios == 1 ? 'SI':'NO' }}</b></li>
                        <li>¿Relación con Jesus?: <b>{{viuda.relacion_con_jesus == 1 ? 'SI':'NO' }}</b></li>
                        <li>Fecha que acepto Jesus: <b>{{viuda.fecha_de_aceptacion}}</b></li>
                        <li>¿Asiste a una iglesia?: <b>{{viuda.asiste_a_una_iglesia == 1 ? 'SI':'NO' }}</b></li>
                        <li>Iglesia: <b>{{viuda.iglesia}}</b></li>
                        <li>¿Desde que fecha asiste?: <b>{{viuda.desde_que_fecha}}</b></li>
                        <li>¿Le interesa Jesus?: <b>{{viuda.le_interesa_jesus == 1 ? 'SI':'NO' }}</b></li>
                      </ul>
                    </div>

                    <h2 class="text-dark font-weight-bold">Observaciones</h2>
                    <div>
                      <p>{{viuda.observaciones}}</p>
                    </div>
                  </div>
                  <div class="col-md-12 mt-5 text-left ">
                    <button class="btn btn-danger" onclick="window.print()">Imprimir <i class="fas fa-file-pdf"></i></button>
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

export default {
  data() {
    return {
      loanding: true,
      viuda: [],
      error: true,
      host: this.$store.getters.getHost
    };
  },
  created() {
    if (this.$route.params.id == null) {
      this.error = true;
      // console.log('Some Query Params are empty')
    } else {
      this.error = false;
      this.GetById(this.$route.params.id);
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
  methods: {
    GetById: async function(_idviuda) {
      const response = await fetch(
        this.host + "/viudas/api/actions/viudas.data.php?id="+_idviuda
      );
      const data = await response.json();
      this.viuda = await data[0];
      this.loanding = false;
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
