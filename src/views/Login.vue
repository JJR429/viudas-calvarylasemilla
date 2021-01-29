<template>
  <div class="singup">
    <div class="login-user" v-if="redirect == '/admin'">
      <header
        class="page-header page-header-dark bg-img-repeat bg-primary"
        style='background-image: url("assets/img/pattern-shapes.png")'
      >
        <div class="page-header-content">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div
                  class="badge badge-marketing badge-pill badge-secondary text-white mb-3"
                >
                  Sección Admin
                </div>
                <h1 class="page-header-title text-dark">
                  Bienvenido Admin
                </h1>
                <p class="text-dark">
                  Esta es la sección Admin, podrás verificar usuarios y ver lista de viudas.
                </p>
              </div>
              <div class="col-lg-4">
                <div class="card rounded-lg text-dark">
                  <div class="card-header py-4 text-dark">Te estamos esperando!</div>
                  <div class="card-body">
                    <form @submit.prevent="loginAdmin">
                      <div class="form-group">
                        <label class="small text-gray-600" for="leadCapEmail"
                          >Usuario / Correo</label
                        >
                        <input
                          v-model="username"
                          class="form-control rounded-pill"
                          type="text"
                        />
                      </div>

                      <div class="form-group">
                        <label class="small text-gray-600" for="leadCapEmail"
                          >Contraseña</label
                        >
                        <input
                          v-model="pass"
                          class="form-control rounded-pill"
                          type="password"
                        />
                      </div>

                      <button
                        class="btn btn-primary btn-marketing btn-block rounded-pill mt-4"
                        type="submit"
                      >
                        Iniciar Sesion!
                      </button>
                    </form>
                  </div>
                  <div class="error mb-3" v-if="error">
                    <span class="text-danger">{{ error_message }}</span>
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
    <div class="login-user" v-else>
      <header
        class="page-header page-header-dark bg-img-repeat bg-dark"
        style='background-image: url("assets/img/pattern-shapes.png")'
      >
        <div class="page-header-content">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div
                  class="badge badge-marketing badge-pill badge-secondary-soft text-secondary mb-3"
                >
                  Sección Usuarios
                </div>
                <h1 class="page-header-title">
                  Entra para administrar la lista de <b class="text-primary">Viudas</b> de Calvary la Semilla!
                </h1>
                <p class="page-header-text">
                 Esta opción es solo para usuarios registrados y verificados. Caso contrario pide a tu pastor que te de un acceso.
                </p>
                <p class="text-white mt-5">¿Aún no tienes una cuenta?</p>
                <router-link
                  class="btn btn-white btn-marketing rounded-pill"
                  :to="{ path: '/registrarse' }"
                  >Regístrate!</router-link
                >
              </div>
              <div class="col-lg-4">
                <div class="card rounded-lg text-dark">
                  <div class="card-header py-4 text-dark">Entra ahora!</div>
                  <div class="card-body">
                    <form @submit.prevent="loginUser">
                      <div class="form-group">
                        <label class="small text-gray-600" for="leadCapEmail"
                          >Usuario / Correo</label
                        >
                        <input
                          v-model="username"
                          class="form-control rounded-pill"
                          type="text"
                        />
                      </div>

                      <div class="form-group">
                        <label class="small text-gray-600" for="leadCapEmail"
                          >Contraseña</label
                        >
                        <input
                          v-model="pass"
                          class="form-control rounded-pill"
                          type="password"
                        />
                      </div>

                      <button
                        class="btn btn-primary btn-marketing btn-block rounded-pill mt-4"
                        type="submit"
                      >
                        Iniciar Sesion!
                      </button>
                    </form>
                  </div>
                  <div class="error mb-3" v-if="error">
                    <span class="text-danger">{{ error_message }}</span>
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
  </div>
</template>
<script>
import auth from "../router/auth";

export default {
  data() {
    return {
      username: "",
      pass: "",
      error: false,
      error_message: "",
      loanding: true
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  methods: {
    loginUser() {
      auth.loginUser(this.username, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true;
          this.error_message =
            "Usuario o Contraseña incorrectos. | Caso contrario comunicarse con Calvary la Semilla.";
        } else {
          this.$router.replace(this.$route.query.redirect || "/viudas");
        }
      });
    },
    loginAdmin() {
      auth.loginAdmin(this.username, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true;
          this.error_message = "Usuario o Contraseña incorrectos. | Caso contrario comunicarse con Admin de Viudas.";
        } else {
          this.$router.replace(this.$route.query.redirect || "/admin");
        }
      });
    }
  }
};
</script>
<style scoped>
.form {
  padding: 0;
  justify-content: center;
}
label {
  display: block;
}
.error {
  color: red;
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin: auto;
}
</style>
