import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { addLike } from '../redux/like/likeSlice';

const FoodCard = ({ food }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* IMAGE SECTION */}
      <div
        className="relative h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${food.image})` }}
      >
        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {food.category}
        </span>

        {/* HEART ICON */}
        <button
          onClick={() => dispatch(addLike(food))}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-yellow-100 transition"
        >
          <FaRegHeart className="text-yellow-500" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {food.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {food.description}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-yellow-500">
            ${food.price}
          </span>

          <button
            onClick={() => dispatch(addToCart(food))}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white p-3 rounded-full hover:opacity-90 transition"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;