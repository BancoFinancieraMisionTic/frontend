<template>
    <div class="loginUser">
        <div class="containerLoginUser">
            <h2>Iniciar sesión</h2>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username : "",
                    password : ""
                }
            }
        },
        methods: {
            
            processLogInUser: async function(){
                console.log(this.user);
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation LogIn($credentials: CredentialsInput!) {
                              logIn(credentials: $credentials) {
                                refresh
                                access
                              }
                            }
                        `,
                        variables: {
                            credentials: this.user
                        }
                    }
                )
                .then((result) => {
                    let dataLogIn = {
                        username     : this.user.username,
                        tokenAccess  : result.data.logIn.access,
                        tokenRefresh : result.data.logIn.refresh,
                    }
                    console.log(result);
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    console.log(error);
                    alert("Credenciales de acceso incorrectas.");
                });
            }
        }
    }
</script>

<style>
    .loginUser{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerLoginUser {
        border: 3px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .loginUser h2{
        color: #283747;
    }
    .loginUser form{
        width: 70%;
    }
    .loginUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .loginUser button{
        color: #000000;
        font-size: 18px;
        background: #e5e7e9;
        border: 1px solid #e5e7e9;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
    }
    .loginUser button:hover{
        color: #000000;
        font-size: 18px;        
        font-weight: 900;
        background: #78a3ee;
        border: 1px solid #e5e7e9;
    }
    .transaction {
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: fex;
        justify-content: center;
        align-items: center;
    }
    .container_transaction {
        border: 3px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }    
    .transaction h2{
        color: #283747;
    }    
</style>