<template>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="addClient" align="center">
        <div class="form-group">
            <h2>Registrar información de un Cliente</h2>

            <form v-on:submit.prevent="createClient" >
                <input type="number" v-model="client.cedula_client" placeholder=" Cédula del cliente">
                <br>
                
                <input type="text" v-model="client.username_client" placeholder=" Username cliente">
                <br>
                
                <input type="text" v-model="client.name_client" placeholder=" Nombre del cliente">
                <br>

                 <input type="email" v-model="client.email_client" placeholder=" Correo electrónico">
                <br>

                <input type="text" v-model="client.gender_client" placeholder=" Sexo">
                <br>

                 <input type="text" v-model="client.residency_city" placeholder=" Ciudad de residencia">
                <br>

                <input type="text" v-model="client.residency_department" placeholder=" Departamento de residencia">
                <br>

                <input type="number" v-model="client.number_of_dependants" placeholder=" Número de personas a cargo">
                <br>

                 <input type="text" v-model="client.socieconomic_status" placeholder=" Estrato socioeconómico">
                <br>

                <input type="number" v-model="client.activeAssets" placeholder=" Activos (COP)">
                <br>

                <input type="number" v-model="client.passiveAssets" placeholder=" Pasivos (COP)">
                <br>
                
                <input type="number" v-model="client.income" placeholder=" Ingresos mensuales (COP)">
                <br>

                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>


<script>
    import gql from 'graphql-tag';

    export default {
        name: "addClient",
        data: function(){
            
            return {
                client: {
                    username_client: "",
                    cedula_client: "",
                    name_client: "",
                    email_client: "",
                    gender_client: "",
                    residency_city: "",
                    residency_department: "",
                    number_of_dependants: "",
                    socieconomic_status: "",
                    activeAssets: "",
                    passiveAssets: "",
                    income: "",
                    lastChange: "null"
                }
            }
        },
        methods: {
            createClient: async function(){
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation CreateClient($userInput: ClientCreateInput!) {
                                createClient(userInput: $userInput) {
                                    username_client
                                    cedula_client
                                    name_client
                                    email_client
                                    gender_client
                                    residency_city
                                    residency_department
                                    number_of_dependants
                                    socieconomic_status
                                    activeAssets
                                    passiveAssets
                                    income
                                    lastChange
                                }
                            }
                        `,
                        variables:{
                            userInput: this.client,
                        }
                    }
                )
                .then((result) => {
                    console.log("checkpoint ok newclient");
                    alert("El cliente fue agregado.");
                    this.$router.push({name: "home"});

                })
                .catch((error) => {
                    alert("Ha fallado el registro del cliente. Por favor intente de nuevo.")
                })
            }
        }
    }
</script>        


<style>
    .addClient{
        margin-top: 50px;
        padding: 0%;
        height: 100%;
        width: 100%;
    
        justify-content: center;
        align-items: center;
    }
    .form-group {
        border: 3px solid  #283747;
        border-radius: 10px;
        width: 35%;
        height: 90%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .addClient h2{
        color: #000000;
    }
    .addClient form{
        width: 80%;
        
    }
    .addClient input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .addClient2 button{
        width: 100%;
        height: 40px;
        color: #000000;
        background: #fcc924;
        border: 1px solid #000000;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }
    .addClient button{
        color: #000000;
        font-size: 18px;
        background: #e5e7e9;
        border: 1px solid #e5e7e9;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
    }    
    .addClient button:hover{
        color: #000000;
        font-size: 18px;        
        font-weight: 900;
        background: #78a3ee;
        border: 1px solid #e5e7e9;
    }
</style>