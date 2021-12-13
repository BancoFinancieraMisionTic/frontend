<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<!--    <div id="historial">
        <h2>Landing</h2> 
        <div class="container-table">
            <table>
                <tr>
                    <th><a href=""><img width="50%" class="circlelanding" src = "../assets/employee.png" alt=""></a></th>
                    <th><a href=""><img width="50%" class="circlelanding" src = "../assets/reports.png" alt=""></a></th>
                    <th><a href=""><img width="50%" class="circlelanding" src = "../assets/employee.png" alt=""></a></th>
                </tr>
                <tr>
                    <td>Clientes</td>
                    <td>Reportes</td>
                    <td>Mi cuenta</td>
                </tr>
            </table>
        </div>
    </div>-->
    <div class="row">
        <div class="column">
            <img width="30%" src="../assets/employee.png">
        </div>
        <div class="column">
            <img width="30%" src="../assets/reports.png">
        </div>
        <div class="column">
            <img width="30%" src="../assets/employee.png">
        </div>
    </div>
</template>



<style>

.column {
  float: left;
  width: 33.33%;
  padding: 5px;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}
/*
.row {
  display: flex;
  padding: 0 0px;
  margin-left: auto;
  margin-right: auto;
}

.column {
  flex: 20%;
  padding: 0 0px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.column img {
  margin-top: 20%;
  vertical-align: middle;
  margin-left: 20%;
  margin-right: 20%;
  display: flex;
}*/
/*
.circlelanding {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.img {
    pointer-events: none;
    position: relative;
    transform: translateY(20px) scale(1.15);
    transform-origin: 50% bottom;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.img1 {
    left: 22px;
    top: 164px;
    width: 340px;
}

    #historial {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }
    #historial .container-table{
        width:60%;
        max-height: 250px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #historial table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    #historial table td,
    #historial table th {
        border: 1px solid transparent;
        padding: 8px;
    }
    #historial table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    #historial table tr:hover {
        background-color: transparent;
    }
    #historial table th {
        padding-top: 120px;
        padding-bottom: 120px;
        text-align: left;
        background-color: transparent;
        color: white;
    }
    #historial > h2 {
        color: #283747;
        font-size: 25px;
    }
    #historial .container {
        padding: 30px;
        border: 3px solid rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        margin: 5% 0 1% 0;
    }
    #historial .container h2 {
        font-size: 25px;
        color: #283747;
    }
    #historial .container span {
        color: crimson;
        font-weight: bold;
    }
    */
</style>