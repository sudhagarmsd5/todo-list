import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const ModalDialog = ({ data, isOpen, setIsOpen, formVal }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: false,
      date: "",
      is_important: false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values, "submitted!");
      // handle submission
      setIsOpen(false);
      formVal({ form_val: values, form_type: data.name });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (data.name === "Edit Task") {
      formik.setValues(data.values);
    }
  }, [data]);

  const closeDialog = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog()}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title className="text-xl text-center p-1">
            {data.name}
          </Dialog.Title>
          <form className="register-form" onSubmit={formik.handleSubmit}>
            <div className="p-5 flex flex-col gap-4 text-sm">
              <div>
                <label className="text-gray-600 font-bold inline-block pb-2">
                  Title
                </label>
                <input
                  id="name"
                  name="name"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="text"
                  placeholder="e.g, study for the test"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-700">{formik.errors.name}</div>
                ) : null}
              </div>
              <div>
                <label className="text-gray-600 font-bold inline-block pb-2">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-700">{formik.errors.date}</div>
                ) : null}
              </div>
              <div>
                <label className="text-gray-600 font-bold inline-block pb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="text"
                  placeholder="e.g, study for the test"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-700">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
              <div>
                <label className="inline-flex items-center mt-3">
                  <input
                    id="is_important"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-red-600"
                    value={formik.values.is_important}
                    checked={formik.values.is_important}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="ml-2 text-gray-700">Important</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center mt-3">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={formik.values.status}
                    checked={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-checkbox h-5 w-5 text-red-600"
                  />
                  <span className="ml-2 text-gray-700">Completed</span>
                </label>
              </div>
              <button
                className="border-black border-solid border rounded mx-2 mt-8 py-1 px-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;
