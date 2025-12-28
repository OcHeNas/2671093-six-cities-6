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

  const isValid =
    comment.length >= 50 && comment.length <= 300 && rating > 0;

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }

    dispatch(postCommentAction({ id: offerId, comment, rating }))
      .unwrap()
      .then(() => {
        setComment('');
        setRating(0);
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell how was your stay"
      />
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default CommentForm;

