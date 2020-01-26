const router = require("express").Router();
const favoriteTrackModel = require("../models/FavoriteTrack");

router.get("/", async (req, res) => {
  console.log("someone tries to get tracks");
  try {
    const favoriteTracks = await favoriteTrackModel.find({});
    res.json(favoriteTracks);
  } catch (err) {
    throw err;
  }
});

router.post("/add/:id", async (req, res) => {
  const existingTrack = await favoriteTrackModel.findOne({
    track_id: parseInt(req.params.id)
  });
  if (!existingTrack) {
    const favoriteTrack = new favoriteTrackModel({
      track_id: req.params.id
    });

    await favoriteTrack.save((err, obj) => {
      if (err) {
        res.send("Erreur");
      }
      res.json(obj);
    });
  } else {
    res.send("Track déjà existant");
  }
});

router.delete("/delete/:id", async (req, res) => {
  await favoriteTrackModel.findOneAndDelete(
    { track_id: parseInt(req.params.id) },
    (err, doc) => {
      if (!doc) {
        res.status(500).send("Document not found");
      } else {
        res.send(doc);
      }
    }
  );
});

module.exports = router;
