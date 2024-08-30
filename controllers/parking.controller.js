import Cells from "../models/parking.js";
import bcrypt from "bcryptjs";

// METHOD GET ---> Mostrar todas las celdas
export async function getCell(req, res) {
  try {
    const cells = await Cells.find();
    res.json(cells);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// METHOD GET ---> Mostrar una celda por ID
export async function getCellById(req, res) {
  try {
    const cell = await Cells.findById(req.params.id);
    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }
    res.json(cell); // Asegúrate de enviar la celda encontrada
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// METHOD POST --> Crear una celda
export async function postCell(req, res) {
  let msg = "Cell created";
  const body = req.body;
  try {
    const cells = new Cells(body);
    await cells.save();
  } catch (error) {
    msg = error.message; // Cambiar a error.message para mostrar solo el mensaje de error
  }
  res.json({ msg: msg });
}

// METHOD PUT --> Actualizar una celda por ID
export async function updateCell(req, res) {
  try {
    const cell = await Cells.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }
    res.json(cell);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// METHOD DELETE: --> Elimina una celda por ID
export async function deleteCell(req, res) {
  try {
    const cell = await Cells.findByIdAndDelete(req.params.id);
    if (!cell) {
      return res.status(404).json({ message: "Cell not found" });
    }
    res.json({ message: "Cell deleted" }); // Corrige "elimated" a "deleted"
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// PARKING VEHICULO ---> POST
export async function parkingCar(req, res) {
  try {
    const { plate } = req.body;
    const cell = await Cells.findById(req.params.id);
    if (!cell || cell.status === "Not available") {
      return res.status(400).json({ message: "Cell not available" });
    }
    cell.plate = plate;
    cell.status = "Not available";
    cell.entry_date = new Date();
    cell.pin = await bcrypt.hash(`${cell.cell}${plate}`, 5);
    await cell.save();
    res.json(cell);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// GET --> Calcula el valor a pagar
export async function payment(req, res) {
  try {
    const cell = await Cells.findById(req.params.id);
    if (!cell || !cell.entry_date) {
      return res.status(400).json({ message: "Entry date is missing" });
    }

    // Capturar la fecha de salida actual
    const departureDate = new Date();
    cell.departure_date = departureDate;

    const entryDate = new Date(cell.entry_date);

    // Calcular el tiempo en horas redondeando hacia arriba
    const time = Math.ceil((departureDate - entryDate) / (1000 * 60 * 60));

    // Calcular el total a pagar
    const totalPay = time * 5000;

    // Guardar la fecha de salida en la base de datos
    await cell.save();

    // Responder con la información requerida
    res.json({
      time,
      totalPay,
      entryDate: cell.entry_date,
      departureDate: cell.departure_date
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


// // GET --> Calcula el valor a pagar
// export async function payment(req, res) {
//   try {
//     const cell = await Cells.findById(req.params.id);
//     if (!cell || !cell.entry_date) {
//       return res.status(400).json({ message: "Departure date needed" });
//     }
//     const entryDate = new Date(cell.entry_date);
//     const departureDate = new Date();
//     const time = Math.ceil((departureDate - entryDate) / (1000 * 60 * 60)); // Corregir el divisor a milisegundos
//     const totalPay = time * 5000;
//     res.json({ time, totalPay });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// POST --> Salida del parqueadero
export async function exit(req, res) {
  try {
    const cell = await Cells.findById(req.params.id); // Añadir 'await'
    if (!cell || cell.status === "Available") {
      return res.status(400).json({ message: "The cell is already available" });
    }
    cell.status = "Available";
    cell.plate = null;
    cell.entry_date = null;
    cell.departure_date = null;
    cell.pin = null;
    await cell.save();
    res.json(cell);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
