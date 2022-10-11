import React, { useEffect, useState } from "react";
import axios from "axios";
import AddSlot from "./AddSlot";

const ApprovedList = () => {
  const [list, setList] = useState([]);
  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admins/ApprovedList/")
      .then((response) => setList(response.data));
  }, []);
  console.log("list", list);

  let [slotModals, setSlotModals] = useState(false);

  const viewApplicant = (id) => {
    axios
      .get(`http://127.0.0.1:8000/admins/ViewApplicationDetails/${id}`)
      .then((response) => {
        setApplicant(response.data);
        console.log("qqqqqqqqqqqqqqqqqqq", applicant);
      });
  };
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Edit
                      </th>
                     
                    </tr>
                  </thead>
                  <AddSlot onclose={slotModal} open={slotModals}>
                    <div className="align-content: center">
                      <div>{applicant.fullname}</div>
                      <div>{applicant.phone}</div>
                      <div>{applicant.company_name}</div>
                      <div>{applicant.city}</div>
                    </div>
                  </AddSlot>
                  <tbody className="divide-y divide-gray-200">
                    {list.map((data, id) => (
                      <tr key={id}>
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
                               viewApplicant(data.id);

                            }}
                            className="text-green-500 hover:text-green-700"
                            href="#"
                          >
                            view
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

export default ApprovedList;
