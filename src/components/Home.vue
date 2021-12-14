<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
       <div id="historial">
        <div class="container-table">
            <table align="center">
 
             <thead>
                <tr>              
                    <th><a href="/#/clientes/nuevo"><img width="50%" class="circlelanding" src = "../assets/clients.png" alt=""></a></th>
                    <th><a href="/#/clientes/reportes"><img width="50%" class="circlelanding" src = "../assets/reports.png" alt=""></a></th>
                    <th><a href="/#/empleado/cuenta"><img width="50%" class="circlelanding" src = "../assets/employee.png" alt=""></a></th>
                </tr>
             </thead>
            </table>           
        </div>
    </div>
</template>

<style>
    #historial {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    #historial .container-table{
        width:60%;
        max-height: 450px;
        overflow-y: hidden;
        overflow-x: hidden;
        border-collapse: collapse;
    }
    #historial table th {
        padding-top: 220px;
        padding-bottom: 120px;
        text-align: center;
        background-color: transparent;
        color: white;
    }    
</style>