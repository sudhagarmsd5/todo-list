import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  TrashIcon,
  StarIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import ModalDialog from "modules/common/components/modal-dialog";
import apiCall from "API/apiCall";
import ConfirmDialog from "modules/common/components/confirm-dialog";
import { Button } from "components";

export default function Dashboard() {
  const date = new Date();
  const displayDate = format(date, "yyyy, MMM dd");

  // addEditDialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // deleteConfirmationDialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // tasksDataSource
  const [posts, setPosts] = useState([]);

  // storingFormData
  const [formVal, setFormVal] = useState("");

  // searchFilter
  const [search, setSearch] = useState("");

  // selectedTaskValues
  const [temp, setTemp] = useState("");

  // addEditDialogTypes
  const [dialogType, setDialogType] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search
    ? posts
    : posts.filter((posts) =>
        posts.name.toLowerCase().includes(search.toLowerCase())
      );

  // taskElements
  const listData = filtered.map((e) => (
    <div key={e.id} className="w-[250px] h-[200px] rounded-lg bg-blue p-4">
      <h5 className="mb-2 text-xl font-medium text-white">{e.name}</h5>
      <p className="mb-8 text-base font-light text-white ">{e.description}</p>
      <div className="text-white mb-1">{e.date}</div>
      <hr className="mb-4 border border-t-1 border-gray-300 border-dashed text-white bg-white h-[1px]" />

      <div className="flex justify-between w-full">
        <div className="w-1/2">
          <div className="text-white">
            {e.status ? (
              <span className="w-[95px]  bg-light_green text-dark_green text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg">
                completed
              </span>
            ) : (
              <div className="w-[95px] bg-custom_yellow text-custom_brown text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg">
                uncompleted
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <span className="flex justify-end space-x-3">
              <div className="text-white">
                {e.is_important ? (
                  <div>
                    <StarIcon className="h-6 w-4 text-red-600" />
                  </div>
                ) : (
                  <div>
                    <StarIcon className="h-6 w-4 " />
                  </div>
                )}
              </div>
              <div>
                <TrashIcon
                  className="h-6 w-4 cursor-pointer"
                  onClick={() => remove(e)}
                />
              </div>
              <div>
                <PencilSquareIcon
                  className="h-6 w-4 cursor-pointer"
                  onClick={() => openEditDialog(e)}
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  ));

  // hooks
  useEffect(() => {
    // getApiCall();
      get();
  }, []);

  useEffect(() => {
    // console.log(formVal);
    if (formVal?.form_val?.length !== 0) {
      if (formVal?.form_type === "Add new Task") {
          post(formVal?.form_val);
        // postApiCall(formVal?.form_val);
      } else if (formVal?.form_type === "Edit Task") {
          update(formVal?.form_val)
        // updateApiCall(formVal.form_val);
      }
    }
  }, [formVal]);

  const remove = (e) => {
    setTemp(e);
    setIsConfirmDialogOpen(true);
  };

  function deleted(val) {
    // deleteApiCall(val.id);
      deleteApi(val.id)
  }

  // apiCalls

  const postApiCall = async (params) => {
    await apiCall
      .PostCall(process.env.REACT_APP_TASKS_URL, "POST", params)
      .then(async (res) => {
        getApiCall();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 async function post(params){
      await apiCall.SupaBase.from('todo_tasks_master').insert(params).then((res)=>{
          get();
      })
    }

    async function update(params){
        await apiCall.SupaBase.from('todo_tasks_master').update(params).eq('id',params.id).then((res)=>{
            get()
        })
    }

    async function deleteApi(id){
     await apiCall.SupaBase.from('todo_tasks_master').delete().eq('id',id).then((res)=>{
         get()
     })
    }

  const getApiCall = async () => {
    await apiCall
      .GetCall(process.env.REACT_APP_TASKS_URL, "GET")
      .then(async (res) => {
        console.log(res);
        setPosts(res.data);
      });
  };

 async function get(){
   await apiCall.SupaBase.from('todo_tasks_master').select().order('id', { ascending: false }).then((res)=>{
     console.log(res,"response---------------")
       setPosts(res.data);
   });
  }

  const deleteApiCall = async (params) => {
    // setTemp("");
    await apiCall
      .PostCall(`${process.env.REACT_APP_TASKS_URL}/${params}`, "DELETE")
      .then(async (res) => {
        getApiCall();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateApiCall = async (params) => {
    await apiCall
      .PostCall(
        `${process.env.REACT_APP_TASKS_URL}/${params.id}`,
        "PUT",
        params
      )
      .then(async (res) => {
        getApiCall();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // dialogs
  function openAddDialog() {
    setIsDialogOpen(true);
    setDialogType({ name: "Add new Task" });
  }

  function openEditDialog(e) {
    setIsDialogOpen(true);
    setDialogType({ name: "Edit Task", values: e });
  }

  return (
    <>
      <ModalDialog
        data={dialogType}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        formVal={setFormVal}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        setIsOpen={setIsConfirmDialogOpen}
        deleted={deleted}
        data={temp}
      />

      <div className="container mx-auto">
        <div className="flex justify-start mb-1 text-black text-2xl font-bold">
          TO-DO LIST
        </div>
        {/* menu */}
        <div className="flex justify-between flex-wrap">
          <div className="relative mb-4 flex">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search task"
              className="relative m-0 -mr-0.5 block w-[200px] rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700"
            />
            <MagnifyingGlassIcon className="w-6 relative z-[2] left-1" />
          </div>
          <div className="text-center text-gray-700 text-[15px] font-semibold">
            {displayDate}
          </div>
          <div>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white bg-blue"
              onClick={() => openAddDialog()}
            >
              Add new Task
            </button>
            {/* <Button
              onClick={() => openAddDialog()}
              text="Add new Task"
              classNames="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white bg-blue"
            /> */}
          </div>
        </div>
        {/* tasks */}
        <div className="pt-3">
          <div className="flex flex-wrap gap-2 lg:gap-10 md:gap-5 sm:gap-4 justify-center lg:justify-start">
            {listData}
          </div>
        </div>
      </div>
    </>
  );
}
