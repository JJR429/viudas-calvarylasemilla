<template>
  <div class="dashboard">
    <header class="mt-5 page-header-light bg-white" v-if="!loanding">
      <div v-if="typeUser != 'User'">
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
                <h1 class="text-dark font-weight-bold">
                  {{ currentUser.nombres }}
                </h1>
                <p class="page-header-text">
                  Manejo completo de viudas
                </p>
              </div>

              <div class="col-xl-8 col-lg-10 text-center pt-2">
                <div class="row d-flex justify-content-between mb-4">
                  <!-- Header section for buttons {create} -->
                  <div>
                    <h1 class="text-capitalize text-dark font-weight-bold">
                      Viudas
                    </h1>
                  </div>
                  <div>
                    <button
                      class="btn btn-primary rounded-pill flit"
                      @click="openModalSave()"
                      ref="btnSave"
                    >
                      Agregar Viuda <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-2 col-md-12" v-if="!viudas.loanding">
                    <div
                      v-if="viudas.data.length > 0"
                      class="list-group list-group-flush text-left"
                    >
                      <div
                        v-for="(viuda, index) in viudas.data"
                        v-bind:todo="viuda"
                        v-bind:key="viuda.id"
                      >
                        <!-- v-ifs according to status -->
                        <div class="card mb-2" v-if="viuda.estado == 1">
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
                                    {{ viuda.nombres }} {{ viuda.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    <i class="fas fa-map-marker-alt"></i>
                                    {{ viuda.region }}, {{ viuda.ciudad }}
                                  </p>
                                  <router-link
                                    :to="{
                                      name: 'detalleViuda',
                                      params: { id: viuda.id }
                                    }"
                                    class="btn btn-sm btn-dark text-primary"
                                  >
                                    Ver Detalles
                                  </router-link>
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
                                    @click="updateEstado(viuda.id, 0)"
                                  >
                                    <i class="fas fa-hand-paper"></i>
                                    <span class="hide-on-mobile">
                                      Observar</span
                                    >
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-2" v-if="viuda.estado == 0">
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
                                    {{ viuda.nombres }} {{ viuda.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    <i class="fas fa-map-marker-alt"></i>
                                    {{ viuda.region }}, {{ viuda.ciudad }}
                                  </p>
                                  <router-link
                                    :to="{
                                      name: 'detalleViuda',
                                      params: { id: viuda.id }
                                    }"
                                    class="btn btn-sm btn-dark text-primary"
                                  >
                                    Ver Detalles
                                  </router-link>
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
                                    <span class="hide-on-mobile"> Editar</span>
                                  </button>

                                  <button
                                    class="btn btn-xs btn-red-soft ml-2 mr-2 text-red"
                                    @click="updateEstado(viuda.id, 2)"
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                    <span class="hide-on-mobile">
                                      Papelera</span
                                    >
                                  </button>
                                </div>
                                <!-- If es director, mostrar estas opciones -->
                                <div class="mt-2">
                                  <!-- Si estado 0, o 2 :: 0: No plubicado, 1: Publicado, 2: Obervado -->
                                  <button
                                    class="btn btn-xs btn-green-soft ml-2 mr-2 text-green"
                                    v-on:click="updateEstado(viuda.id, 1)"
                                  >
                                    <i class="fas fa-laptop"></i>
                                    <span class="hide-on-mobile"> Activar</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-2" v-if="viuda.estado == 2">
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
                                    {{ viuda.nombres }} {{ viuda.apellidos }}
                                  </h2>
                                  <p class="card-text">
                                    <i class="fas fa-map-marker-alt"></i>
                                    {{ viuda.region }}, {{ viuda.ciudad }}
                                  </p>
                                  <router-link
                                    :to="{
                                      name: 'detalleViuda',
                                      params: { id: viuda.id }
                                    }"
                                    class="btn btn-sm btn-dark text-primary"
                                  >
                                    Ver Detalles
                                  </router-link>
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
                                    @click="updateEstado(viuda.id, 0)"
                                  >
                                    <i class="fas fa-flag"></i>
                                    <span class="hide-on-mobile">
                                      Observar</span
                                    >
                                  </button>
                                  <button
                                    class="btn btn-xs btn-red ml-2 mr-2 text-white"
                                    @click="openModalDelete(index)"
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                    <span class="hide-on-mobile">
                                      Eliminar por completo</span
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
        <b-modal id="modalSave" centered size="lg">
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">Agregar una Viuda</h3>
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
                  >DNI</label
                >
                <input
                  v-model="ToSave.dni"
                  class="form-control"
                  type="number"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Nacimiento</label
                >
                <input
                  v-model="ToSave.fecha_nacimiento"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Región</label
                >
                <input
                  v-model="ToSave.region"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Ciudad</label
                >
                <input
                  v-model="ToSave.ciudad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Celular</label
                >
                <input
                  v-model="ToSave.celular"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Dirección</label
                >
                <input
                  v-model="ToSave.direccion"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Referencia</label
                >
                <input
                  v-model="ToSave.referencia"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Trabajo?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.tiene_trabajo"
                      name="radio_tiene_trabajo"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.tiene_trabajo"
                      name="radio_tiene_trabajo"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Trabajo Remunerado?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.trabajo_remunerado"
                      name="radio_trabajo_remunerado"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.trabajo_remunerado"
                      name="radio_trabajo_remunerado"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Pensión 65?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.tiene_pension_65"
                      name="radio_tiene_pension_65"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.tiene_pension_65"
                      name="radio_tiene_pension_65"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Seguro?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.tiene_seguro"
                      name="radio_tiene_seguro"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.tiene_seguro"
                      name="radio_tiene_seguro"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Discapacidad?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.tiene_discapacidad"
                      name="radio_tiene_discapacidad"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.tiene_discapacidad"
                      name="radio_tiene_discapacidad"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Discapacidad</label
                >
                <input
                  :disabled="
                    ToSave.tiene_discapacidad == 0 ||
                      ToSave.tiene_discapacidad == null
                  "
                  v-model="ToSave.discapacidad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="Toma Medicamentos?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.toma_medicamentos"
                      name="radio_toma_medicamentos"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.toma_medicamentos"
                      name="radio_toma_medicamentos"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descripción de Medicamentos</label
                >
                <textarea
                  :disabled="
                    ToSave.toma_medicamentos == 0 ||
                      ToSave.toma_medicamentos == null
                  "
                  v-model="ToSave.descripcion_medicamentos"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Viuda desde</label
                >
                <input
                  v-model="ToSave.viuda_desde"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre Pareja</label
                >
                <input
                  v-model="ToSave.nombre_pareja"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Religión</label
                >
                <input
                  v-model="ToSave.religion"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="Sabe de Dios?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.sabe_de_dios"
                      name="radio_sabe_de_dios"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.sabe_de_dios"
                      name="radio_sabe_de_dios"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Conoce de Dios?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.conoce_de_dios"
                      name="radio_conoce_de_dios"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.conoce_de_dios"
                      name="radio_conoce_de_dios"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene una relación con Jesus?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.relacion_con_jesus"
                      name="radio_relacion_con_jesus"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.relacion_con_jesus"
                      name="radio_relacion_con_jesus"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha que acepto Jesus</label
                >
                <input
                  :disabled="
                    ToSave.relacion_con_jesus == 0 ||
                      ToSave.relacion_con_jesus == null
                  "
                  v-model="ToSave.fecha_de_aceptacion"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Asite a una Iglesia?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.asiste_a_una_iglesia"
                      name="radio_asiste_a_una_iglesia"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.asiste_a_una_iglesia"
                      name="radio_asiste_a_una_iglesia"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre de Iglesia</label
                >
                <input
                  :disabled="
                    ToSave.asiste_a_una_iglesia == 0 ||
                      ToSave.asiste_a_una_iglesia == null
                  "
                  v-model="ToSave.iglesia"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >¿Desde que fecha asiste a una iglesia?</label
                >
                <input
                  :disabled="
                    ToSave.asiste_a_una_iglesia == 0 ||
                      ToSave.asiste_a_una_iglesia == null
                  "
                  v-model="ToSave.desde_que_fecha"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Le Interesa Jesus?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToSave.le_interesa_jesus"
                      name="radio_le_interesa_jesus"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToSave.le_interesa_jesus"
                      name="radio_le_interesa_jesus"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Estado
                </label>
                <select
                  v-model="ToSave.estado"
                  class="form-control rounded-pill"
                >
                  <option value="1" selected>Activo</option>
                  <option value="0">Observado</option>
                </select>
              </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Observaciones</label
                >
                <textarea v-model="ToSave.observaciones" class="form-control" />
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
              class="btn btn-dark text-blue rounded-pill"
              @click="saveViuda"
              ref="btnSave"
            >
              Agregar Viuda
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

        <!-- Modal Update Viuda -->
        <b-modal id="modalUpdate" centered size="lg">
          <template v-slot:modal-header="">
            <h3 class="modal-title text-blue">
              Editar Viuda
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
                  >DNI</label
                >
                <input
                  v-model="ToUpdate.dni"
                  class="form-control"
                  type="number"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Nacimiento</label
                >
                <input
                  v-model="ToUpdate.fecha_nacimiento"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Región</label
                >
                <input
                  v-model="ToUpdate.region"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Ciudad</label
                >
                <input
                  v-model="ToUpdate.ciudad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Celular</label
                >
                <input
                  v-model="ToUpdate.celular"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Dirección</label
                >
                <input
                  v-model="ToUpdate.direccion"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Referencia</label
                >
                <input
                  v-model="ToUpdate.referencia"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Trabajo?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.tiene_trabajo"
                      name="update_radio_tiene_trabajo"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.tiene_trabajo"
                      name="update_radio_tiene_trabajo"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Trabajo Remunerado?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.trabajo_remunerado"
                      name="update_radio_trabajo_remunerado"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.trabajo_remunerado"
                      name="update_radio_trabajo_remunerado"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Pensión 65?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.tiene_pension_65"
                      name="update_radio_tiene_pension_65"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.tiene_pension_65"
                      name="update_radio_tiene_pension_65"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Seguro?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.tiene_seguro"
                      name="update_radio_tiene_seguro"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.tiene_seguro"
                      name="update_radio_tiene_seguro"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene Discapacidad?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.tiene_discapacidad"
                      name="update_radio_tiene_discapacidad"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.tiene_discapacidad"
                      name="update_radio_tiene_discapacidad"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Discapacidad</label
                >
                <input
                  :disabled="
                    ToUpdate.tiene_discapacidad == 0 ||
                      ToUpdate.tiene_discapacidad == null
                  "
                  v-model="ToUpdate.discapacidad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="Toma Medicamentos?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.toma_medicamentos"
                      name="update_radio_toma_medicamentos"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.toma_medicamentos"
                      name="update_radio_toma_medicamentos"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descripción de Medicamentos</label
                >
                <textarea
                  :disabled="
                    ToUpdate.toma_medicamentos == 0 ||
                      ToUpdate.toma_medicamentos == null
                  "
                  v-model="ToUpdate.descripcion_medicamentos"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Viuda desde</label
                >
                <input
                  v-model="ToUpdate.viuda_desde"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre Pareja</label
                >
                <input
                  v-model="ToUpdate.nombre_pareja"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Religión</label
                >
                <input
                  v-model="ToUpdate.religion"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="Sabe de Dios?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.sabe_de_dios"
                      name="update_radio_sabe_de_dios"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.sabe_de_dios"
                      name="update_radio_sabe_de_dios"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Conoce de Dios?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.conoce_de_dios"
                      name="update_radio_conoce_de_dios"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.conoce_de_dios"
                      name="update_radio_conoce_de_dios"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Tiene una relación con Jesus?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.relacion_con_jesus"
                      name="update_radio_relacion_con_jesus"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.relacion_con_jesus"
                      name="update_radio_relacion_con_jesus"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha que acepto Jesus</label
                >
                <input
                  :disabled="
                    ToUpdate.relacion_con_jesus == 0 ||
                      ToUpdate.relacion_con_jesus == null
                  "
                  v-model="ToUpdate.fecha_de_aceptacion"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Asite a una Iglesia?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.asiste_a_una_iglesia"
                      name="update_radio_asiste_a_una_iglesia"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.asiste_a_una_iglesia"
                      name="update_radio_asiste_a_una_iglesia"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre de Iglesia</label
                >
                <input
                  :disabled="
                    ToUpdate.asiste_a_una_iglesia == 0 ||
                      ToUpdate.asiste_a_una_iglesia == null
                  "
                  v-model="ToUpdate.iglesia"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >¿Desde que fecha asiste a una iglesia?</label
                >
                <input
                  :disabled="
                    ToUpdate.asiste_a_una_iglesia == 0 ||
                      ToUpdate.asiste_a_una_iglesia == null
                  "
                  v-model="ToUpdate.desde_que_fecha"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group
                  label="¿Le Interesa Jesus?"
                  class="small text-gray-600"
                >
                  <div class="d-flex">
                    <b-form-radio
                      class="mr-2"
                      v-model="ToUpdate.le_interesa_jesus"
                      name="update_radio_le_interesa_jesus"
                      value="1"
                      >SI</b-form-radio
                    >
                    <b-form-radio
                      class="ml-2"
                      v-model="ToUpdate.le_interesa_jesus"
                      name="update_radio_le_interesa_jesus"
                      value="0"
                      >NO</b-form-radio
                    >
                  </div>
                </b-form-group>
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Estado
                </label>
                <select
                  v-model="ToUpdate.estado"
                  class="form-control rounded-pill"
                >
                  <option value="1" selected>Activo</option>
                  <option value="0">Observado</option>
                </select>
              </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Observaciones</label
                >
                <textarea
                  v-model="ToUpdate.observaciones"
                  class="form-control"
                />
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
              class="btn btn-dark text-blue rounded-pill"
              @click="updateViuda"
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
              Estás a punto de eliminar esta Viuda:
            </h3>
          </template>
          <template v-slot:default="">
            <h4 class="text-red">
              {{ ToDelete.nombres }} {{ ToDelete.apellidos }}
            </h4>
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
              @click="deleteViuda"
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
      viudas: {
        data: [],
        loanding: true
      },
      ToSave: {
        nombres: "",
        apellidos: "",
        dni: "",
        fecha_nacimiento: "",
        region: "",
        ciudad: "",
        direccion: "",
        referencia: "",
        celular: "",
        tiene_trabajo: null,
        trabajo_remunerado: null,
        tiene_pension_65: null,
        tiene_seguro: null,
        tiene_discapacidad: null,
        discapacidad: "",
        toma_medicamentos: null,
        descripcion_medicamentos: "",
        viuda_desde: "",
        nombre_pareja: "",
        religion: "",
        sabe_de_dios: null,
        conoce_de_dios: null,
        relacion_con_jesus: null,
        fecha_de_aceptacion: "",
        asiste_a_una_iglesia: null,
        iglesia: "",
        desde_que_fecha: "",
        le_interesa_jesus: null,
        observaciones: "",
        estado: 1,
        error: false,
        error_message: ""
      },
      ToUpdate: {
        id: 0,
        nombres: "",
        apellidos: "",
        dni: "",
        fecha_nacimiento: "",
        region: "",
        ciudad: "",
        direccion: "",
        referencia: "",
        celular: "",
        tiene_trabajo: null,
        trabajo_remunerado: null,
        tiene_pension_65: null,
        tiene_seguro: null,
        tiene_discapacidad: null,
        discapacidad: "",
        toma_medicamentos: null,
        descripcion_medicamentos: "",
        viuda_desde: "",
        nombre_pareja: "",
        religion: "",
        sabe_de_dios: null,
        conoce_de_dios: null,
        relacion_con_jesus: null,
        fecha_de_aceptacion: "",
        asiste_a_una_iglesia: null,
        iglesia: "",
        desde_que_fecha: "",
        le_interesa_jesus: null,
        observaciones: "",
        estado: 1,
        error: false,
        error_message: ""
      },
      ToDelete: {
        id: 0,
        nombres: "",
        apellidos: ""
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
    this.getViudas();
  },
  mounted() {
    // getter
    // this.currentUser = this.$store.getters.getCurrentUserData
    this.loanding = false;
  },
  methods: {
    getViudas: async function() {
      this.viudas.loanding = true;
      const response = await fetch(
        this.host + "/viudas/api/actions/viudas.data.php"
      );
      const data = await response.json();
      this.viudas.data = await data;
      this.viudas.loanding = false;
    },
    saveViuda: async function() {
      if (this.verifyInputsToSave()) {
        let _data = new FormData();
        _data.set("nombres", this.ToSave.nombres);
        _data.set("apellidos", this.ToSave.apellidos);
        _data.set("dni", this.ToSave.dni);
        _data.set("fecha_nacimiento", this.ToSave.fecha_nacimiento);
        _data.set("region", this.ToSave.region);
        _data.set("ciudad", this.ToSave.ciudad);
        _data.set("direccion", this.ToSave.direccion);
        _data.set("referencia", this.ToSave.referencia);
        _data.set("celular", this.ToSave.celular);
        _data.set("tiene_trabajo", this.ToSave.tiene_trabajo);
        _data.set("trabajo_remunerado", this.ToSave.trabajo_remunerado);
        _data.set("tiene_pension_65", this.ToSave.tiene_pension_65);
        _data.set("tiene_seguro", this.ToSave.tiene_seguro);
        _data.set("tiene_discapacidad", this.ToSave.tiene_discapacidad);
        _data.set("discapacidad", this.ToSave.discapacidad);
        _data.set("toma_medicamentos", this.ToSave.toma_medicamentos);
        _data.set(
          "descripcion_medicamentos",
          this.ToSave.descripcion_medicamentos
        );
        _data.set("viuda_desde", this.ToSave.viuda_desde);
        _data.set("nombre_pareja", this.ToSave.nombre_pareja);
        _data.set("religion", this.ToSave.religion);
        _data.set("sabe_de_dios", this.ToSave.sabe_de_dios);
        _data.set("conoce_de_dios", this.ToSave.conoce_de_dios);
        _data.set("relacion_con_jesus", this.ToSave.relacion_con_jesus);
        _data.set("fecha_de_aceptacion", this.ToSave.fecha_de_aceptacion);
        _data.set("asiste_a_una_iglesia", this.ToSave.asiste_a_una_iglesia);
        _data.set("iglesia", this.ToSave.iglesia);
        _data.set("desde_que_fecha", this.ToSave.desde_que_fecha);
        _data.set("le_interesa_jesus", this.ToSave.le_interesa_jesus);
        _data.set("observaciones", this.ToSave.observaciones);
        _data.set("estado", this.ToSave.estado);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/viuda.save.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            //handle response
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalSave", "#btnSave");
              this.getViudas();
              this.resetToSave();
            } else {
              console.log("Error on save!");
            }
          })
          .catch(response => {
            //handle error
            this.error = true;
            console.log(response);
          });
      }
    },
    updateViuda: async function() {
      if (this.verifyInputsToUpdate()) {
        let _data = new FormData();
        _data.set("id", this.ToUpdate.id);
        _data.set("nombres", this.ToUpdate.nombres);
        _data.set("apellidos", this.ToUpdate.apellidos);
        _data.set("dni", this.ToUpdate.dni);
        _data.set("fecha_nacimiento", this.ToUpdate.fecha_nacimiento);
        _data.set("region", this.ToUpdate.region);
        _data.set("ciudad", this.ToUpdate.ciudad);
        _data.set("direccion", this.ToUpdate.direccion);
        _data.set("referencia", this.ToUpdate.referencia);
        _data.set("celular", this.ToUpdate.celular);
        _data.set("tiene_trabajo", this.ToUpdate.tiene_trabajo);
        _data.set("trabajo_remunerado", this.ToUpdate.trabajo_remunerado);
        _data.set("tiene_pension_65", this.ToUpdate.tiene_pension_65);
        _data.set("tiene_seguro", this.ToUpdate.tiene_seguro);
        _data.set("tiene_discapacidad", this.ToUpdate.tiene_discapacidad);
        _data.set("discapacidad", this.ToUpdate.discapacidad);
        _data.set("toma_medicamentos", this.ToUpdate.toma_medicamentos);
        _data.set(
          "descripcion_medicamentos",
          this.ToUpdate.descripcion_medicamentos
        );
        _data.set("viuda_desde", this.ToUpdate.viuda_desde);
        _data.set("nombre_pareja", this.ToUpdate.nombre_pareja);
        _data.set("religion", this.ToUpdate.religion);
        _data.set("sabe_de_dios", this.ToUpdate.sabe_de_dios);
        _data.set("conoce_de_dios", this.ToUpdate.conoce_de_dios);
        _data.set("relacion_con_jesus", this.ToUpdate.relacion_con_jesus);
        _data.set("fecha_de_aceptacion", this.ToUpdate.fecha_de_aceptacion);
        _data.set("asiste_a_una_iglesia", this.ToUpdate.asiste_a_una_iglesia);
        _data.set("iglesia", this.ToUpdate.iglesia);
        _data.set("desde_que_fecha", this.ToUpdate.desde_que_fecha);
        _data.set("le_interesa_jesus", this.ToUpdate.le_interesa_jesus);
        _data.set("observaciones", this.ToUpdate.observaciones);
        _data.set("estado", this.ToUpdate.estado);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/viuda.update.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalUpdate", "#btnUpdate");
              this.getViudas();
              console.log(response.data);
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
        url: this.host + "/viudas/api/actions/viuda.update.estado.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.getViudas();
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
    deleteViuda: async function() {
      let _data = new FormData();
      _data.set("id", this.ToDelete.id);
      axios({
        method: "post",
        url: this.host + "/viudas/api/actions/viuda.delete.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.$root.$emit("bv::hide::modal", "modalDelete", "#btnDelete");
            this.getViudas();
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
        this.ToSave.error_message = "Ingrese nombres";
        return false;
      }
      if (!this.validateText(this.ToSave.apellidos)) {
        this.ToSave.error = true;
        this.ToSave.error_message = "Ingrese apellidos";
        return false;
      }
      if (!this.validateText(this.ToSave.dni)) {
        this.ToSave.error = true;
        this.ToSave.error_message = "Ingrese DNI";
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
        this.ToUpdate.error_message = "Ingrese nombres";
        return false;
      }
      if (!this.validateText(this.ToUpdate.apellidos)) {
        this.ToUpdate.error = true;
        this.ToUpdate.error_message = "Ingrese apellidos";
        return false;
      }
      if (!this.validateDNI(this.ToUpdate.dni)) {
        this.ToUpdate.error = true;
        this.ToUpdate.error_message = "Ingrese un DNI válido";
        return false;
      }
      return true;
    },
    openModalSave: function() {
      this.$root.$emit("bv::show::modal", "modalSave", "#btnSave");
    },
    resetToSave: function() {
      this.ToSave.nombres = "";
      this.ToSave.apellidos = "";
      this.ToSave.dni = "";
      this.ToSave.fecha_nacimiento = "";
      this.ToSave.region = "";
      this.ToSave.ciudad = "";
      this.ToSave.direccion = "";
      this.ToSave.referencia = "";
      this.ToSave.celular = "";
      this.ToSave.tiene_trabajo = null;
      this.ToSave.trabajo_remunerado = null;
      this.ToSave.tiene_pension_65 = null;
      this.ToSave.tiene_seguro = null;
      this.ToSave.tiene_discapacidad = null;
      this.ToSave.discapacidad = "";
      this.ToSave.toma_medicamentos = null;
      this.ToSave.descripcion_medicamentos = "";
      this.ToSave.viuda_desde = "";
      this.ToSave.nombre_pareja = "";
      this.ToSave.religion = "";
      this.ToSave.sabe_de_dios = null;
      this.ToSave.conoce_de_dios = null;
      this.ToSave.relacion_con_jesus = null;
      this.ToSave.fecha_de_aceptacion = "";
      this.ToSave.asiste_a_una_iglesia = null;
      this.ToSave.iglesia = "";
      this.ToSave.desde_que_fecha = "";
      this.ToSave.le_interesa_jesus = null;
      this.ToSave.observaciones = null;
      this.ToSave.estado = 1;
    },
    openModalUpdate: function(_index) {
      this.$root.$emit("bv::show::modal", "modalUpdate", "#btnUpdate");
      this.ToUpdate.id = this.viudas.data[_index].id;
      this.ToUpdate.nombres = this.viudas.data[_index].nombres;
      this.ToUpdate.apellidos = this.viudas.data[_index].apellidos;
      this.ToUpdate.dni = this.viudas.data[_index].dni;
      this.ToUpdate.fecha_nacimiento = this.viudas.data[
        _index
      ].fecha_nacimiento;
      this.ToUpdate.region = this.viudas.data[_index].region;
      this.ToUpdate.ciudad = this.viudas.data[_index].ciudad;
      this.ToUpdate.direccion = this.viudas.data[_index].direccion;
      this.ToUpdate.referencia = this.viudas.data[_index].referencia;
      this.ToUpdate.celular = this.viudas.data[_index].celular;
      this.ToUpdate.tiene_trabajo = this.viudas.data[_index].tiene_trabajo;
      this.ToUpdate.trabajo_remunerado = this.viudas.data[
        _index
      ].trabajo_remunerado;
      this.ToUpdate.tiene_pension_65 = this.viudas.data[
        _index
      ].tiene_pension_65;
      this.ToUpdate.tiene_seguro = this.viudas.data[_index].tiene_seguro;
      this.ToUpdate.tiene_discapacidad = this.viudas.data[
        _index
      ].tiene_discapacidad;
      this.ToUpdate.discapacidad = this.viudas.data[_index].discapacidad;
      this.ToUpdate.toma_medicamentos = this.viudas.data[
        _index
      ].toma_medicamentos;
      this.ToUpdate.descripcion_medicamentos = this.viudas.data[
        _index
      ].descripcion_medicamentos;
      this.ToUpdate.viuda_desde = this.viudas.data[_index].viuda_desde;
      this.ToUpdate.nombre_pareja = this.viudas.data[_index].nombre_pareja;
      this.ToUpdate.religion = this.viudas.data[_index].religion;
      this.ToUpdate.sabe_de_dios = this.viudas.data[_index].sabe_de_dios;
      this.ToUpdate.conoce_de_dios = this.viudas.data[_index].conoce_de_dios;
      this.ToUpdate.relacion_con_jesus = this.viudas.data[
        _index
      ].relacion_con_jesus;
      this.ToUpdate.fecha_de_aceptacion = this.viudas.data[
        _index
      ].fecha_de_aceptacion;
      this.ToUpdate.asiste_a_una_iglesia = this.viudas.data[
        _index
      ].asiste_a_una_iglesia;
      this.ToUpdate.iglesia = this.viudas.data[_index].iglesia;
      this.ToUpdate.desde_que_fecha = this.viudas.data[_index].desde_que_fecha;
      this.ToUpdate.le_interesa_jesus = this.viudas.data[
        _index
      ].le_interesa_jesus;
      this.ToUpdate.observaciones = this.viudas.data[_index].observaciones;
      this.ToUpdate.estado = this.viudas.data[_index].estado;
    },
    openModalDelete: function(_index) {
      this.ToDelete.id = this.viudas.data[_index].id;
      this.ToDelete.nombres = this.viudas.data[_index].nombres;
      this.ToDelete.apellidos = this.viudas.data[_index].apellidos;
      this.$root.$emit("bv::show::modal", "modalDelete", "#btnDelete");
    },
    validateText: function(str) {
      return str.length > 1 ? true : false;
    },
    validateDNI: function(str) {
      return str.length == 8 ? true : false;
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
