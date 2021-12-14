<template>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <div id="app" class="app">

    <div class="header">
      <label for = "" class ="brand">
        <a href=""><img src = "./assets/sarlaft_logo.png" alt=""></a>
      </label>
      <nav>
        <button v-if="isAuth" v-on:click="loadHome"> Home </button>
        <button v-if="isAuth" v-on:click="loadReports"> Reportes </button>
        <button v-if="isAuth" v-on:click="loadNewClient"> Nuevo Cliente </button>        
        <button v-if="isAuth" v-on:click="loadAccount"> Mi cuenta </button>
        <button v-if="isAuth" v-on:click="logOut"> Cerrar Sesión </button>
        <button v-if="!isAuth" v-on:click="loadLogIn"> Iniciar Sesión </button>
        <button v-if="!isAuth" v-on:click="loadSignUp"> Registrarse </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:completedTransaction="completedTransaction"
        v-on:loadNewClient="loadNewClient"
      >
      </router-view>
    </div>
  </div>
</template>


<script>
  export default{
    name: 'App',
    //To define some getters and setters on isAuth
    computed: {
      isAuth: {
        get: function() {
          //Get authentication requirement for component
          return this.$route.meta.requiresAuth;
        },
        set: function() { }
      }
    },

    methods:{
      
      loadHome: function(){
        this.$router.push({name: "home"});
      },

      loadAccount: function(){
        this.$router.push({name: "account"});
      },
      
      loadReports: function(){
        this.$router.push({name: "reports"});
      },

      loadNewClient: function(){
        this.$router.push({name: "addClient"});
      },

      loadTransaction: function(){
        this.$router.push({name: "transaction"});
      },
      
      logOut: function(){
        localStorage.clear();
        alert("Sesión terminada");
        this.loadLogIn();
      },

      loadLogIn: function(){
        this.$router.push({name: "login"})
      },

      loadSignUp: function(){
        this.$router.push({name: "signUp"})
      },

      completedLogIn: function(data){
        localStorage.setItem('username', data.username);
        localStorage.setItem('tokenRefresh', data.tokenRefresh);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        alert("Autenticación exitosa");
        this.loadHome();
      },

      completedSignUp: function(data){
        alert("Registro exitoso");
        this.completedLogIn(data);
      },

      completedUpdateEmployee: function(){
        alert("Actualización de datos exitosa");
        this.$router.push({name: "home"});
      }, 

      completedNewClient: function(){
        this.loadHome();
      },  

      completedTransaction: function(){
        this.loadAccount();
      }      
    },
    created: function(){
    }
  }
</script>

<style>    

  body {
    max-width: 0 0 0 0;
  }
  .header{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #2b5293 ;
    color:#E5E7E9 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1{
    width: 20%;
    text-align: center;
  }    
  .header nav {
    height: 100%;
    width: 30%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, minmax(0,1fr));
    justify-content: space-around;
    align-items: center;
    font: 150% system-ui;
    text-align: center;
    padding: 1rem 2rem;
  }
  .header nav button{
    color: #E5E7E9;
    background: #2b5293;
    border: 0px solid #2b5293;
  }
  .header nav button:hover{
    color: #E5E7E9;
    background: #2b5293;
    border: 0px solid #E5E7E9;
    font-weight: 900;
  }
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background: #FDFEFE ;
    align-content: center;
  }
  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #283747;
    color: #E5E7E9;
  }
  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>