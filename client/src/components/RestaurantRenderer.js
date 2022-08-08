import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestaurantBox from "./core/RestaurantBox";
import RestaurantActionModal from "./modals/RestaurantActionModal";
import ConfirmDeleteRestaurantModal from "./modals/ConfirmDeleteRestaurantModal";
import { setState } from "../store/restaurantStore";

const RestaurantRenderer = () => {
  const dispatch = useDispatch();

  const { restaurants } = useSelector((state) => state.state.value);
  const [deletableId, setDeletableId] = useState(null);
  const [editableId, setEditableId] = useState(null);

  const editableRestaurant = useMemo(
    () =>
      editableId ? restaurants?.find((item) => item.id === editableId) : null,
    [editableId, restaurants]
  );

  const onDelete = useCallback((restaurantId) => {
    setDeletableId(restaurantId);
  }, []);

  const onEdit = useCallback((restaurantId) => {
    setEditableId(restaurantId);
  }, []);

  const handleCloseModal = (refetchData = false) => {
    setDeletableId(null);

    if (refetchData) {
      dispatch(setState({ refetchData: true }));
    }
  };

  if (restaurants?.length === 0) {
    return "No data found";
  }

  return (
    <div>
      {restaurants?.map((restaurant, index) => (
        <RestaurantBox
          key={`${restaurant.id}-${index}`}
          restaurant={restaurant}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      <ConfirmDeleteRestaurantModal
        isOpen={!!deletableId}
        onClose={handleCloseModal}
        id={deletableId}
      />

      <RestaurantActionModal
        isOpen={!!editableId}
        onClose={() => setEditableId(null)}
        restaurant={editableRestaurant}
      />
    </div>
  );
};

export default memo(RestaurantRenderer);
