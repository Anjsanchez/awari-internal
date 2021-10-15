import React from "react";
import FormList from "./../../../common/form/FormList";

const RoomPricingList = ({ data, onDelete, onView }) => {
  //..
  if (data.length === 0) return null;

  return (
    <>
      <FormList
        data={data}
        onView={onView}
        onDelete={onDelete}
        displayField="roomLongName"
        bracketField="room"
        hasAditionalField={{
          value: true,
          field: "capacity",
          additionalText: "Capacity: ",
        }}
        hasSecondField={{
          value: true,
          field: "sellingPrice",
          additionalText: "Price: ",
        }}
      />
    </>
  );
};

export default RoomPricingList;
