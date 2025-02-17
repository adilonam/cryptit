"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ModifyResources = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    async function fetchInitialContent() {
      if (session) {
        try {
          const apiUrl = "http://localhost:8082/api/v1/chat-resources";
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          setContent(response.data[0]?.text || "");
        } catch (error) {
          console.error("Error fetching initial content:", error);
        }
      }
    }
    fetchInitialContent();
  }, [session]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const updateContent = async (e) => {
    toast.promise(
      handleSubmit(e),
       {
         loading: 'Saving changes...',
         success: <b>Settings saved!</b>,
         error: <b>Could not save.</b>,
       }
     );
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session) {
      try {
        const apiUrl = "http://localhost:8082/api/v1/chat-resources";

        const response = await axios.post(
          apiUrl,
          { text: content },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );
        console.log(response.data);
        // Optionally reset content after saving, though you may want to keep it
        setContent(response.data[0]?.text);
      } catch (error) {
        console.error("Error updating resource:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={updateContent}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Content
          </label>
          <textarea
            rows={6}
            name="content"
            placeholder="Enter content here"
            value={content}
            onChange={handleChange}
            className="min-h-[60vh] w-full resize-y rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>
        <div className="flex items-center justify-end px-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyResources;
