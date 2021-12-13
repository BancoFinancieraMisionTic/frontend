<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="w3-container" align="center">
        <form
        class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin"
        v-on:submit.prevent="updateEmployee"
        style="width: 30%" >
        <h2 class="w3-center">Información personal del empleado {{employeeDetailById.name}}</h2>

        <div class="w3-row w3-section">
            <div class="w3-col" style="width: 50px"><i class="w3-xxlarge fa fa-at"></i></div>
            <div class="w3-rest">
            <label>Nombre:  </label>        
            <input class="w3-input w3-border" name="name" type="text" placeholder="Nombre empleado"
            v-bind:value="employeeDetailById.name" v-on:input="saveemployee.name = $event.target.value" required/>
            </div>
        </div>

        <div class="w3-row w3-section">
            <div class="w3-col" style="width: 50px"><i class="w3-xxlarge fa fa-key"></i></div>
            <div class="w3-rest">
            <label>Correo electrónico:  </label>        
            <input class="w3-input w3-border" name="email" type="text" placeholder="Correo electrónico"
            v-bind:value="employeeDetailById.email" v-on:input="saveemployee.email = $event.target.value" required/>
            </div>
        </div>

        <div class="w3-row w3-section">
            <div class="w3-col" style="width: 50px"><i class="w3-xxlarge fa fa-key"></i></div>
            <div class="w3-rest">
            <label>Sexo:  </label>        
            <input class="w3-input w3-border" name="gender" type="text" placeholder="Sexo"
            v-bind:value="employeeDetailById.gender" v-on:input="saveemployee.gender = $event.target.value" required/>
            </div>
        </div>

        <button id="actualizar" name="actualizar" class="w3-button w3-block w3-blue w3-section w3-padding w3-xlarge w3-round"
            style="width: 40%" type="submit"> &nbsp; Actualizar
        </button>
        </form>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import jwt_decode from "jwt-decode";
    export default {
        name: "UpdateEmployee",
        //Todo lo que se pone en "data" se vuelven variables globales de javascript
        data: function(){
            return {
                userId         : jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
                username: localStorage.getItem("username") || "none",
                //Aquí es la misma estructura de variables en apollo
                //objeto con los valores que el usuario pone en el formulario, iniciamente vacío
                //employee: {},
                saveemployee: {},
                id_emp_id:this.idm,
                employeeDetailById : {
                    id       : "",
                    cedula   : "",
                    name     : "",
                    email    : "",
                    username : "",
                    gender   : ""
                }

            }
        },
        props:{
            idm: {
                required: true
            }/*,
            employeeDetailById: {
                required: true
            }*/
        },
        apollo: {
            employeeDetailById : {
                query: gql`
                    query EmployeeDetailById($userId: Int!) {
                        employeeDetailById(userId: $userId) {
                            id
                            cedula
                            name
                            email
                            username
                            gender
                        }
                    }               
                `,
                variables() {
                    return {
                        userId: parseInt(this.idm),
                    }
                }
            }
        }, 
        methods: {
            //Esta es la función que se llama cuando el usuario le da clic al botón del formulario
            //  de registro
            /*employeeDetailById: async function(){
                await this.$apollo.query(
                    {
                        query: gql`
                            query EmployeeDetailById($userId: Int!) {
                                employeeDetailById(userId: $userId) {
                                    name
                                    cedula
                                    email
                                    username
                                    gender
                                }
                            }                        
                        `,
                        variables:{
                            userId: this.idm,
                        }
                    }
                )
                .then((result) => {
                    //this.$emit("completedUpdateEmployee");
                    console.log("checkpointmine");
                    let saveemployee = { 
                        id       :this.idm,
                        cedula   :employeeDetailById.cedula,
                        username :employeeDetailById.username,
                        name     :"",
                        email    :"",
                        gender   :""
                        }
                })
                //cuando el resultado al llamado del API es NOK
                .catch((error) => {
                    console.log(this.idm);
                    console.log(error);
                    alert("Ha fallado la actualización2 de los datos. Por favor intente de nuevo.")
                })

            },*/

            updateEmployee: async function(){
                //la invocaicón del $apollo se hablita or la inclusión del apolloprovider en el main.js
                this.saveemployee.id = parseInt(this.idm),
                this.saveemployee.username = this.username,
                //this.saveemployee.name = this.name,
                //this.saveemployee.cedula = (await this.employeeDetailById()).cedula,
                /*this.saveemployee.cedula = employeeDetailById.cedula,
                this.saveemployee.username = employeeDetailById.username*/
                

                await this.$apollo.mutate(
                    {
                        //Aquí es la misma estructura de mutation/query del apollo
                        mutation: gql`
                            mutation UpdateEmployee($user: EmployeeUpdateInput!) {
                                updateEmployee(user: $user) {
                                    id
                                    username
                                    email
                                    gender
                                }
                            }
                        `,
                        variables:{
                            //OJO!!! con el nombre de la variable objeto que espera Apollo
                            user: this.saveemployee,
                        }
                    }
                )
                //cuando el resultado al llamado del API es OK
                .then((result) => {
                    console.log("checkpoint ok update");
                    alert("Actualización de datos exitosa.");
                    this.$router.push({name: "home"});
                    this.$apollo.queries.employeeDetailById.refetch()
                    //this.$emit('completedUpdateEmployee');



                })
                //cuando el resultado al llamado del API es NOK
                .catch((error) => {
                    console.log(error);
                    alert("Ha fallado la actualización de los datos. Por favor intente de nuevo.")
                })
            }
        },
        created: async function(){
            //this.EmployeeDetailById();
            //this.$apollo.queries.employeeDetailById.refetch()
        }
    };
</script>

<style>
    .w3-container{
      margin-top: 50px;
      /*border: 1px solid #000000;*/
      height: 85%;
    }
    .w3-row {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .w3-button{
      color: #000000;
      background: #fcc924;
      border: 1px solid #e5e7e9;
      border-radius: 5px;
      padding: 10px 20px;
      margin-right: 10px;
    }
    .w3-button:hover{
      color: #000000;
      background: #e5e7e9;
      border: 1px solid #e5e7e9;
    }
</style>