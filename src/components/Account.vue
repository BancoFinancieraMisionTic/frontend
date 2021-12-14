<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="information">
        <div class="home" align="center">
            <h1>Hola <span>{{ employeeDetailById.name }}</span></h1>
        </div>
        <h3>Su información registrada es la siguiente:</h3>

        <div class="details" >
            <h2>
                Cédula:
                <span>{{ employeeDetailById.cedula }}</span>
            </h2>
            <h2>
                Nombre de Usuario:
                <span>{{ employeeDetailById.username }}</span>
            </h2>
            <h2>
                Correo electrónico:
                <span>{{ employeeDetailById.email }}</span>
            </h2>
            <h2>
                Sexo:
                <span>{{ employeeDetailById.gender }}</span>
            </h2>
        </div>
        <button align="center" class="buttonUpdateEmployee" v-on:click="clickUpdateEmployee(userId)">Actualizar mi información</button>
    </div>
</template>


<script>
    import jwt_decode from "jwt-decode";
    import gql        from "graphql-tag";
    export default{
        name: "Home",

        data: function(){
            return {
                userId         : jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
                username: localStorage.getItem("username") || "none",
                employeeDetailById : {
                    cedula   : "",
                    name     : "",
                    email    : "",
                    username : "",
                    gender   : ""
                }
            }
        },
        apollo: {
            employeeDetailById : {
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
                variables() {
                    return {
                        userId: this.userId,
                    }
                }
            },
        }, 
        methods: {
            clickUpdateEmployee: async function (idm, employeeDetailById) {
                await this.$router.push({name: "updateEmployee", params: {idm: idm}});
            }

        }
    };
</script>


<style>
    .information {
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }   
    .information h1 {
        font-size: 38px;
        color: #10257c;
    }
    .information h1 span {
        font-size: 35px;
        color: #10257c;
    }
    .information h2 {
        font-size: 20px;
        color: #283747;
    }
    .information h3 {
        font-size: 20px;
        color: #283747;
    }
    .information span {
        color: rgb(43, 40, 41);
        font-weight: bold;
    }
    .details h3 {
        font-size: 25px;
        color: #283747;
        text-align: center;
    }
    .details h2 {
        font-size: 22px;
        color: #283747;
    }
    .details {
        border: 0.5px solid rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        padding: 30px 80px;
        margin: 30px 0 0 0;
    }
    .buttonUpdateEmployee{
        color: #000000;
        font-size: 18px;
        background: #e5e7e9;
        border: 1px solid #e5e7e9;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
        margin-top: 20px;
    }
    .buttonUpdateEmployee:hover{
        color: #000000;
        font-size: 18px;        
        font-weight: 900;
        background: #78a3ee;
        border: 1px solid #e5e7e9;
    }
</style>