document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
    ], function (Map, MapView, FeatureLayer) {
      const myMap = new Map({
        basemap: "streets-navigation-vector",
      });
  
      const view = new MapView({
        container: "viewDiv",
        map: myMap,
        center: [-100, 40],
        zoom: 4,
      });
  
    //   setTimeout(() => {
    //     //   view.zoom = 10;
    //     //   view.center = [-140, 40];
        
    //   }, 3000);
   
      const featureLayer = new FeatureLayer({
        
        url: "https://services.gis.ca.gov/arcgis/rest/services/Boundaries/CA_Counties/FeatureServer/0",
        popupTemplate: {
          title: "CA countries",
          content:
            "OBJECTID: {OBJECTID}<br>Population : {Population}<br>AREA_ID: {AREA_ID}",
        },
       
      });
  
      view.whenLayerView(featureLayer).then((layerView) => {
        const fieldSelect1 = document.getElementById("fieldSelect");
        var fieldSelect2 = document.getElementById("fieldSelect2");

        layerView.layer.fields.forEach((field) => {
            let option1 = document.createElement("option");
            option1.value = option1.id = field.name;
            option1.text = field.alias;
            option1.fieldType = field.type;
            fieldSelect1.append(option1);

            let option2 = document.createElement("option");
            option2.value = option2.id = field.name;
            option2.text = field.alias;
            option2.fieldType = field.type;
            fieldSelect2.append(option2);
        });

          // Add event listener to the filter button
          const filterButton = document.getElementById("btnfilter");
          filterButton.addEventListener("click", () => {
            
              // Get selected field names and filter inputs
              const field1 = fieldSelect1.value;
              const fieldSelect1Value = fieldSelect1.value;
              const filterInput1 = document.getElementById("filterInput").value
              // Define the expression to filter features
              const optionType = document.getElementById(field1).fieldType;
                if (optionType === "integer" || optionType === "double"){
                   var Expression1 =
              fieldSelect1Value +
              "=" +
              filterInput1 
            //   +
            //   "AND " +
            //   fieldSelect2Value +
            //   "=" +
            //   filterInput2;
        }
              else if (optionType === "string") {
            var Expression1 =
                  "upper(" + fieldSelect1Value + ") LIKE '%" + filterInput1.toUpperCase() + 
                  "%'"
                }
              else {
                    featureLayer.definitionExpression = "1=1"; // AREA_ID = 32520284
                  }

        const field2 = fieldSelect2.value;
        const fieldSelect2Value = fieldSelect2.value;
        const filterInput2 = document.getElementById("filterInput2").value
        // Define the expression to filter features
        const optionType2 = document.getElementById(field2).fieldType;
          if (optionType2 === "integer" || optionType === "double"){
             var Expression2 =
        fieldSelect2Value +
        "=" +
        filterInput2 
      }
        else if (optionType2 === "string") {
      var Expression2 =
            "upper(" + fieldSelect2Value + ") LIKE '%" + filterInput2.toUpperCase() + "%'"
          }
        else {
              featureLayer.definitionExpression = "1=1"; // AREA_ID = 32520284
            }
            const combinedExpression = Expression1+ 'AND' +Expression2
                console.log(combinedExpression)
            featureLayer.definitionExpression = combinedExpression
            });
            
      });
  
      // Add change event listener to field select dropdown
      var fieldSelect = document.getElementById("fieldSelect");
      fieldSelect.addEventListener("change", function (e) {
        document.getElementById("filterInput").value = "";
      });
  
      myMap.add(featureLayer);
    });
  });
