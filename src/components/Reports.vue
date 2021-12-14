<template>
    <div id="reporte">
        <div class="container-table" align="center">
            <br/>
            <h2>Reportes Sarlaft</h2>
            <div id="date-component">
                <label>Seleccione una fecha inicial: &nbsp</label>
                <input type="date" name="dateGreater" v-model="dateGreater" v-on:change="reloadFilter"/>
            </div>
            <br/>
            <h3>Resultados</h3>

            <table ref="export_table">
                <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Motivo</th>
                </tr>
                <template v-if="reportsListDateGreaterAll.length">
                    <tr v-for="report in reports" :key="report.id" >
                        <td>{{ 
                            (new Date(report.date)).toLocaleString("es-CO").split(",")[0]
                         }}</td>                        
                        <td>{{ report.usernameFilter }}</td>
                        <td>{{ report.statusReport }}</td>
                        <td>{{ report.cause }}</td>
                    </tr>                   
                </template>
                <template v-else>
                    <tr>
                        <td colspan="8"><p>A partir de la fecha {{new Date().toLocaleString("es-CO").split(",")[0]}} no existe ningún reporte.</p></td>
                    </tr>
                </template>
            </table>
            <br/>
            <button class="w3-button" @click="csvExport(csvData)">Generar archivo</button>   
            <br/>                 
        </div>
    </div>
</template>

<script>
    import gql        from 'graphql-tag';
    import jwt_decode from 'jwt-decode';
                   
    export default {
        name: "Reports",
        data: function(){
            return {
                userId: jwt_decode( localStorage.getItem("tokenRefresh") ).user_id,
                username: localStorage.getItem("username") || "none",
                dateGreater:new Date(),
                reportsListDateGreaterAll: []
            }
        },
        computed: {
            reports: function() {                                                
                return this.reportsListDateGreaterAll;                
            },
            csvData() {
                return this.reports.map(item => ({                    
                    id: item.id,
                    date: (new Date(item.date)).toLocaleString("es-CO").split(",")[0],
                    username: item.usernameFilter,
                    status: item.statusReport, 
                    cause: item.cause
                }));
            }            
        },
        methods: {
            reloadFilter: function(){
                this.$apollo.queries.reportsListDateGreaterAll.refetch();                
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
            reportsListDateGreaterAll: {
                query: gql`
                    query ReportsListDateGreaterAll($dateGreater: String!) {
                        reportsListDateGreaterAll(dateGreater: $dateGreater) {
                        id
                        usernameFilter
                        statusReport
                        date
                        cause
                        }
                    }
                `,
                variables() {
                    return {
                        dateGreater: this.dateGreater,
                    };
                }                
            }
        },

        created: function(){
            this.$apollo.queries.reportsListDateGreaterAll.refetch();            
        }
    }
</script>

<style>
    #reporte {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    #reporte .container-table{
        width:60%;
        max-height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #reporte table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    #reporte table td,
    #reporte table th {
        border: 1px solid #ddd;
        padding: 8px;
    }
    #reporte table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    #reporte table tr:hover {
        background-color: #ddd;
    }
    #reporte table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #78a3ee;
        color: white;
    }
    #reporte > h2 {
        color: #283747;
        font-size: 25px;
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