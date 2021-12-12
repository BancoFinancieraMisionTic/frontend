<template>
  <div id="app" class="app">

    <div class="header">
      <h1>Sarlaft<br />Superfinanciera</h1>
      <nav>
        <button v-if="isAuth" v-on:click="loadHome"> Home </button>
        <button v-if="isAuth" v-on:click="loadAccount"> Mi Cuenta </button>
      <!--  <button v-if="isAuth" v-on:click="loadTransaction"> Transacción </button> -->
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
    background-color: #283747 ;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }
  .header nav button{
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 20px;
  }
  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
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