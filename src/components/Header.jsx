import React, { useState } from "react";
import axios from "axios";
import "./header.css";

import { YMaps, Map } from "@pbe/react-yandex-maps"; 

const Header = () => {
  const apiUrl = "https://test.tspb.su/test-task/vehicles";


  const [carItem, setCarItem] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedModel, setEditedModel] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  
  
  
  /*Изменить на useEffect */
  const fetchData = async () => {
    const response = await axios.get(apiUrl);
    setCarItem(response.data);
    console.log(response);

    if (response.status === 200) {
      console.log("Success");
    } else {
      console.log("error");
    }
  };



  const sortItemsByPrice = () => {
    const sortedItems = [...carItem].sort((a, b) => a.price - b.price);
    setCarItem(sortedItems);
  };

  const sortItemsByYear = () => {
    const sortedItems = [...carItem].sort((a, b) => a.year - b.year);
    setCarItem(sortedItems);
  };



  const handleEdit = (index) => {
    setEditIndex(index);
    const item = carItem[index];
    setEditedName(item.name);
    setEditedModel(item.model);
    setEditedPrice(item.price);
  };

  const handleSave = (index) => {
    const newItem = {
      ...carItem[index],
      name: editedName,
      model: editedModel,
      price: editedPrice,
    };
    const newItems = [...carItem];
    newItems.splice(index, 1, newItem);
    setCarItem(newItems);
    setEditIndex(null);
  };


  const handleDelete = (index) => {
    const newItems = [...carItem];
    newItems.splice(index, 1);
    setCarItem(newItems);
    setEditIndex(null);
  };




  return (
    <div className="container">

      <button className="fetch-button" onClick={fetchData}>
        Fetch
      </button>
      <button className="sort-button" onClick={sortItemsByPrice}>
        Sort by price
      </button>
      <button className="sort-button" onClick={sortItemsByYear}>
        Sort by year
      </button>


      <div className="carItem">
        {carItem &&
          carItem.map((item, index) => {
            const isEditing = index === editIndex;
            const latitude = item.latitude;
            const longitude = item.longitude;
            //console.log(latitude)
            //console.log(longitude)


            return (
              <div className="card card-row" key={index}>
                
                <div className="card__top">
                  <div className="card__name">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      <p>Name: {item.name}</p>
                    )}
                  </div>

                  <div className="card__model">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedModel}
                        onChange={(e) => setEditedModel(e.target.value)}
                      />
                    ) : (
                      <p>Model: {item.model}</p>
                    )}
                  </div>

                </div>

                <div className="card__bottom">
                  <div className="card__prices">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                      />
                    ) : (
                      <p>Price: {item.price}$</p>
                    )}
                  </div>

                  <div className="card__actions">
                    {isEditing ? (
                      <button
                        className="save-button"
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="map">
                  
                        

                  <YMaps
                    enterprise
                    query={{
                    apikey: 'dc4774c8-6b1b-4982-b197-f045e946635e' ,
                  }}>

                        <Map defaultState={{ center: [latitude, longitude ], zoom: 15 }} />

                    </YMaps>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Header;
