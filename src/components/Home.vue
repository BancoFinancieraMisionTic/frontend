<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="information">
        <div class="home">
            <h1>Bienvenido <span>{{ employeeDetailById.name }}</span>!</h1>
        </div>
<!-- CHECK: AÑADIR LA OPCIÓN/BOTÓN ACTUALIZAR--> 
        <div class="details">
            <h3>Su información registrada es la siguiente.</h3>
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
                <button class="ButtonUpdateEmployee" v-on:click="clickUpdateEmployee(userId)">Actualizar esta información</button>
        </div>
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
            clickUpdateEmployee: function (idm, employeeDetailById) {
                this.$router.push({name: "updateEmployee", params: {idm: idm}, props: employeeDetailById});
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
        font-size: 60px;
        color: #283747;
    }
    .information h2 {
        font-size: 40px;
        color: #283747;
    }
    .information span {
        color: rgb(43, 40, 41);
        font-weight: bold;
    }
    .details h3 {
        font-size: 35px;
        color: #283747;
        text-align: center;
    }
    .details h2 {
        font-size: 35px;
        color: #283747;
    }
    .details {
        border: 3px solid rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        padding: 30px 80px;
        margin: 30px 0 0 0;
    }
</style>