import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  subtitles: [
    {
      startTime: {
        type: Number,
      },
      content: {
        type: String,
      },
      seconds: {
        type: Number,
      },
    },
  ],
});

export const Video = mongoose.model("Video", videoSchema);
