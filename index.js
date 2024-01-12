import express from "express";
import { connectDB } from "./db.js";
import { Video } from "./models/videoModel.js";
const app = express();
const port = 3001;
import cors from "cors";
import "dotenv/config";

app.use(cors());

app.use(express.json());

app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/video/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    res.json(video);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/videos/:id/subtitles", async (req, res) => {
  const videoId = req.params.id;
  const { subtitles } = req.body;
  console.log(subtitles);

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { subtitles },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(updatedVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/upload", async (req, res) => {
  try {
    const { title, url } = req.body;

    const newVideo = new Video({
      title,
      url,
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/video/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/video/:id/delete/subtitles", async (req, res) => {
  try {
    const { id } = req.params;
    const { subtitles } = req.body;

    const deletedVideo = await Video.findByIdAndUpdate(
      id,
      { subtitles },
      { new: true }
    );

    if (!deletedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json({ message: "Subtitle deleted successfully" });
  } catch (error) {
    console.error("Error deleting subtitle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
