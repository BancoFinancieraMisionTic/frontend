<template>
<div id="cliente">
    <h2>Clientes</h2>
    <select v-model="clientId" v-on:change="reloadFilter">
        <option value="" selected>Listado de clientes</option>
        <option v-for="cli in clientslist" :key="cli" :value="cli">{{ cli.name_client+" - "+ cli.username_client }}</option>
    </select>
    <br/>
    
    <table>
        <tr>
            <th colspan="2"><h3>Información del cliente {{clientId.name_client}}</h3></th>    
        </tr>        
        <tr>
        <td><strong>Cédula</strong></td><td>{{ clientId.cedula_client }}</td>
        </tr>
        <tr>
        <td><strong>Username</strong></td><td>{{ clientId.username_client }}</td>
        </tr>
        <tr>
        <td><strong>Nombre</strong></td><td>{{ clientId.name_client }}</td>
        </tr>
        <tr>
        <td><strong>Correo electrónico</strong></td><td>{{ clientId.email_client }}</td>     
        </tr>
        <tr>
        <td><strong>Sexo</strong></td><td>{{ clientId.gender_client }}</td>
        </tr>
        <tr>
        <td><strong>Ciudad de residencia</strong></td><td>{{ clientId.residency_city }}</td>
        </tr>
        <tr>
        <td><strong>Departamento de residencia</strong></td><td>{{ clientId.residency_department }}</td>
        </tr>
        <tr>
        <td><strong>Número de personas a cargo</strong></td><td>{{ clientId.number_of_dependants }}</td>
        </tr>
        <tr>
        <td><strong>Estrato socioeconómico</strong></td><td>{{ clientId.socieconomic_status }}</td>        
        </tr>              
    </table>
<div>
    <button class="w3-button" @click="csvExport(csvData)" >Generar archivo</button>
    <button @click="this.$router.push('/clientes/nuevo');" type="button" class="w3-button">Nuevo cliente</button>    
</div>
            
</div>    
</template>
<script>
    import gql        from 'graphql-tag';
    import jwt_decode from 'jwt-decode';

export default{
    name: "Clients",

    data: function(){
        return {
            userId: jwt_decode( localStorage.getItem("tokenRefresh") ).user_id,
            username: localStorage.getItem("username") || "none",                
            clientId: '',        
            infocli:[],
            personalInfoClientList: [],
            personalInfoByClientId: [],
        }
    },
    computed: {
        clientslist: function() {
            return this.personalInfoClientList;                      
        },
        csvData() {            
            this.infocli=[this.clientId];
            console.log(this.infocli)
            return this.infocli.map(item => ({                    
                Cedula: item.cedula_client,
                Username: item.username_client,
                Nombre: item.name_client,
                Email: item.email_client,
                Genero: item.gender_client,
                Ciudad: item.residency_city,
                Departamento: item.residency_department,
                Personas_dependientes: item.number_of_dependants,
                Estrato: item.socieconomic_status,
            }));
            }    
        
    },
    methods:{
        filterClient: async function(idcli){
            //console.log(idcli);

                await this.$apollo.query(
                    {
                        query: gql`
                        query PersonalInfoByClientId($clientId: Int!) {
                            personalInfoByClientId(clientId: $clientId) {
                                username_client
                                cedula_client
                                name_client
                                email_client
                                gender_client
                                residency_city
                                residency_department
                                number_of_dependants
                                socieconomic_status
                            }
                        }
                        `,
                        variables:{                            
                                clientId: idcli.id_client,
                            }
                    }
                ).then((result) => {
                    this.infocli=Object.keys(result.data.personalInfoByClientId);
                })
                .catch((error) => {
                    console.log(error);                    
                })
                
                this.$apollo.queries.personalInfoClientList.refetch();                
        },
        reloadFilter: function() {
            let idcli = this.clientId;
            if(idcli == ""){
                this.personalInfoByClientId= [];
                this.$apollo.queries.personalInfoClientList.refetch();
            }
            else{
                this.infocli=Object.keys(this.filterClient(idcli));                             
            }
        },               
        csvExport(arrData){
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
            Object.keys(arrData[0]).join(";"),
            ...arrData.map(item => Object.values(item).join(";"))
            ]
            .join("\n")
            .replace(/(^\[)|(\]$)/gm, "");

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "export.csv");
            link.click();
        }        
    },
    apollo: {           
            personalInfoClientList: {
                query: gql`
                query PersonalInfoClientList {
                    personalInfoClientList {
                        id_client
                        username_client
                        cedula_client
                        name_client
                        email_client
                        gender_client
                        residency_city
                        number_of_dependants
                        residency_department
                        socieconomic_status
                    }
                }`
            }            
    },
    created: function(){
        this.$apollo.queries.personalInfoClientList.refetch();            
    }

}
</script>
<style>
    #cliente {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    #cliente .container-table{
        width:60%;
        max-height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #cliente table {
        width: 50%;
        border-collapse: collapse;
        border: 1px solid rgba(0, 0, 0, 0.3);
        margin-top:20px;
    }
    #cliente table td,
    #cliente table th {
        border: 1px solid #ddd;
        padding: 8px;
    }
    #cliente table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    #cliente table tr:hover {
        background-color: #ddd;
    }
    #cliente table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #78a3ee;
        color: white;
    }
    #cliente > h2 {
        color: #283747;
        font-size: 25px;
    }  
    #cliente h2 {
        color: #10257c;
        font-size: 35px;
        margin-top: 4%;
    } 
    .w3-button{
        color: #000000;
        font-size: 18px;
        background: #e5e7e9;
        border: 1px solid #e5e7e9;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
    }
    .w3-button:hover{
        color: #000000;
        font-size: 18px;        
        font-weight: 900;
        background: #78a3ee;
        border: 1px solid #e5e7e9;
    }
</style>