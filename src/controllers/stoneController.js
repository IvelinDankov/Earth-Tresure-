import { Router } from "express";
import stoneService from "../services/stoneService.js";
import { getErrorMessage } from "../util/getErrMsg.js";

const router = Router();

/*#############################
########### CREATE #############
################################*/

router.get("/create", (req, res) => {
  res.render("stones/create", { title: "Create Page" });
});

router.post("/create", async (req, res) => {
  const stoneData = req.body;
  const userId = req.user._id;

  try {
    await stoneService.create(stoneData, userId);

    res.redirect("/treasure/catalog");
  } catch (err) {
    const error = getErrorMessage(err);
    res.render("stones/create", {
      title: "Create Page",
      stone: stoneData,
      error,
    });
  }
});

/*#############################
########### CATALOG #############
################################*/

router.get("/catalog", async (req, res) => {
  try {
    const stones = await stoneService.getAll().lean();
    res.render("stones/dashboard", { title: "Dashboard Page", stones });
  } catch (err) {
    const error = getErrorMessage(err);

    res.render("stones/dashboard", { title: "Dashboard Page", stones, error });
  }
});

/*#############################
########### DETAILS #############
################################*/
router.get("/:stoneId/details", async (req, res) => {
  const stoneId = req.params.stoneId;

  const stone = await stoneService.getOne(stoneId).lean();
  const isOwner = req.user?._id == stone.owner;

  const hasLiked = stone.likedList?.some(
    (userId) => userId.toString() === req.user._id
  );

  res.render("stones/details", {
    title: "Details Page",
    stone,
    isOwner,
    hasLiked,
  });
});

/*#############################
########### LIKES #############
################################*/
router.get("/:stoneId/like", async (req, res) => {
  const stoneId = req.params.stoneId;
  const userId = req.user._id;

  try {
    await stoneService.like(stoneId, userId);
    res.redirect(`/treasure/${stoneId}/details`);
  } catch (err) {
    const error = getErrorMessage(err);
    console.log(error);
  }
});

/*#############################
########### DELETE #############
################################*/
router.get("/:stoneId/delete", async (req, res) => {
  const stoneId = req.params.stoneId;
  await stoneService.remove(stoneId);
  res.redirect("/treasure/catalog");
});

/*#############################
########### EDIT #############
################################*/

router.get("/:stoneId/edit", async (req, res) => {
  const stoneId = req.params.stoneId;

  try {
    const stone = await stoneService.getOne(stoneId).lean();
    res.render("stones/edit", { title: "Edit Page", stone });
  } catch (err) {
    const error = getErrorMessage(err);
     res.render("stones/edit", { title: "Edit Page", error });
  }
});

router.post('/:stoneId/edit',async (req, res) => {
  const stoneId = req.params.stoneId;
  const stoneData = req.body;

  try {
    await stoneService.edit(stoneId, stoneData);
  
    res.redirect(`/treasure/${stoneId}/details`,);
    
  } catch (err) {
    const error = getErrorMessage(err);
     res.render("stones/edit", { title: "Edit Page",  stone: stoneData, error, });
  }

});

export default router;
