import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsStart } from "./store/configStore";
import { RootState } from "./store";
import { Review } from "./types";

function App() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewsStart());
  }, [dispatch]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Reviews:</h1>
      <ul>
        {reviews.map((review: Review) => (
          <li key={review.id}>
            {review.platform} | {review.rating} | {review.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
