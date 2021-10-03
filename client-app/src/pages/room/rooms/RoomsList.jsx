import React from "react";
import FormList from "../../../common/form/FormList";

const RoomsList = ({ data, onDelete, onView }) => {
  //..

  return (
    <>
      <FormList
        data={data}
        onView={onView}
        onDelete={onDelete}
        displayField="roomLongName"
        hasAditionalField={{
          value: true,
          field: "numberOfRooms",
          additionalText: "Rooms: ",
        }}
      />
    </>
  );
};

export default RoomsList;
