import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsStart } from "./store/configStore";
import { RootState } from "./store";
import { Review } from "./types";

const platforms = ["Google", "Яндекс", "2ГИС"];

function App() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchReviewsStart());
  }, [dispatch]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredReviews = reviews.filter((review: Review) => {
    const platformMatches = selectedPlatform ? review.platform === selectedPlatform : true;
    const ratingMatches =
      (minRating !== null ? review.rating >= minRating : true) &&
      (maxRating !== null ? review.rating <= maxRating : true);

    return platformMatches && ratingMatches;
  });

   return (
    <div>
      <h1>Отзывы</h1>
      <div>
        <select
          value={selectedPlatform || ""}
          onChange={(e) => setSelectedPlatform(e.target.value || null)}
        >
          <option value="">All platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Minimum rating"
          value={minRating || ""}
          onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
        />
        <input
          type="number"
          placeholder="Maximum rating"
          value={maxRating || ""}
          onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      <ul>
        {filteredReviews.map((review: Review) => (
          <li key={review.id}>
            {review.platform} - {review.rating} - {review.text}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
