<template>
  <div class="navigation">
    <div v-if="typeUser == 'User'">
      <nav class="navbar navbar-marketing navbar-expand-lg bg-dark navbar-dark">
        <div class="container">
          <a class="navbar-brand text-warning" href="/">Viudas | Usuarios</a
          ><button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto mr-lg-5">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ path: '/' }"
                  >Inicio
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ path: '/viudas' }"
                  >Viudas
                </router-link>
              </li>
            </ul>
            <router-link
              class="btn-primary btn rounded-pill px-4 ml-lg-4"
              to="/viudas"
            >
              ADMINISTRACIÓN <i class="fas fa-id-card ml-1"></i
            ></router-link>
            <a class="btn-danger btn rounded-pill px-4 ml-lg-4" href="/logout"
              >Salir <i class="fas fa-power-off"></i
            ></a>
          </div>
        </div>
      </nav>
    </div>
    <div v-else-if="typeUser == 'Admin'">
      <nav class="navbar navbar-marketing navbar-expand-lg bg-dark navbar-dark">
        <div class="container">
          <a class="navbar-brand text-white" href="/">Viudas | Admin</a
          ><button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto mr-lg-5">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ path: '/admin' }"
                  >Inicio
                </router-link>
              </li>
            </ul>
            <router-link
              class="btn-primary btn rounded-pill px-4 ml-lg-4"
              to="/admin"
            >
              ADMINISTRACIÓN <i class="fas fa-id-card ml-1"></i
            ></router-link>
            <a class="btn-danger btn rounded-pill px-4 ml-lg-4" href="/logout"
              >Salir <i class="fas fa-power-off"></i
            ></a>
          </div>
        </div>
      </nav>
    </div>
    <div v-else class="nav-public">
      <nav class="navbar navbar-marketing navbar-expand-lg bg-dark navbar-dark">
        <div class="container">
          <a class="navbar-brand text-primary" href="/">Viudas</a
          ><button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mr-lg-5">
              <li class="nav-item"><a class="nav-link" href="/">Inicio </a></li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://calvarylasemilla.com/"
                  target="_blank"
                  >Página de la iglesia
                  <i class="fas fa-external-link-square-alt"></i
                ></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin">Admin</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/viudas">Usuario</a>
              </li>
            </ul>
            <a class="btn-primary btn rounded-pill px-4 ml-lg-4" href="/login"
              >Entrar<i class="fas fa-arrow-right ml-1"></i
            ></a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
// import store from "@/store/index"
// store already imported in main.js
import auth from "../router/auth";
// import authProfesor from "../router/authprofesor";

export default {
  data() {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  computed: {
    typeUser() {
      return this.$store.getters.getTypeUser;
    }
  },

  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  }
};
</script>
