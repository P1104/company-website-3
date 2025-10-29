// Store images on window object so they're globally accessible
window.castleImage = new Image();
window.cloudsImage = new Image();
window.mountainImage = new Image();
window.spriteSheetImage = new Image();
window.tilesetImage = new Image();

function preload() {
  // Set image sources
  window.castleImage.src = "/mario/assets/sprites/building2.png";
  window.cloudsImage.src = "/mario/assets/sprites/clouds.png";
  window.mountainImage.src = "/mario/assets/sprites/street_vendor.png";
  window.spriteSheetImage.src = "/mario/assets/sprites/blore_sprite5.png";
  window.tilesetImage.src = "/mario/assets/sprites/tileset_gutter_update.png";

return new Promise(function(resolve,reject){
        let p1= new Promise(function(resolve,reject){
            castleImage.addEventListener("load",function(){
                console.log("Image loaded");
                resolve();
            });
        })
        let p2= new Promise(function(resolve,reject){
            cloudsImage.addEventListener("load",function(){
                console.log("Image loaded");
                resolve(); 
            });
        })
        let p3= new Promise(function(resolve ,reject){
            mountainImage.addEventListener("load",function(){
                console.log("Image loaded");
                resolve();
            });
        })
        let p4= new Promise(function(resolve,reject){
            spriteSheetImage.addEventListener("load",function(){
                console.log("Image loaded");
                resolve();
            });
        })
        let p5= new Promise(function(resolve,reject){
            tilesetImage.addEventListener("load",function(){
                console.log("Image loaded");
                resolve();
            });
        })
        let BigPromise=Promise.all([p1,p2,p3,p4,p5]);
        BigPromise.then(function(){
            resolve();
        })
    })

// Make preload available globally
window.preload = preload;
  }