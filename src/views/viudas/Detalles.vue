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
                        name: 'viudas'
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
                <p class="page-header-text">
                  <span class="text-white px-2 py-2 rounded bg-green" v-if="viuda.estado == 1"><i class="fas fa-exclamation-triangle"></i> ACTIVO</span>
                  <span class="text-dark px-2 py-2 rounded bg-yellow" v-if="viuda.estado == 0"><i class="fas fa-exclamation-triangle"></i> OBSERVADO</span>
                  <span class="text-danger px-2 py-2 rounded bg-danger-soft" v-if="viuda.estado == 2"><i class="fas fa-exclamation-triangle"></i> EN PAPELERA</span>
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
                  <div class="col-md-12 row text-left">
                    <div class="col-md-12"><hr></div>
                    <div class="col-md-12">
                        <div class="row d-flex justify-content-between mb-4">
                            <!-- Header section for buttons {create} -->
                            <div>
                                <h2 class="text-capitalize text-dark font-weight-bold">
                                Hijos e Hijas ({{viuda.hijos.length}})
                                </h2>
                            </div>
                            <div>
                                <button
                                class="btn btn-primary rounded-pill flit"
                                @click="openModalSaveHijo()"
                                ref="btnSaveHijo"
                                >
                                Agregar Hijo(a) <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>

                            <div
                            v-if="viuda.hijos.length > 0"
                            class="list-group list-group-flush text-left"
                            >
                                <div
                                    v-for="(hijo, index) in viuda.hijos"
                                    v-bind:todo="hijo"
                                    v-bind:key="hijo.id"
                                    >
                                    <div class="card mb-2">
                                         <div class="list-group-item list-group-item-action py-4" >
                                            <div class="d-flex justify-content-between">
                                                <div class="mr-4 d-flex">
                                                    <div>
                                                    <h2 class="text-green">
                                                        {{hijo.nombres}} {{hijo.apellidos}}
                                                    </h2>
                                                    <p class="card-text">
                                                        Sexo: <b>{{hijo.sexo == 0 ? "FEMENINO" : "MASCULINO"}}</b><br>
                                                        ¿Con Discapacidad? <b>{{hijo.tiene_discapacidad == 1 ? "SI" : "NO"}}</b><br>
                                                        <span v-if="hijo.tiene_discapacidad==1">Descripción:  {{hijo.discapacidad}}</span> 
                                                    </p>
                                                    </div>
                                                </div>
                                                <div class="small text-dark flex-shrink-0 text-right">
                                                    
                                                    <div class="mt-2">
                                                    <button
                                                        class="btn btn-xs btn-indigo-soft ml-2 mr-2 text-indigo"
                                                        @click="openModalUpdateHijo(index)"
                                                        ref="btnUpdateHijo"
                                                    >
                                                        <i class="fas fa-edit"></i>
                                                        <span class="hide-on-mobile"> Editar</span>
                                                    </button>
                                                    </div>
                                                    <!-- If es director, mostrar estas opciones -->
                                                    <div class="mt-2">
                                                        <button
                                                            class="btn btn-xs btn-red ml-2 mr-2 text-white"
                                                            @click="openModalDeleteHijo(index)"
                                                        >
                                                            <i class="fas fa-trash-alt"></i>
                                                            <span class="hide-on-mobile"
                                                            > Eliminar</span
                                                            >
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <span>No Hay hijos </span>
                            </div>
                            <div>
                        </div>
                    </div>

                    <div class="col-md-12"><hr></div>
                    


                    <div class="col-md-12">
                        <div class="row d-flex justify-content-between mb-4">
                            <!-- Header section for buttons {create} -->
                            <div>
                                <h2 class="text-capitalize text-dark font-weight-bold">
                                Visitas ({{viuda.visitas.length}})
                                </h2>
                            </div>
                            <div>
                                <button
                                class="btn btn-primary rounded-pill flit"
                                @click="openModalSaveVisita()"
                                ref="btnSaveVisita"
                                >
                                Agregar Visita <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>

                            <div
                            v-if="viuda.hijos.length > 0"
                            class="list-group list-group-flush text-left"
                            >
                                <div
                                    v-for="(visita, index) in viuda.visitas"
                                    v-bind:todo="visita"
                                    v-bind:key="visita.id"
                                >

                                    <div class="card mb-2">
                                        <div
                                            class="list-group-item list-group-item-action py-4"
                                        >
                                            <div class="d-flex justify-content-between">
                                            <div class="mr-4 d-flex">
                                                <div>
                                                <h2 class="text-green">
                                                    Visita {{index+1}}
                                                </h2>
                                                <p class="card-text">
                                                    <small>Fecha Visita: {{visita.fecha_visita}}</small><br>
                                                    {{visita.descripcion}}
                                                </p>
                                                    <small>Visita registrada por: <span class="text-dark">{{visita.user_nombres}} {{visita.user_apellidos}}</span></small>
                                                </div>
                                            </div>
                                            <div
                                                class="small text-dark flex-shrink-0 text-right"
                                            >
                                                
                                                <div class="mt-2">
                                                <button
                                                    class="btn btn-xs btn-indigo-soft ml-2 mr-2 text-indigo"
                                                    @click="openModalUpdateVisita(index)"
                                                    ref="btnUpdateVisita"
                                                >
                                                    <i class="fas fa-edit"></i>
                                                    <span class="hide-on-mobile"> Editar</span>
                                                </button>
                                                </div>
                                                <!-- If es director, mostrar estas opciones -->
                                                <div class="mt-2">
                                                    <button
                                                        class="btn btn-xs btn-red ml-2 mr-2 text-white"
                                                        @click="openModalDeleteVisita(index)"
                                                        ref="btnDeleteVisita"
                                                    >
                                                        <i class="fas fa-trash-alt"></i>
                                                        <span class="hide-on-mobile"
                                                        > Eliminar</span
                                                        >
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <span>No Hay Visitas </span>
                            </div>
                            <div>
                        </div>
                    </div>



                  </div>
                  
                  <div class="col-md-12 mt-5 text-left ">
                      <hr>
                    <button class="btn btn-primary mx-2" @click="openModalUpdate()" ref="btnUpdateHijo">Editar <i class="fas fa-file-pdf"></i></button>
                    <button class="btn btn-dark mx-2" onclick="window.print()">Imprimir <i class="fas fa-file-pdf"></i></button>
                    <hr>
                    <h4 class="mt-2">¿Quieres más opciones de estado (observar, eliminar)?</h4>
                    <router-link
                      :to="{
                        name: 'viudas'
                      }"
                      class="btn btn-primary rounded-pill"
                      ><i class="fas fa-arrow-left"></i> Regresar y editar</router-link
                    >
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


            <!-- Modal Save -->
        <b-modal id="modalSaveHijo" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">Agregar Hijo(a)</h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombres</label
                >
                <input
                  v-model="hijoToSave.nombres"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Apellidos</label
                >
                <input
                  v-model="hijoToSave.apellidos"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Nacimiento</label
                >
                <input
                  v-model="hijoToSave.fecha_nacimiento"
                  class="form-control"
                  type="date"
                />
              </div>

              <div class="form-group col-md-6 text-left">
                <b-form-group label="Sexo" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="hijoToSave.sexo" name="radio_sexo" value="0">FEMENINO</b-form-radio>
                    <b-form-radio class="ml-2" v-model="hijoToSave.sexo" name="radio_sexo" value="1">MASCULINO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left pl-0">
                <b-form-group label="¿Vive con la Viuda?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="hijoToSave.vive_con_viuda" name="radio_vive_con_viuda" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="hijoToSave.vive_con_viuda" name="radio_vive_con_viuda" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                 <b-form-group label="¿Tiene Discapacidad?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="hijoToSave.tiene_discapacidad" name="radio_tiene_discapacidad" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="hijoToSave.tiene_discapacidad" name="radio_tiene_discapacidad" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Discapacidad</label
                >
                <input :disabled="hijoToSave.tiene_discapacidad == 0 || hijoToSave.tiene_discapacidad == null" 
                  v-model="hijoToSave.discapacidad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            

            <div class="error-modal" v-if="hijoToSave.error">
              <span class="text-red"> {{ hijoToSave.error_message }}</span>
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
              @click="saveHijo"
              ref="btnSaveHijo"
            >
              Agregar Hijo(a)
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

        <!-- Modal Update Curso -->
        <b-modal id="modalUpdateHijo" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">
              Editar Hijo(a) de
              <span class="font-weight-bold">{{ hijoToUpdate.name }}</span>
            </h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombres</label
                >
                <input
                  v-model="hijoToUpdate.nombres"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Apellidos</label
                >
                <input
                  v-model="hijoToUpdate.apellidos"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Nacimiento</label
                >
                <input
                  v-model="hijoToUpdate.fecha_nacimiento"
                  class="form-control"
                  type="date"
                />
              </div>

              <div class="form-group col-md-6 text-left">
                <b-form-group label="Sexo" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="hijoToUpdate.sexo" name="update_radio_sexo" value="0">FEMENINO</b-form-radio>
                    <b-form-radio class="ml-2" v-model="hijoToUpdate.sexo" name="update_radio_sexo" value="1">MASCULINO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Vive con la Viuda?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="hijoToUpdate.vive_con_viuda" name="update_radio_vive_con_viuda" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="hijoToUpdate.vive_con_viuda" name="update_radio_vive_con_viuda" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left pl-0">
                    <b-form-group label="¿Tiene Discapacidad?" class="small text-gray-600">
                    <div class="d-flex">
                        <b-form-radio class="mr-2" v-model="hijoToUpdate.tiene_discapacidad" name="update_radio_tiene_discapacidad" value="1">SI</b-form-radio>
                        <b-form-radio class="ml-2" v-model="hijoToUpdate.tiene_discapacidad" name="update_radio_tiene_discapacidad" value="0">NO</b-form-radio>
                    </div>
                    </b-form-group>
                </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Discapacidad</label
                >
                <input :disabled="hijoToUpdate.tiene_discapacidad == 0 || hijoToUpdate.tiene_discapacidad == null" 
                  v-model="hijoToUpdate.discapacidad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="error-modal" v-if="hijoToUpdate.error">
              <span class="text-red"> {{ hijoToUpdate.error_message }}</span>
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
              @click="updateHijo"
              ref="btnUpdateHijo"
            >
              Guardar Cambios
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

 <!-- Modal Delete Clase -->
        <b-modal id="modalDeleteHijo" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title">
              Estás a punto de eliminar el Hijo(a):
            </h3>
          </template>
          <template v-slot:default="">
            <h4 class="text-red">{{ hijoToDelete.nombres }}</h4>
            <span class="text-danger">Esta acción eliminara por completo los datos de la persona del sistema.</span>
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
              @click="deleteHijo"
              ref="btnDeleteHijo"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->





            <!-- Modal Save -->
        <b-modal id="modalSaveVisita" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">Agregar Visita</h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Visita</label
                >
                <input
                  v-model="visitaToSave.fecha_visita"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descricpión</label
                >
                <textarea
                  v-model="visitaToSave.descripcion"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="error-modal" v-if="visitaToSave.error">
              <span class="text-red"> {{ visitaToSave.error_message }}</span>
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
              @click="saveVisita"
              ref="btnSaveVisita"
            >
              Agregar Visita
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

        <!-- Modal Update Curso -->
        <b-modal id="modalUpdateVisita" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title text-dark">
              Editar Visita Nro {{ visitaToUpdate.index+1}}
            </h3>
          </template>
          <template v-slot:default="">
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha Visita</label
                >
                <input
                  v-model="visitaToUpdate.fecha_visita"
                  class="form-control"
                  type="date"
                  forma
                />
              </div>
              <div class="form-group col-md-12 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descricpión</label
                >
                <textarea
                  v-model="visitaToUpdate.descripcion"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="error-modal" v-if="visitaToUpdate.error">
              <span class="text-red"> {{ visitaToUpdate.error_message }}</span>
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
              @click="updateVisita"
              ref="btnUpdateVisita"
            >
              Guardar Cambios
            </b-button>
          </template>
        </b-modal>
        <!-- End modal -->

 <!-- Modal Delete Clase -->
        <b-modal id="modalDeleteVisita" centered>
          <template v-slot:modal-header="">
            <h3 class="modal-title">
              Estás a punto de eliminar la Visita Nro {{ visitaToDelete.index+1 }} con Fecha {{ visitaToDelete.fecha_visita }}
            </h3>
          </template>
          <template v-slot:default="">
            <p class="text-dark">{{ visitaToDelete.descripcion }}</p>
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
              @click="deleteVisita"
              ref="btnDeleteVisita"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
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
                <b-form-group label="¿Tiene Trabajo?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.tiene_trabajo" name="update_radio_tiene_trabajo" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.tiene_trabajo" name="update_radio_tiene_trabajo" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Trabajo Remunerado?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.trabajo_remunerado" name="update_radio_trabajo_remunerado" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.trabajo_remunerado" name="update_radio_trabajo_remunerado" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Tiene Pensión 65?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.tiene_pension_65" name="update_radio_tiene_pension_65" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.tiene_pension_65" name="update_radio_tiene_pension_65" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Tiene Seguro?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.tiene_seguro" name="update_radio_tiene_seguro" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.tiene_seguro" name="update_radio_tiene_seguro" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Tiene Discapacidad?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.tiene_discapacidad" name="update_radio_tiene_discapacidad" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.tiene_discapacidad" name="update_radio_tiene_discapacidad" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Discapacidad</label
                >
                <input :disabled="ToUpdate.tiene_discapacidad == 0 || ToUpdate.tiene_discapacidad == null" 
                  v-model="ToUpdate.discapacidad"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="Toma Medicamentos?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.toma_medicamentos" name="update_radio_toma_medicamentos" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.toma_medicamentos" name="update_radio_toma_medicamentos" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Descripción de Medicamentos</label
                >
                <textarea  :disabled="ToUpdate.toma_medicamentos == 0 || ToUpdate.toma_medicamentos == null"
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
                    <b-form-radio class="mr-2" v-model="ToUpdate.sabe_de_dios" name="update_radio_sabe_de_dios" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.sabe_de_dios" name="update_radio_sabe_de_dios" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Conoce de Dios?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.conoce_de_dios" name="update_radio_conoce_de_dios" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.conoce_de_dios" name="update_radio_conoce_de_dios" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Tiene una relación con Jesus?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.relacion_con_jesus" name="update_radio_relacion_con_jesus" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.relacion_con_jesus" name="update_radio_relacion_con_jesus" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Fecha que acepto Jesus</label
                >
                <input :disabled="ToUpdate.relacion_con_jesus == 0 || ToUpdate.relacion_con_jesus == null"
                  v-model="ToUpdate.fecha_de_aceptacion"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Asite a una Iglesia?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.asiste_a_una_iglesia" name="update_radio_asiste_a_una_iglesia" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.asiste_a_una_iglesia" name="update_radio_asiste_a_una_iglesia" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Nombre de Iglesia</label
                >
                <input :disabled="ToUpdate.asiste_a_una_iglesia == 0 || ToUpdate.asiste_a_una_iglesia == null"
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
                <input :disabled="ToUpdate.asiste_a_una_iglesia == 0 || ToUpdate.asiste_a_una_iglesia == null"
                  v-model="ToUpdate.desde_que_fecha"
                  class="form-control"
                  type="date"
                />
              </div>
              <div class="form-group col-md-6 text-left">
                <b-form-group label="¿Le Interesa Jesus?" class="small text-gray-600">
                  <div class="d-flex">
                    <b-form-radio class="mr-2" v-model="ToUpdate.le_interesa_jesus" name="update_radio_le_interesa_jesus" value="1">SI</b-form-radio>
                    <b-form-radio class="ml-2" v-model="ToUpdate.le_interesa_jesus" name="update_radio_le_interesa_jesus" value="0">NO</b-form-radio>
                  </div>
                </b-form-group>
              </div>
            </div>
            <hr>
            <div class="form-row">
              <div class="form-group col-md-6 text-left">
                <label class="small text-gray-600" for="leadCapFirstName"
                  >Estado </label
                >
                <select v-model="ToUpdate.estado" class="form-control rounded-pill">
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


  </div>

  
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      loanding: true,
      viuda: [],
      ToUpdate: {
        id:0,
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
      hijoToSave: {
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        sexo: null,
        vive_con_viuda: null,
        tiene_discapacidad: null,
        discapacidad: "",
        id_viuda: this.$route.params.id,
        error: false,
        error_message: ""
      },
      hijoToUpdate: {
        id: 0,
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        sexo: null,
        vive_con_viuda: null,
        tiene_discapacidad: null,
        discapacidad: "",
        error: false,
        error_message: ""
      },
      hijoToDelete: {
        id: 0,
        nombres: ""
      },
      visitaToSave: {
        id_viuda: this.$route.params.id,
        fecha_visita: "",
        id_usuario: this.$store.getters.getCurrentUserId,
        descripcion: "",
        error: false,
        error_message: ""
      },
      visitaToUpdate: {
        id: 0,
        id_viuda: this.$route.params.id,
        fecha_visita: "",
        id_usuario: this.$store.getters.getCurrentUserId,
        descripcion: "",
        index: 0,
        error: false,
        error_message: ""
      },
      visitaToDelete: {
        id: 0,
        fecha_visita: "",
        descripcion: "",
        index: 0,
      },
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
      this.GetById();
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
    GetById: async function() {
        let _idviuda = this.$route.params.id;
      const response = await fetch(
        this.host + "/viudas/api/actions/viuda.data.php?id="+_idviuda
      );
      const data = await response.json();
      this.viuda = await data[0];
      this.loanding = false;
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
        _data.set("descripcion_medicamentos", this.ToUpdate.descripcion_medicamentos);
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
    saveHijo: async function() {
      if (this.verifyInputsToSaveHijo()) {
        let _data = new FormData();
        _data.set("nombres", this.hijoToSave.nombres);
        _data.set("apellidos", this.hijoToSave.apellidos);
        _data.set("fecha_nacimiento", this.hijoToSave.fecha_nacimiento);
        _data.set("sexo", this.hijoToSave.sexo);
        _data.set("vive_con_viuda", this.hijoToSave.vive_con_viuda);
        _data.set("tiene_discapacidad", this.hijoToSave.tiene_discapacidad);
        _data.set("discapacidad", this.hijoToSave.discapacidad);
        _data.set("id_viuda", this.hijoToSave.id_viuda);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/hijo.save.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            //handle response
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalSaveHijo", "#btnSaveHijo");
              this.GetById();
              this.resetToSaveHijo();
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
    updateHijo: async function() {
      if (this.verifyInputsToUpdateHijo()) {
        let _data = new FormData();
        _data.set("id", this.hijoToUpdate.id);
        _data.set("nombres", this.hijoToUpdate.nombres);
        _data.set("apellidos", this.hijoToUpdate.apellidos);
        _data.set("fecha_nacimiento", this.hijoToUpdate.fecha_nacimiento);
        _data.set("sexo", this.hijoToUpdate.sexo);
        _data.set("vive_con_viuda", this.hijoToUpdate.vive_con_viuda);
        _data.set("tiene_discapacidad", this.hijoToUpdate.tiene_discapacidad);
        _data.set("discapacidad", this.hijoToUpdate.discapacidad);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/hijo.update.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalUpdateHijo", "#btnUpdateHijo");
              this.GetById();
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
    deleteHijo: async function() {
      let _data = new FormData();
      _data.set("id", this.hijoToDelete.id);
      axios({
        method: "post",
        url: this.host + "/viudas/api/actions/hijo.delete.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.$root.$emit("bv::hide::modal", "modalDeleteHijo", "#btnDeleteHijo");
            this.GetById();
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
    saveVisita: async function() {
      if (this.verifyInputsToSaveVisita()) {
        let _data = new FormData();
        _data.set("id_viuda", this.visitaToSave.id_viuda);
        _data.set("fecha_visita", this.visitaToSave.fecha_visita);
        _data.set("id_usuario", this.visitaToSave.id_usuario);
        _data.set("descripcion", this.visitaToSave.descripcion);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/visita.save.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            //handle response
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalSaveVisita", "#btnSaveVisita");
              this.GetById();
              this.resetToSaveHijo();
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
    updateVisita: async function() {
      if (this.verifyInputsToUpdateVisita()) {
        let _data = new FormData();
        _data.set("id", this.visitaToUpdate.id);
        _data.set("fecha_visita", this.visitaToUpdate.fecha_visita);
        _data.set("id_usuario", this.visitaToUpdate.id_usuario);
        _data.set("descripcion", this.visitaToUpdate.descripcion);
        axios({
          method: "post",
          url: this.host + "/viudas/api/actions/visita.update.php",
          data: _data,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => {
            if (!response.data.error) {
              this.$root.$emit("bv::hide::modal", "modalUpdateVisita", "#btnUpdateVisita");
              this.GetById();
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
    deleteVisita: async function() {
      let _data = new FormData();
      _data.set("id", this.visitaToDelete.id);
      axios({
        method: "post",
        url: this.host + "/viudas/api/actions/visita.delete.php",
        data: _data,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (!response.data.error) {
            // console.log('Udated!')
            this.$root.$emit("bv::hide::modal", "modalDeleteVisita", "#btnDeleteVisita");
            this.GetById();
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
    verifyInputsToSaveHijo: function() {
      if (!this.validateText(this.hijoToSave.nombres)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Ingrese un nombre";
        return false;
      }
      if (!this.validateText(this.hijoToSave.apellidos)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Ingrese apellidos";
        return false;
      }
      if (!this.validateText(this.hijoToSave.fecha_nacimiento)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Ingrese una fecha";
        return false;
      }
      if (!this.validateRadios(this.hijoToSave.sexo)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Escoja una opción";
        return false;
      }
      if (!this.validateRadios(this.hijoToSave.vive_con_viuda)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Escoja una opción";
        return false;
      }
      if (!this.validateRadios(this.hijoToSave.tiene_discapacidad)) {
        this.hijoToSave.error = true;
        this.hijoToSave.error_message = "Escoja una opción";
        return false;
      }
      return true;
    },
    verifyInputsToUpdateHijo: function() {
      if (!this.validateText(this.hijoToUpdate.nombres)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Ingrese un nombre";
        return false;
      }
      if (!this.validateText(this.hijoToUpdate.apellidos)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Ingrese apellidos";
        return false;
      }
      if (!this.validateText(this.hijoToUpdate.fecha_nacimiento)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Ingrese una fecha";
        return false;
      }
      if (!this.validateRadios(this.hijoToUpdate.sexo)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Escoja una opción";
        return false;
      }
      if (!this.validateRadios(this.hijoToUpdate.vive_con_viuda)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Escoja una opción";
        return false;
      }
      if (!this.validateRadios(this.hijoToUpdate.tiene_discapacidad)) {
        this.hijoToUpdate.error = true;
        this.hijoToUpdate.error_message = "Escoja una opción";
        return false;
      }
      return true;
    },

    verifyInputsToSaveVisita: function() {
      if (!this.validateText(this.visitaToSave.fecha_visita)) {
        this.visitaToSave.error = true;
        this.visitaToSave.error_message = "Ingrese una fecha";
        return false;
      }
      if (!this.validateText(this.visitaToSave.descripcion)) {
        this.visitaToSave.error = true;
        this.visitaToSave.error_message = "Escoja una opción";
        return false;
      }
      return true;
    },
    verifyInputsToUpdateVisita: function() {
      if (!this.validateText(this.visitaToUpdate.fecha_visita)) {
        this.visitaToUpdate.error = true;
        this.visitaToUpdate.error_message = "Ingrese una fecha";
        return false;
      }
      if (!this.validateText(this.visitaToUpdate.descripcion)) {
        this.visitaToUpdate.error = true;
        this.visitaToUpdate.error_message = "Escoja una opción";
        return false;
      }
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
    openModalSaveHijo: function() {
      this.$root.$emit("bv::show::modal", "modalSaveHijo", "#btnSaveHijo");
    },
    resetToSaveHijo: function() {
      this.hijoToSave.nombres =  "";
      this.hijoToSave.apellidos =  "";
      this.hijoToSave.fecha_nacimiento =  "";
      this.hijoToSave.sexo =  null;
      this.hijoToSave.vive_con_viuda =  null
      this.hijoToSave.tiene_discapacidad =  null;
      this.hijoToSave.discapacidad =  "";
      
    },
    openModalUpdateHijo: function(_index) {
      this.$root.$emit("bv::show::modal", "modalUpdateHijo", "#btnUpdateHijo");
      this.hijoToUpdate.id = this.viuda.hijos[_index].id;
      this.hijoToUpdate.nombres = this.viuda.hijos[_index].nombres;
      this.hijoToUpdate.apellidos = this.viuda.hijos[_index].apellidos;
      this.hijoToUpdate.fecha_nacimiento = this.viuda.hijos[_index].fecha_nacimiento;
      this.hijoToUpdate.sexo = this.viuda.hijos[_index].sexo;
      this.hijoToUpdate.vive_con_viuda = this.viuda.hijos[_index].vive_con_viuda;
      this.hijoToUpdate.tiene_discapacidad = this.viuda.hijos[_index].tiene_discapacidad;
      this.hijoToUpdate.discapacidad = this.viuda.hijos[_index].discapacidad;
    },
    openModalDeleteHijo: function(_index) {
      this.hijoToDelete.id = this.viuda.hijos[_index].id;
      this.hijoToDelete.nombres = this.viuda.hijos[_index].nombres;
      this.$root.$emit("bv::show::modal", "modalDeleteHijo", "#btnDeleteHijo");
    },

    openModalSaveVisita: function() {
      this.$root.$emit("bv::show::modal", "modalSaveVisita", "#btnSaveVisita");
    },
    resetToSaveVisita: function() {
      this.visitaToSave.fecha_visita =  "";
      this.visitaToSave.descripcion =  "";
      
    },
    openModalUpdateVisita: function(_index) {
      this.$root.$emit("bv::show::modal", "modalUpdateVisita", "#btnUpdateVisita");
      this.visitaToUpdate.id = this.viuda.visitas[_index].id;
      this.visitaToUpdate.fecha_visita = this.viuda.visitas[_index].fecha_visita;
      this.visitaToUpdate.descripcion = this.viuda.visitas[_index].descripcion;
      this.visitaToUpdate.index = _index;
    },
    openModalDeleteVisita: function(_index) {
      this.visitaToDelete.id = this.viuda.visitas[_index].id;
      this.visitaToDelete.descripcion = this.viuda.visitas[_index].descripcion;
      this.visitaToDelete.fecha_visita = this.viuda.visitas[_index].fecha_visita;
      this.visitaToDelete.index = _index;
      this.$root.$emit("bv::show::modal", "modalDeleteVisita", "#btnDeletevisita");
    },
    openModalUpdate: function() {
      this.$root.$emit("bv::show::modal", "modalUpdate", "#btnUpdate");
      this.ToUpdate.id = this.viuda.id;
      this.ToUpdate.nombres = this.viuda.nombres;
      this.ToUpdate.apellidos = this.viuda.apellidos;
      this.ToUpdate.dni = this.viuda.dni;
      this.ToUpdate.fecha_nacimiento = this.viuda.fecha_nacimiento;
      this.ToUpdate.region = this.viuda.region;
      this.ToUpdate.ciudad = this.viuda.ciudad;
      this.ToUpdate.direccion = this.viuda.direccion;
      this.ToUpdate.referencia = this.viuda.referencia;
      this.ToUpdate.celular = this.viuda.celular;
      this.ToUpdate.tiene_trabajo = this.viuda.tiene_trabajo;
      this.ToUpdate.trabajo_remunerado = this.viuda.trabajo_remunerado;
      this.ToUpdate.tiene_pension_65 = this.viuda.tiene_pension_65;
      this.ToUpdate.tiene_seguro = this.viuda.tiene_seguro;
      this.ToUpdate.tiene_discapacidad = this.viuda.tiene_discapacidad;
      this.ToUpdate.discapacidad = this.viuda.discapacidad;
      this.ToUpdate.toma_medicamentos = this.viuda.toma_medicamentos;
      this.ToUpdate.descripcion_medicamentos = this.viuda.descripcion_medicamentos;
      this.ToUpdate.viuda_desde = this.viuda.viuda_desde;
      this.ToUpdate.nombre_pareja = this.viuda.nombre_pareja;
      this.ToUpdate.religion = this.viuda.religion;
      this.ToUpdate.sabe_de_dios = this.viuda.sabe_de_dios;
      this.ToUpdate.conoce_de_dios = this.viuda.conoce_de_dios;
      this.ToUpdate.relacion_con_jesus = this.viuda.relacion_con_jesus;
      this.ToUpdate.fecha_de_aceptacion = this.viuda.fecha_de_aceptacion;
      this.ToUpdate.asiste_a_una_iglesia = this.viuda.asiste_a_una_iglesia;
      this.ToUpdate.iglesia = this.viuda.iglesia;
      this.ToUpdate.desde_que_fecha = this.viuda.desde_que_fecha;
      this.ToUpdate.le_interesa_jesus = this.viuda.le_interesa_jesus;
      this.ToUpdate.observaciones = this.viuda.observaciones;
      this.ToUpdate.estado = this.viuda.estado;
    },
    validateText: function(str) {
      return str.length > 1 ? true : false;
    },
    validateSelects: function(value) {
      return value != 0 ? true : false;
    },
    validateDNI: function(str) {
      return str.length == 8 ? true : false;
    },
    validateRadios: function(value) {
      return value != null ? true : false;
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
