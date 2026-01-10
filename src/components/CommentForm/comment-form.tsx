import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';

type CommentFormProps = {
  offerId: string;
};

function CommentForm({ offerId }: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isValid =
    comment.length >= 50 &&
    comment.length <= 300 &&
    rating >= 1 &&
    rating <= 5;

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    dispatch(postCommentAction({ id: offerId, comment, rating }))
      .unwrap()
      .then(() => {
        setComment('');
        setRating(0);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label">
        Your review
      </label>

      <textarea
        className="reviews__textarea form__textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell how was your stay"
        disabled={isSubmitting}
      />

      {hasError && (
        <p className="reviews__error">
          Failed to submit review. Please try again.
        </p>
      )}

      <button
        className="reviews__submit form__submit button"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}

export default CommentForm;

