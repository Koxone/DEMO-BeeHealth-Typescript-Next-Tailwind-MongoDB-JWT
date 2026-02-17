import { Star } from 'lucide-react';
import { useEffect } from 'react';

function Rating({
  rating,
  setRating,
  hoveredRating,
  setHoveredRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
  hoveredRating: number;
  setHoveredRating: (rating: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <Star className="h-5 w-5 text-gray-600" />
        <p className="text-sm font-semibold text-gray-800">Calificación de adherencia</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 transition-colors ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="mt-2 text-center text-sm text-white">
          {rating === 1 && 'Muy bajo cumplimiento'}
          {rating === 2 && 'Bajo cumplimiento'}
          {rating === 3 && 'Cumplimiento regular'}
          {rating === 4 && 'Buen cumplimiento'}
          {rating === 5 && 'Excelente cumplimiento'}
        </p>
      )}
    </div>
  );
}

export default Rating;
