import { PageState } from "@/src/types";
import { UpdateUser, User } from "@/src/types/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Input,
  Textarea,
  Button,
  DatePicker,
  DateValue,
} from "@heroui/react";
import { useState } from "react";
import FileInput from "../../Common/File/Input";
import { updateUserAction } from "@/src/app/(site)/(home)/profile/action";
import { convertDateToCalenderDate } from "@/src/utils/date-utils";

type EditProfileModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  user: User;
};

export default function EditProfileModal(props: EditProfileModalProps) {
  const { isOpen, onOpenChange, user } = props;

  const [pageState, setPageState] = useState<PageState>({
    loading: false,
    success: false,
    error: "",
  });

  const [file, setFile] = useState<Blob>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [name, setName] = useState<string>(user.name);
  const [dob, setDob] = useState(user.dob ? user.dob : new Date("2024-04-04"));
  const [bio, setBio] = useState<string>(user.bio ? user.bio : "");

  const onProfileImageChange = (e: any) => {
    e.preventDefault();

    setFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onDobChange = (value: DateValue | null) => {
    if (value) {
      setDob(new Date(value.toString()));
    }
  };

  const onModalOpenChange = () => {
    if (!pageState.disabled) {
      onOpenChange();
    }
  };

  const profileImage = fileUrl ? fileUrl : String(user.profileImage);

  const onSubmit = async () => {
    setPageState((prevState) => ({
      ...prevState,
      disabled: true,
      loading: true,
    }));

    const updateUser: UpdateUser = {
      name: name,
      dob: dob,
      bio: bio,
      profileImage: user.profileImage ? user.profileImage : "",
    };

    const res = await updateUserAction(user.id, updateUser, file);

    setPageState((prevState) => ({
      ...prevState,
      disabled: false,
      loading: false,
      success: res.success,
      error: res.error,
    }));

    onOpenChange();
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onModalOpenChange}
    >
      <ModalContent>
        <ModalHeader className="border-b-1 border-default-200">
          Edit Profile
        </ModalHeader>
        <ModalBody className="flex flex-col items-center py-10">
          <FileInput
            accept="image/*"
            className="w-36 h-36 rounded-full"
            handleFileUpload={onProfileImageChange}
            icon={
              <Avatar
                showFallback
                className="w-32 h-32 text-xl"
                name={`${user.name}`}
                src={profileImage}
              />
            }
          />
          <div className="flex flex-row w-full gap-2">
            <Input
              isRequired
              errorMessage="Please enter a valid name"
              label="Name"
              name="name"
              type="text"
              value={name}
              variant="bordered"
              onValueChange={setName}
            />

            <DatePicker
              errorMessage="Please enter a valid date."
              label="Birth Date"
              name="dob"
              granularity="day"
              showMonthAndYearPickers={true}
              value={convertDateToCalenderDate(dob)}
              onChange={onDobChange}
            />
          </div>

          <Textarea
            className="col-span-4 md:col-span-4 mb-6 md:mb-0"
            label="Bio"
            name="bio"
            maxRows={2}
            value={bio}
            variant="bordered"
            onValueChange={setBio}
          />
        </ModalBody>
        <ModalFooter className="border-t-1 border-default-200">
          <Button
            color="primary"
            isDisabled={pageState.disabled}
            isLoading={pageState.loading}
            spinnerPlacement="end"
            onPress={onSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
