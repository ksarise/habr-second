import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsStart } from "./store/configStore";
import { RootState } from "./store";
import {Review} from "./types";
import reviews from "./data/data.json";
import "./App.css";

const platforms = [... new Set(reviews.reviews
  .map((review: Review) => review.platform))]

function App() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [sortField, setSortField] = useState<"date" | "rating" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchReviewsStart());
  }, [dispatch]);

  const filteredReviews = reviews.filter((review: Review) => {
    const platformMatches = selectedPlatform ? review.platform === selectedPlatform : true;
    const ratingMatches =
      (minRating !== null ? review.rating >= minRating : true) &&
      (maxRating !== null ? review.rating <= maxRating : true);
    const textMatches = searchText
    ? review.text.toLowerCase().includes(searchText.toLowerCase())
    : true;

    return platformMatches && ratingMatches && textMatches;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (!sortField) return 0;

    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) return <p className="reviews__loading">Loading...</p>;
  if (error) return  <p className="reviews__error">Error: {error}</p>;

  return (
    <div className="reviews">
      <h1 className="reviews__header">Reviews:</h1>

      <div className="reviews__filters">
        <select
          className="reviews__filter"
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
          className="reviews__filter"
          type="number"
          placeholder="Min rate"
          value={minRating || ""}
          onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : null)}
        />
        <input
          className="reviews__filter"
          type="number"
          placeholder="Max rate"
          value={maxRating || ""}
          onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : null)}
        />
        <input
          className="reviews__filter"
          type="text"
          placeholder="Text search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="reviews__sorting">
        <select
          className="reviews__sort"
          value={sortField || ""}
          onChange={(e) => setSortField(e.target.value ? (e.target.value as "date" | "rating") : null)}
        >
          <option value="">No sort</option>
          <option value="date">By time</option>
          <option value="rating">By rate</option>
        </select>
        <button
          className="reviews__sort-order"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "▲ Asc" : "▼ Desc"}
        </button>
      </div>

      <ul className="reviews__list">
        {sortedReviews.map((review: Review) => (
          <li key={review.id} className="reviews__item">
            <strong className="reviews__platform">{review.platform}</strong> -{" "}
            <span className="reviews__rating">{review.rating}</span> -{" "}
            <span className="reviews__date">
              {new Date(review.date).toLocaleString()}
            </span>
            <p className="reviews__text">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
