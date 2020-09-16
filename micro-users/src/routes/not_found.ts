import { Router, Request, Response } from "express";

const not_found = Router();

not_found.all("*", async (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default not_found;
