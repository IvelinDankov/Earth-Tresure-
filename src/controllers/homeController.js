import { Router } from "express";
import stoneService from "../services/stoneService.js";

const router = Router();

router.get('/', async (req, res) => {
    let stones = await stoneService.getAll().lean();

    stones.reverse();

    stones.length > 3 ? stones.length = 3 : null;

    res.render("home", { title: "Home Page", stones });
});

export default router