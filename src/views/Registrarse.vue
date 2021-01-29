<template>
  <div class="singup">
    <header
      class="page-header page-header-dark bg-img-repeat bg-info"
      style='background-image: url("assets/img/pattern-shapes.png")'
    >
      <div class="page-header-content">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5">
              <div
                class="badge badge-marketing badge-pill badge-secondary-soft text-secondary mb-3"
              >
                Empieza Ahora!
              </div>
              <h1 class="page-header-title">Regístrate!</h1>
              <p class="text-white">
                Solo para servidores de la Iglesia Calvary la Semilla.
              </p>
              <p class="text-white mt-5">¿Ya tienes una cuenta?</p>
              <router-link
                class="btn btn-white btn-marketing rounded-pill"
                :to="{ path: '/login' }"
                >Iniciar Sesion!</router-link
              >
            </div>
            <div class="col-lg-7">
              <div class="card rounded-lg text-dark">
                <div class="card-header py-4 text-dark">
                  Únete al equipo de Calvary la Semilla.
                </div>
                <div class="card-body">
                  <form @submit.prevent="register">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label
                          class="small text-gray-600"
                          for="leadCapFirstName"
                          >Nombres</label
                        >
                        <input
                          v-model="nombres"
                          class="form-control"
                          type="text"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label class="small text-gray-600" for="leadCapLastName"
                          >Apellidos</label
                        >
                        <input
                          v-model="apellidos"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label class="small text-gray-600" for="leadCapLastName"
                          >Email</label
                        >
                        <input
                          v-model="email"
                          class="form-control"
                          type="email"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label class="small text-gray-600" for="leadCapLastName"
                          >Contraseña</label
                        >
                        <input
                          v-model="password"
                          class="form-control"
                          type="password"
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-primary btn-marketing btn-block rounded-pill mt-4"
                      type="submit"
                    >
                      Registrarse!
                    </button>
                  </form>
                </div>
                <div class="card-footer" v-if="error">
                  <span class="error-message text-danger">
                    {{ error_message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="svg-border-angled text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <polygon points="0,100 100,0 100,100"></polygon>
        </svg>
      </div>
    </header>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      dni: "",
      nombres: "",
      apellidos: "",
      fotourl: "https://www.flaticon.com/svg/static/icons/svg/813/813253.svg",
      tipousuario: "0",
      email: "",
      password: "",
      estado: 0,
      organizacion: 0,
      error: false,
      error_message: "",
      organizaciones: {
        data: [],
        loanding: true
      },
      host: this.$store.getters.getHost
    };
  },
  created() {
    this.getOrganizaciones();
  },
  methods: {
    getOrganizaciones: async function() {
      this.organizaciones.loanding = true;
      const response = await fetch(
        this.host + "/mayvoto/api/actions/organizaciones.php"
      );
      const data = await response.json();
      this.organizaciones.data = await data;
      this.organizaciones.loanding = false;
    },
    verifyInputs() {
      if (!this.validateText(this.nombres)) {
        this.error = true;
        this.error_message = "Ingresa tu Nombre";
        return false;
      }
      if (!this.validateText(this.apellidos)) {
        this.error = true;
        this.error_message = "Ingresa tus Apellidos";
        return false;
      }
      if (!this.validateDNI(this.dni)) {
        this.error = true;
        this.error_message = "Pon un DNI Válido (8 dígitos)";
        return false;
      }
      if (!this.validateSelects(this.tipousuario)) {
        this.error = true;
        this.error_message = "Escoje una opción";
        return false;
      }
      if (!this.validateSelects(this.organizacion)) {
        this.error = true;
        this.error_message = "Escoja una opción";
        return false;
      }
      if (!this.validateEmail(this.email)) {
        this.error = true;
        this.error_message = "Ingrese un corre electrónico válido";
        return false;
      }
      if (!this.validatePass(this.password)) {
        this.error = true;
        this.error_message = "La contraseña debe ser mayor a 4 dígitos";
        return false;
      }
      return true;
    },
    async register() {
      if (this.verifyInputs()) {
        //call axios to sing up
        // then go to singin ==== login
        let _data = new FormData();
        _data.set("dni", this.dni);
        _data.set("nombres", this.nombres);
        _data.set("apellidos", this.apellidos);
        _data.set("fotourl", this.fotourl);
        _data.set("tipousuario", this.tipousuario);
        _data.set("email", this.email);
        _data.set("password", this.password);
        _data.set("estado", this.estado);
        _data.set("organizacion", this.organizacion);
        // console.log(_user.username +' | '+ _user.password)
        axios({
          method: "post",
          url: this.host + "/mayvoto/api/actions/register.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            //handle response
            if (!response.data.error) {
              if (this.tipousuario == "Votante") {
                this.$router.replace(this.$route.query.redirect || "/login");
              }
              if (this.tipousuario == "Organizador") {
                this.$router.replace(
                  this.$route.query.redirect ||
                    "/login?redirect=%2Forganizadores"
                );
              }
              if (this.tipousuario == "Supervisor") {
                this.$router.replace(
                  this.$route.query.redirect ||
                    "/login?redirect=%2Fsupervisores"
                );
              }
            } else {
              //api sends 2 type of errors by code
              //1: Email exists; 2: Error while inserting
              this.error = true;
              if (response.data.code == 1) {
                this.error_message =
                  "El correo eléctronico o DNI ya esta registrado, intenta con otro!";
              } else {
                this.error_message =
                  "Upps, tenemos problemas para registrarte!";
              }
            }
          })
          .catch(response => {
            //handle error
            this.error = true;
            console.log(response);
          });
      }
    },
    validateEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(email);
    },
    validateText: function(text) {
      return text.length > 1 ? true : false;
    },
    validatePass: function(pass) {
      return pass.length > 3 ? true : false;
    },
    validateSelects: function(value) {
      return value != 0 ? true : false;
    },
    validateDNI: function(str) {
      return str.length == 8 ? true : false;
    }
  }
};
</script>
<style scoped>
.icon-gender {
  width: 50px;
}
</style>
