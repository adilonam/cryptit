"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useState } from "react";

const FormLayout = () => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [validUntil, setValidUntil] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [realPrice, setRealPrice] = useState("");

  const handleDateChange = (selectedDate: Date) => {
    setValidUntil(selectedDate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const certificate = {
      name,
      provider,
      validUntil,
      description,
      realPrice: parseFloat(realPrice),
    };

    try {
      const response = await fetch("http://localhost:8082/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificate),
      });

      if (!response.ok) {
        throw new Error("Failed to save certificate");
      }

      // Clear form fields on successful save
      setName("");
      setProvider("");
      setValidUntil(null);
      setDescription("");
      setRealPrice("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add new certificate program" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        
        <div className="flex flex-col gap-9">
          {/* <!-- Certificate Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Certificate
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter certificate name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Provider
                  </label>
                  <input
                    type="text"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="Enter provider name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Real Price
                  </label>
                  <input
                    type="number"
                    value={realPrice}
                    onChange={(e) => setRealPrice(e.target.value)}
                    placeholder="Enter real price"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Valid Until
                  </label>
                  <DatePickerOne onDateChange={handleDateChange} />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col gap-9">
          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload image event
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne onDateChange={handleDateChange} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
