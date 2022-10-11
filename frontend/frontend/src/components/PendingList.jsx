import { useEffect, useState } from "react";
import axios from "axios";

import AddSlot from "./AddSlot";

// CommonJS

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>;

const PendingList = () => {
  const Swal = require("sweetalert2");
  const [list, setList] = useState([]);
  const [applicant,setApplicant] =useState([])
 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admins/BookingList/")
      .then((response) => setList(response.data));
  }, []);
  console.log("list", list);

  // condt approveApplication = (id) => {

  // }

  const declineApplication = (id) => {
    Swal.fire({
      title: "Are you sure about the decline?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://127.0.0.1:8000/admins/DeclineBooking/${id}`)
          .then(() => window.location.reload());
      }
    });
  };

  const approveApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://127.0.0.1:8000/admins/ApproveBooking/${id}`)
          .then(() => window.location.reload());
      }
    });
  };

  const viewApplicant = (id) => {
    axios.get(`http://127.0.0.1:8000/admins/ViewApplicationDetails/${id}`)
    .then((response) => {
        setApplicant(response.data);
    })
  }
  let [slotModals, setSlotModals] = useState(false);

  function slotModal() {
    setSlotModals(!slotModals);
  }

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Applicant
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Company name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Approve
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Decline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {list.map((data, id) => (
                      <tr key={id}>
                        <AddSlot onclose={slotModal} open={slotModals}>
                          <div className="align-content: center">
                            <div>{applicant.fullname}</div>

                            <div>{applicant.phone}</div>
                            <div>{applicant.company_name}</div>
                            <div>{applicant.city}</div>
                          </div>
                        </AddSlot>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {data.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {data.fullname}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {data.company_name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            onClick={() => {
                               slotModal();
                               viewApplicant(data.id)

                            }}
                            className="text-green-500 hover:text-green-700"
                            href="#"
                          >
                            view
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-green-500 hover:text-green-700"
                            href="#"
                            onClick={() => approveApplication(data.id)}
                          >
                            Approve
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                            onClick={() => declineApplication(data.id)}
                          >
                            Decline
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingList;
