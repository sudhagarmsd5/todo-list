import { Dialog } from "@headlessui/react";

export default function ConfirmDialog(props) {
  const { data, isOpen, setIsOpen } = props;
  const closeDialog = () => {
    setIsOpen(false);
  };

  const deleteConfirm = () => {
    setIsOpen(false);
    props.deleted(data);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => closeDialog()}
        className="relative z-50 box-shadow[0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)]"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center  rounded-2xl shadow-xl">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-5">
            <Dialog.Title className="text-xl text-left text-black mb-1">
              Are you sure ?
            </Dialog.Title>
            <Dialog.Description className="text-lg text-gray-500 mb-4">
              This {data?.name} will be deleted permanently.
            </Dialog.Description>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white bg-blue"
                onClick={deleteConfirm}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
