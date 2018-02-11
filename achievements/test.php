<meta charset="utf-8">
<script src="https://d3js.org/d3.v4.min.js"></script>

<style>
    body{
        margin:0;
    }
    #container{
        display: flex;
        flex-direction: row;
        height:100%;
    }
    #space{
        width: 50%;
        height: 100%;
        background-color: #e0e0e0;
    }
    #svg-container{
    }
    .trophies{
        float:left;
        text-align: center;
        width: 100px;
        height: 100px;
        margin: 20px;
        margin-bottom: 40px;
    }
    .trophies h4{
        font-family: Arial;
        font-size: 12px;
        margin-bottom: 3px;
    }
    .trophies p{
        font-family: Arial;
        margin-top: 0;
        font-size: 10px;
    }
</style>
<body>
    <div id="container">
        <div id="space">
        </div>
        <div id="svg-container">
        </div>
    </div>
</body>
<script>

    <?php
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "Achievements";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 


        $sql = "SELECT *  FROM Trophies";
        $result = $conn->query($sql);
        $json = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                array_push($json,$row);
            }
        }

        echo "var data = ".json_encode($json);
        
        $conn->close();

    ?>

    /*data = [
        {"id": '1', 'src': "octagon.svg", 'color': 'red', "title": "Gostar de atum", 'desc': 'é isso aí'},
        {"id": '2', 'src': "octagon.svg", 'color': 'black', "title": "Ganhou um oi 3x", 'desc': 'por 3 pessoas diferentes'},
        {"id": '3', 'src': "circle.svg", 'color': '#dddddd', "title": "Easy", 'desc': "não foi fácil"},
        {"id": '4', 'src': "octagon.svg", 'color': 'red',  "title": "Por ser o máximo"},
        {"id": '5', 'src': "octagon.svg", 'color': '#741202',  "title": "Por ser o máximo"}
    ]*/

    trophies_shape = [];
    difficult = {'0': "Easy", '1': "Medium"}
    icons = d3.select("#svg-container")
              .selectAll("object")
              .data(data).enter()
              .append("div")
              .attr("class", 'trophies')
              .append("object")
              .attr("type", "image/svg+xml")
              .attr("data", function(d){ return d.class+".svg"})
              .attr("width", "100%")
              .attr("height", "100%")
              .on("load", function(d){
                  d3.select(this.contentDocument)
                    .selectAll('.edit-svg')
                    .style("fill", '#'+d.color)
                    
              })
              .on("mouseover", function(d){
                  d3.select(this.contentDocument)
                    .selectAll('.edit-svg')
                    .style("stroke-width", 10)
                    .style("stroke", "#e0e0e0")
              })
              .on("mouseout", function(d){
                d3.select(this.contentDocument)
                    .selectAll('.edit-svg')
                    .style("stroke-width", 0)
              });

   trophies = d3.selectAll(".trophies")

   trophies.append("h4").text(function(d){ return d.title});
   trophies.append("p").style("font-weight", "bold").text(function(d){ return difficult[d.difficult]})
   trophies.append("p").text(function(d){ return d.description})
   
</script>