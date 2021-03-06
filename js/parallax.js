$(document).ready(function(){
    

    // MARK: - PROPERTIES ----------------------------------------------------------------------------

    	// SET SCENE 1 - - - - - - - Scene, camera, renderer
    	var scene1 = new THREE.Scene();
		scene1.background = new THREE.Color( 0x90caf9 );

		var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera1.position.set(0,0,1.5);
		camera1.up = new THREE.Vector3(0,0,1);
		camera1.lookAt(new THREE.Vector3(0,5,2));

		var renderer1 = new THREE.WebGLRenderer({ antialias: true });
		renderer1.setSize( window.innerWidth, window.innerHeight);

		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		// Add date to copyright 
		var d = new Date()
		var year = d.getFullYear()
		console.log(year)
		$('#crDate').html( "<i>Copyright &#169  " + year + " Jim Peraino. All rights reserved.</i>");


	// MARK: - ON LOAD DO ----------------------------------------------------------------------------

		// Add WebGL scene to HTML
		$('#canvasPlaceholder').html( renderer1.domElement );

		// controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
		// controls1.enableZoom = false;

		// Add a cube
		// var geometry = new THREE.BoxGeometry(.75,.75,.75);
		// var material = new THREE.MeshBasicMaterial({color: 0xffffff});
		// var cube = new THREE.Mesh(geometry, material);
		// scene1.add( cube );

	
		// render the scene
		render();
	
	// MARK: - EVENT LISTENERS --------------------------------------------------------------------

		// Listen for window resize
		window.addEventListener( 'resize', onWindowResize, false );

		// Hide Scroll icon on scroll
		$(window).scroll(function(){
			$("#scrollNotice").css("opacity", 1 - $(window).scrollTop() / 50);
		});

		// Mouse movement
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		document.addEventListener('keydown', function(event) {
    		switch (event.keyCode) {
    			case 38:
    				console.log("Up key is pressed");
    				break;
				case 40:
					console.log("Down key is pressed");
					break;
				default:
					break;
    		}
        }, false);

	// MARK: - ACTIONS ----------------------------------------------------------------------------

    	// Keep the view boundary updated
    	function onWindowResize() {
			camera1.aspect = window.innerWidth / window.innerHeight;
			camera1.updateProjectionMatrix();
			renderer1.setSize( window.innerWidth, window.innerHeight );

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
		}

		function onDocumentMouseMove(event) {
				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;
			}


	// MARK: - METHODS ----------------------------------------------------------------------------


	// ___RENDER

		// Create the render loop
		function render() {
			requestAnimationFrame( render );

				xF = mouseX/windowHalfX/10;
				yF = mouseY/windowHalfY/10;

				var cutX = .65
				var difX = Math.abs((Math.abs(xF) - cutX)/(1 - cutX))
				var difXSmooth = difX * difX * difX

				var cutY = .65
				var difY = Math.abs((Math.abs(yF) - cutY)/(1 - cutY))
				var difYSmooth = difY * difY * difY


				camera1.position.x =  (xF > cutX || xF < -(cutX)) ? ((xF)* (.75 + (difXSmooth * 9.25))) : ((xF) * .75);
				camera1.position.y =  (yF > cutY || yF < -(cutY)) ? ((yF)* (.75 + (difYSmooth * 9.25))) : ((yF) * .75);

				camera1.lookAt( new THREE.Vector3(0,5,1.5) );
	
				// Render scene
				renderer1.render( scene1, camera1);
				// controls1.update();
		}



    // ___GEOMETRY 

    	
		var loadOBJ = function(){
			//Manager from ThreeJs to track a loader and its status
			var manager = new THREE.LoadingManager();
			//Loader for Obj from Three.js
			var loader = new THREE.OBJLoader( manager );
			//Launch loading of the obj file, addWavyInScene is the callback when it's ready 
			loader.load( 'assets/wavyShaker.obj', addWavyInScene);
		};

		var addWavyInScene = function(object){
			wavy = object;
			//Move the wavy in the scene
			wavy.position.y = 0;
			wavy.position.z = 0;
			//Go through all children of the loaded object and search for a Mesh
			object.traverse( function ( child ) {
				//This allow us to check if the children is an instance of the Mesh constructor
				if(child instanceof THREE.Mesh){
					child.material.color = new THREE.Color(0xffffff);
					//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
					child.geometry.computeVertexNormals();
				}
			});
			//Add the 3D object in the scene
			var material = new THREE.MeshBasicMaterial({color: 0xffffff});
			scene1.add(wavy);
			render();
		};
		
		loadOBJ();


		var loadOBJ2 = function(){
			//Manager from ThreeJs to track a loader and its status
			var manager = new THREE.LoadingManager();
			//Loader for Obj from Three.js
			var loader = new THREE.OBJLoader( manager );
			//Launch loading of the obj file, addWavyInScene is the callback when it's ready 
			loader.load( 'assets/swoop.obj', addSwoopInScene);
		};

		var addSwoopInScene = function(object){
			swoop = object;
			//Move the wavy in the scene
			swoop.position.y = 0;
			swoop.position.z = 8;
			//Go through all children of the loaded object and search for a Mesh
			object.traverse( function ( child ) {
				//This allow us to check if the children is an instance of the Mesh constructor
				if(child instanceof THREE.Mesh){
					child.material.color = new THREE.Color(0xffffff);
					//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
					child.geometry.computeVertexNormals();
				}
			});
			//Add the 3D object in the scene
			var material = new THREE.MeshBasicMaterial({color: 0xffffff});
			scene1.add(swoop);
			render();
		};
		
		loadOBJ2();

		var loadOBJ3 = function(){
			//Manager from ThreeJs to track a loader and its status
			var manager = new THREE.LoadingManager();
			//Loader for Obj from Three.js
			var loader = new THREE.OBJLoader( manager );
			//Launch loading of the obj file, addWavyInScene is the callback when it's ready 
			loader.load( 'assets/pointy.obj', addPointyInScene);
		};

		var addPointyInScene = function(object){
			pointy = object;
			//Move the wavy in the scene
			pointy.position.y = 0;
			pointy.position.z = -8;
			//Go through all children of the loaded object and search for a Mesh
			object.traverse( function ( child ) {
				//This allow us to check if the children is an instance of the Mesh constructor
				if(child instanceof THREE.Mesh){
					child.material.color = new THREE.Color(0xffffff);
					//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
					child.geometry.computeVertexNormals();
				}
			});
			//Add the 3D object in the scene
			var material = new THREE.MeshBasicMaterial({color: 0xffffff});
			scene1.add(pointy);
			render();
		};
		
		loadOBJ3();

		



});