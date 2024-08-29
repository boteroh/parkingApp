import Cells from "../models/parking.js";

// METHOD GET
export async function getCell (req, res) {
    const cells = await Cells.find();
    res.json(cells);
};

// METHOD POST
export async function postCell (req, res) {
    let msg = "Cell created";
    const body = req.body;
    try {
        const cells = new Cells(body);
        await cells.save();
      } catch (error) {
        msg = error;
      }
      res.json({ msg: msg });
};
