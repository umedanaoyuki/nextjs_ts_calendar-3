import Modal from "react-modal";
import { Schedule } from "../../types/calendar";
import { Textarea } from "../atoms/Textarea";
import { useCreateSchedule } from "../../hooks/useCreateSchedule";
import { Button } from "@/components/ui/button";
import { ModalInput } from "@/components/ui/input";

type PropsType = {
  isOpen: boolean;
  closeModal: () => void;
  addSchedule: (schedule: Schedule) => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    height: "50vh",
    transform: "translate(-50%, -50%)",
  },
};

export const CreateScheduleModal = ({
  isOpen,
  closeModal,
  addSchedule,
}: PropsType) => {
  const { newSchedule, errorMessage, changeNewSchedule, handleCreateSchedule } =
    useCreateSchedule({ closeModal, addSchedule });

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div>
        <h3 className="bg-linear-to-br from-purple-600 to-pink-600 bg-clip-text text-center text-3xl font-bold text-transparent">
          予定作成
        </h3>
        {errorMessage && (
          <div className="p-5 mb-5 bg-red-500 text-white text-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <form
          className="flex flex-col gap-8 mt-8"
          onSubmit={handleCreateSchedule}
        >
          <div className="w-[100%] flex items-center">
            <label htmlFor="title-form" className="w-[30%] text-purple-800">
              タイトル
            </label>
            <ModalInput
              id="title-form"
              name="title"
              type="text"
              value={newSchedule.title}
              onChange={changeNewSchedule}
            />
          </div>
          <div className="w-[100%] flex items-center">
            <label htmlFor="date-form" className="w-[30%] text-purple-800">
              日付
            </label>
            <ModalInput
              id="date-form"
              name="date"
              type="date"
              value={newSchedule.date}
              onChange={changeNewSchedule}
            />
          </div>
          <div className="w-[100%] flex items-center">
            <label
              htmlFor="description-form"
              className="w-[30%] text-purple-800"
            >
              内容
            </label>
            <Textarea
              id="description-form"
              name="description"
              value={newSchedule.description}
              onChange={changeNewSchedule}
              className="w-full border-4 border-solid border-purple-800 rounded-md p-2"
            />
          </div>
          <div className="flex justify-center">
            <Button size="lg" onClick={() => null}>
              作成
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
