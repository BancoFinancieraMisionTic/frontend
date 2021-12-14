<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="signUpUser" align="center">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="signUpEmployee" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <input type="number" v-model="user.cedula" placeholder="Cédula">
                <br>
                <input type="text" v-model="user.name" placeholder="Nombre completo">
                <br>
                <input type="email" v-model="user.email" placeholder="Correo electrónico">
                <br>
                <input type="text" v-model="user.gender" placeholder="Sexo">
                <br>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    export default {
        name: "SignUp",
        data: function(){
            return {
                user: {
                    cedula: "",
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                    gender: ""
                }
            }
        },
        methods: {
            signUpEmployee: async function(){
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation SignUpEmployee($userInput: SignUpInput) {
                              signUpEmployee(userInput: $userInput) {
                                refresh
                                access
                              } 
                            }

                        `,
                        variables:{
                            userInput: this.user,
                        }
                    }
                )
                .then((result) => {
                    let dataSignUp = {
                        username     : this.user.username,
                        tokenRefresh : result.data.signUpEmployee.refresh,
                        tokenAccess  : result.data.signUpEmployee.access
                    };
                    this.$emit("completedSignUp", dataSignUp);
                })
                .catch((error) => {
                    console.log(error);
                    alert("Ha fallado el registro. Por favor intente de nuevo.")
                })
            }
        }
    }
</script>

<style>
    .signUpUser{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerSignUpUser {
        border: 0px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .signUpUser h2{
        color: #10257c;
        font-size: 35px;
        margin-bottom: 20px;
    }
    .signUpUser form{
        width: 70%;
    }
    .signUpUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .signUpUser button{
        color: #000000;
        font-size: 18px;
        background: #e5e7e9;
        border: 1px solid #e5e7e9;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
        margin-top: 15px;
    }
    .signUpUser button:hover{
        color: #000000;
        font-size: 18px;        
        font-weight: 900;
        background: #78a3ee;
        border: 1px solid #e5e7e9;
    }
</style>