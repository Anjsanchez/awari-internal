import React from "react";
import { Select } from "antd";

const AAutoComplete = ({ data, onSelectChange, selectedData, label }) => {
  return (
    <div>
      <div className="counter-spanHeader__wrapper">
        <label htmlFor="res-type" className="counter-spanHeader aac">
          {label}
        </label>
      </div>
      <Select
        id="res-type"
        className="reservationtype__select"
        showSearch
        placeholder="Select from the list"
        optionFilterProp="children"
        onChange={onSelectChange}
        value={selectedData.name}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {data.map((n) => (
          <Select.Option value={n.name} key={n._id} obj={n}>
            {n.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default AAutoComplete;
