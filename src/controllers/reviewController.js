import {
  getProductsByFilter,
  getProductsById,
  updateProductQuery,
} from "../models/products/productModel.js";
import {
  getAllReviews,
  getReviewsByFilter,
  getReviewsById,
  updateReviewStatus,
} from "../models/reviews/reviewModel.js";

export const getAllReviewsController = async (req, res) => {
  try {
    const reviews = await getAllReviews();

    const productIds = reviews.map((item) => item.productId);
    const products = await getProductsByFilter({ _id: { $in: productIds } });

    res.json({ status: "success", data: reviews, products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateReviewStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await getReviewsById(id);

    let status = "";

    if (review.status === "active") {
      status = "inactive";
    } else status = "active";

    const updatedReview = await updateReviewStatus(id, { status: status });
    if (!updatedReview) {
      return res
        .status(404)
        .json({ status: "error", message: "Review not found" });
    }

    //get the prouduct

    const product = await getProductsById(review.productId);

    //get all reviews of the product

    const activeReviews = await getReviewsByFilter({
      productId: review.productId,
      status: "active",
    });

    console.log(44535, activeReviews);

    //calculate average rating
    const totalRating = activeReviews.reduce((sum, r) => sum + r.rating, 0);
    //change the average rating of the product
    let avgRating =
      activeReviews.length > 0 ? totalRating / activeReviews.length : 0;

    avgRating = avgRating.toFixed(2);

    const averageRatingUpdate = await updateProductQuery(review.productId, {
      averageRating: avgRating,
    });

    console.log(110000, averageRatingUpdate);

    return;

    return res.status(200).json({
      status: "success",
      message: `Review status changed and product rating updated (${avgRating.toFixed(
        1
      )})`,
      data: { review: updatedReview, averageRating: avgRating },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
