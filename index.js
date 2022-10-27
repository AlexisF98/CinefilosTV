
 let pagina = 1;
 const btnAnterior = document.getElementById('btnAnterior');
 const btnSiguiente = document.getElementById('btnSiguiente');

 btnSiguiente.addEventListener('click', () => {
 	if(pagina < 1000){
 		pagina += 1;
 		cargarPeliculas();
 	}
 });

 btnAnterior.addEventListener('click', () => {
 	if(pagina > 1){
 		pagina -= 1;
 		cargarPeliculas();
 	}
 });

 const btnReset = document.getElementById('btnReset')
 btnReset.addEventListener('click', ()=> {
	window.location.reload()
 })

const btnSubmit = document.getElementById('btnSubmit')
btnSubmit.addEventListener('click', () => {
 	
  		cargarPeliculas();
  	}
 );

const cargarPeliculas = async() => {       //solo podemos trabajar con await en funciones asincronas

    const search = await document.getElementById('search').value;
    const searchTerm =  search;
    const apis= `https://api.themoviedb.org/3/search/movie?api_key=84477bd94a31d4323413073f132bd218&query=${searchTerm}&language=es-MX&page=${pagina}`
 	try { //cuando trabajamos con funciones asincronas debemos trabajar con try y catch
		const respuesta = await fetch(apis); //con await le decimos que espere primero haga la peticion para despues pasar a la siguiente linea
	
		//respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			console.log(datos)
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					
					<div class="card">
						<h1 class="titulo">${pelicula.title}</h1>
						<p class="genero">Genero: ${pelicula.genre_ids}</p>
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<div class="footer-card">
							<p class="descripcion">Descripcion: ${pelicula.overview}</p>
							<p class="votoPromedio">Voto Promedio: ${pelicula.vote_average}</p> 
							<p class="movie_id">Id pelicula:${pelicula.id}</p> 
						</div>
					</div>
				`;
			});
			document.getElementById('paginacion').classList.add('mostrar');
			

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){  //catch me va a permitir  poder capturar lo que seria el error
		console.log(error);
	}

}

cargarPeliculas();