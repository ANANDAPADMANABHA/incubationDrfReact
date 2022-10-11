import axios from "axios";
import React, { useEffect, useState } from "react";
import AddSlot from "./AddSlot";

const SlotBooking = () => {
  const Swal = require("sweetalert2");

  const [slots, setSlots] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [applicantId, setApplicantId] = useState("");
  const [slotId, setSlotId] = useState();
  let [slotModals, setSlotModals] = useState(false);
  let [addSlotModal, setAddSlotModal] = useState(false);



  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admins/SlotList/")
      .then((response) => setSlots(response.data));
  }, []);

  function slotModal(id) {
    setSlotModals(!slotModals);
    setSlotId(id);
  }
  function slotModalAdd() {
    setAddSlotModal(!addSlotModal);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admins/ApprovedList/")
      .then((response) => setApplicant(response.data));
  }, []);

  let addNewSlots = async (e) => {
    console.log("h1111111111111111111111111111111111");
    e.preventDefault();

    let response = await fetch(
      `http://127.0.0.1:8000/admins/BookSlot/${slotId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking: applicantId }),
      }
    );
    console.log("wwwwwwwwwwww", slotId, applicantId);

    if (response.status === 200) {
      window.location.reload();
    } else {
      alert("something went wrong !");
    }
  };

  const addNewSlot = () => {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiii", slotId, applicantId);
    axios
      .post(`http://127.0.0.1:8000/admins/BookSlot/${slotId}`, {
        booking: applicantId,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  const createSlot = (e) => {
    axios
      .post("http://127.0.0.1:8000/admins/CreateSlot/", {
        room_number: e.target.roomNo.value,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <div>
      <button
        onClick={slotModalAdd}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-3 px-4 rounded-full"
      >
        add
      </button>
      <AddSlot onclose={slotModalAdd} open={addSlotModal}>
        <form onSubmit={createSlot}>
          <input
            name="roomNo"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />

          <div className="mt-6">
            <input
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            />
          </div>
        </form>
      </AddSlot>
      <div className=" p-10  grid  grid-cols-9 ">
        {slots.map((data, id) => (
          <div
            onClick={() => {
              data.is_booked ? Swal.fire("Already Booked") : slotModal(data.id);
            }}
            key={id}
            className={` text-slate-900 p-5 rounded-lg shadow-lg ${
              data.is_booked ? `bg-red-500 ` : `bg-blue-500`
            }  m-2 w-24 h-20 text-center`}
          >
            <h1 className="mb-4 text-sm font-bold">Room :{data.room}</h1>
          </div>
        ))}
        <AddSlot onclose={slotModal} open={slotModals}>
          <p className="mb-7 text-2xl">Booking Slot</p>
          <div>
            <select
              onChange={(e) => {
                setApplicantId(e.target.value);
              }}
              name="booking"
              id=""
              className="w-full"
            >
              <option hidden>select</option>
              {applicant.map((list, id) => {
                return (
                  <option value={`${list.id}`} key={id}>
                    {list.company_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button onClick={addNewSlots}>submit</button>
          </div>
        </AddSlot>
      </div>
    </div>
  );
};

export default SlotBooking;
