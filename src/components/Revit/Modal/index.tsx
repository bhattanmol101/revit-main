import { Business } from "@/src/types/business";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useSession } from "../../Provider";
import FnBForm from "../../Forms/FnB";
import DefaultForm from "../../Forms";
import { User } from "@/src/types/user";

type RevitModalProps = {
  business: Business;
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function RevitModal({
  business,
  isOpen,
  onOpenChange,
}: RevitModalProps) {
  const { user } = useSession();

  if (!user) {
    return;
  }

  const revitForm = () => {
    switch (business.industry) {
      case "fnb":
        return (
          <FnBForm
            user={user as User}
            business={business}
            next={onOpenChange}
          />
        );
      default:
        return <DefaultForm />;
    }
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="border-b-1 text-default-600">
          Your revit for {business.name}
        </ModalHeader>
        <ModalBody className="flex flex-col justify-center items-center py-4">
          {revitForm()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
