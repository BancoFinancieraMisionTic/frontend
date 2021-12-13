//For transactions
import gql                                             from 'graphql-tag'
import { createRouter, createWebHashHistory }          from 'vue-router'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import Login                                           from './components/Login.vue'
import SignUp                                          from './components/SignUp.vue'
import Home                                            from './components/Home.vue'
//import Account                                         from './components/Account.vue'
import UpdateEmployee                                  from './components/UpdateEmployee.vue'
import Reports                                         from './components/Reports.vue'                    

const routes = [
  {
    path: '/empleado/login',
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/empleado/registro',
    name: "signUp",
    component: SignUp,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/empleado/home',
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  /*{
    path: '/empleado/cuenta',
    name: "account",
    component: Account,
    meta: {
      requiresAuth: true,
    }
  },*/
  {
    path: '/empleado/actualizar/:idm',
    name: "updateEmployee",
    component: UpdateEmployee,
    props: true,
    //props: (route) => ({employeeDetailById: employeeDetailById, ...route.params}),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/clientes/reportes',
    name: "reports",
    component: Reports,
    meta: {
      requiresAuth: true,
    }
  }
  //,
  //{
  //  path: '/user/transaction',
  //  name: "transaction",
  //  component: Transaction,
  //  meta: {
  //    requiresAuth: true,
  //  }
  //}
];

const apolloClient = new ApolloClient({
  //Apigateway URL for GraphQL requests
  link : createHttpLink( {uri: "http://localhost:4000/"} ),
  cache: new InMemoryCache()
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function isAuth() {
  //console.log("refresh "+ localStorage.getItem("tokenRefresh"));
  if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
    return false;
  }

  try {
    var result = await apolloClient.mutate(
   
      // GraphQL request
      // mutation Refresh -> RefreshToken
      {
        mutation: gql`
          mutation RefreshToken($token: Refresh!) {
            refreshToken(token: $token) {
              access
            }
          }
        `,
        variables: {
            token: {
             refresh: localStorage.getItem("tokenRefresh"),
           }
        }
      }
    )

    localStorage.setItem("tokenAccess", result.data.refreshToken.access);
    return true;
  }
  catch {
    //If corrupted token or expired (>24h)
    localStorage.clear();
    alert("Su sesión ha expirado. Por favor, vuelva a iniciar sesión.");
    return false;
  }
}

router.beforeEach(async (to, from) => {
  //console.log(`Routing ${from.name} to ${to.name}`);
  let is_auth =  await isAuth();

  if(is_auth == to.meta.requiresAuth) {
    return true;
  }

  if(is_auth) {
    return { name:"home" };
  }

  else {
    console.log("Empleado no autenticado en la aplicación.");
    return { name:"login" }
  }
})

export default router
