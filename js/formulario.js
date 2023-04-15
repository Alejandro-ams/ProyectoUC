const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	Rut: /^[a-zA-Z0-9\_\-]{9,10}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	app: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	apm: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	edad: /^.{1,2}$/, // 4 a 12 digitos.
	genero: /^[a-zA-Z]{1,2}$/,
	telefono: /^\d{9,12}$/ // 7 a 14 numeros.
}

const campos = {
	Rut: false,
	nombre: false,
	app: false,
	apm: false,
	edad: false,
	genero: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "rut":
			validarCampo(expresiones.Rut, e.target, 'Rut');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "app":
			validarCampo(expresiones.app, e.target, 'app');
		break;
		case "apm":
			validarCampo(expresiones.apm, e.target, 'apm');
		break;
		case "edad":
			validarCampo(expresiones.edad, e.target, 'edad');
			validaredad();
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "genero":
			validarCampo(expresiones.genero, e.target, 'genero');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validaredad = () => {
	const edad2 = document.getElementById('edad');

	if(edad2 < 18 && edad2 >35){
		document.getElementById(`grupo__edad`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__edad i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__edad i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__edad .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['edad'] = false;
	} else{
		document.getElementById(`grupo__edad`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__edad`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__edad i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__edad i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__edad .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['edad'] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.Rut && campos.nombre && campos.app && campos.apm && campos.telefono && campos.edad && campos.genero &&terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});