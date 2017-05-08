$(document).ready(function(){
    

    // MARK: - PROPERTIES ----------------------------------------------------------------------------

    	// SET SCENE 1 - - - - - - - Scene, camera, renderer
    	var scene1 = new THREE.Scene();
		scene1.background = new THREE.Color( 0x90caf9 );

		var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera1.position.set(0,0,1);

		var renderer1 = new THREE.WebGLRenderer({ antialias: true });
		renderer1.setSize( window.innerWidth, window.innerHeight);

		// Add date to copyright 
		var d = new Date()
		var year = d.getFullYear()
		console.log(year)
		$('#crDate').html( "<i>Copyright &#169  " + year + " Jim Peraino. All rights reserved.</i>");


	// MARK: - ON LOAD DO ----------------------------------------------------------------------------

		// Add WebGL scene to HTML
		$('#canvasPlaceholder').html( renderer1.domElement );

		controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
		controls1.enableZoom = false;

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

	// MARK: - ACTIONS ----------------------------------------------------------------------------

    	// Keep the view boundary updated
    	function onWindowResize() {
			camera1.aspect = window.innerWidth / window.innerHeight;
			camera1.updateProjectionMatrix();
			renderer1.setSize( window.innerWidth, window.innerHeight );

			camera2.aspect = window.innerWidth / window.innerHeight;
			camera2.updateProjectionMatrix();
			renderer2.setSize( window.innerWidth, window.innerHeight );
		}

	// MARK: - METHODS ----------------------------------------------------------------------------


	// ___RENDER

		// Create the render loop
		function render() {
			requestAnimationFrame( render );

				// Render scene
				renderer1.render( scene1, camera1);
				controls1.update();
		}


	// ___ALERTS


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
			wavy.rotation.y = 0;
			wavy.rotation.z = 0;
			wavy.rotation.z = 0;//-Math.PI/2;
			//wavy.rotation.x = Math.PI/2;
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

		



});