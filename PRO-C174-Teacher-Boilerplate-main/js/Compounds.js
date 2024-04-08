AFRAME.registerComponent("atoms", {

  init: async function () {
    var models = await this.getModels();
    console.log(models);
    var barcodes = Object.keys(models);
    //console.log(barcodes);
    // [ 0 , 1] = barcodes
    // 0 = barcode
    // compounds[0]
    barcodes.map(barcode => {
      var model = models[barcode];
      this.createmodels(model);
    })
  },

  getModels: function () {
    return fetch("js/compoundList.json").then(res => res.json()).then(data => data)
  },



  createmodels: async function (element) {

    var barcodeValue = element.barcode_value;
    var modelUrl = element.model_url;
    var modelName = element.model_name;


    var scene = document.querySelector("a-scene");

    var marker = document.createElement("a-marker");
    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("value", barcodeValue);

    scene.appendChild(marker);
    if (barcodeValue == 0) {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("position", element.position)
      modelEl.setAttribute("rotation", element.rotation)
      modelEl.setAttribute("scale", element.scale)
      modelEl.setAttribute("gltf-model", `url(${modelUrl})`)
      marker.appendChild(modelEl)
    }
    else {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("position", element.position)
      modelEl.setAttribute("rotation", element.rotation)
      modelEl.setAttribute("scale", element.scale)
      modelEl.setAttribute("gltf-model", `url(${modelUrl})`)
      marker.appendChild(modelEl)
    }
  }





});
