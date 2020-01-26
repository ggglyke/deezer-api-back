const mongoose = require("mongoose");

const favoriteTrackSchema = new mongoose.Schema(
  {
    track_id: {
      type: Number,
      required: true
    }
  },
  {
    collection: "favs"
  }
);

module.exports = mongoose.model("FavoriteTrack", favoriteTrackSchema);
