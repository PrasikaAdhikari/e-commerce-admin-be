import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.index({ name: 1, parent: 1 }, { unique: true });
categorySchema.index({ slug: 1, parent: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
