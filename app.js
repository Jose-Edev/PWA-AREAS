// --- MOSTRAR INPUTS SEGÚN FIGURA ---
function mostrarInputs() {
  const figura = document.getElementById("figura").value;
  const inputsDiv = document.getElementById("inputs");

  inputsDiv.innerHTML = ""; // Limpia

  if (figura === "triangulo") {
    inputsDiv.innerHTML = `
      <label>Base:</label>
      <input type="number" id="base" placeholder="Ingresa la base">

      <label>Altura:</label>
      <input type="number" id="altura" placeholder="Ingresa la altura">
    `;
  }

  if (figura === "cuadrado") {
    inputsDiv.innerHTML = `
      <label>Lado:</label>
      <input type="number" id="lado" placeholder="Ingresa el lado">
    `;
  }

  if (figura === "circulo") {
    inputsDiv.innerHTML = `
      <label>Radio:</label>
      <input type="number" id="radio" placeholder="Ingresa el radio">
    `;
  }
}

// --------------------------------------------------
// --- CÁLCULO DE ÁREA + HISTORIAL + VIBRACIÓN ------
// --------------------------------------------------

function calcularArea() {
  const figura = document.getElementById("figura").value;
  const resultado = document.getElementById("resultado");

  let area = 0;
  let detalle = "";

  if (figura === "triangulo") {
    const b = parseFloat(document.getElementById("base").value);
    const h = parseFloat(document.getElementById("altura").value);

    if (!b || !h) return alert("Ingresa base y altura");

    area = (b * h) / 2;
    detalle = `Triángulo → base ${b}, altura ${h}`;
  }

  if (figura === "cuadrado") {
    const lado = parseFloat(document.getElementById("lado").value);

    if (!lado) return alert("Ingresa el lado");

    area = lado * lado;
    detalle = `Cuadrado → lado ${lado}`;
  }

  if (figura === "circulo") {
    const radio = parseFloat(document.getElementById("radio").value);

    if (!radio) return alert("Ingresa el radio");

    area = Math.PI * (radio * radio);
    detalle = `Círculo → radio ${radio}`;
  }

  // Mostrar resultado
  resultado.style.display = "block";
  resultado.innerHTML = `Área: <b>${area.toFixed(2)} unidades²</b>`;

  // Vibración
  if (navigator.vibrate) navigator.vibrate([120]);

  // Guardar en historial
  guardarHistorial(detalle, area.toFixed(2));

  // Refrescar historial
  mostrarHistorial();
}

// --------------------------------------------------
// ---------------- HISTORIAL -----------------------
// --------------------------------------------------

function guardarHistorial(detalle, area) {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  historial.push({
    detalle,
    area,
    fecha: new Date().toLocaleString()
  });

  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  const contenedor = document.getElementById("historialLista");
  contenedor.innerHTML = "";

  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  historial.forEach(item => {
    contenedor.innerHTML += `
      <div class="item-historial">
        <p><b>${item.detalle}</b></p>
        <p>Área: ${item.area} unidades²</p>
        <small>${item.fecha}</small>
      </div>
    `;
  });
}

function limpiarHistorial() {
  localStorage.removeItem("historial");
  mostrarHistorial();
}

// Mostrar historial al iniciar
document.addEventListener("DOMContentLoaded", mostrarHistorial);
