import { User } from "@/src/types/user";
import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import React from "react";
import { EditIcon } from "../../Icons";
import { getJoingDateString, getPostDateString } from "@/src/utils/date-utils";
import EditProfileModal from "../Edit";

function ProfileDetails({ profile }: { profile: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full bg-default-50 p-3 rounded-xl">
      <div className="flex flex-row justify-between items-center w-full px-1">
        <div>
          <Avatar
            showFallback
            className="sm:w-28 sm:h-28 h-24 w-24 text-xl"
            name={`${profile.name}`}
            src={profile.profileImage ? profile.profileImage : ""}
          />
        </div>
        <div className="flex flex-col w-full gap-1 pl-3 pr-0">
          <div className="flex flex-row items-center justify-between flex-wrap">
            <p className="sm:text-xl font-bold text-default-800">
              {profile.name}
            </p>
            <Button
              isIconOnly
              color="default"
              size="sm"
              spinnerPlacement="end"
              onPress={onOpen}
            >
              <EditIcon size={20} />
            </Button>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-3 gap-1 text-default-600">
            <p className="text-sm">
              Since: {getJoingDateString(new Date(profile.createdAt))}
            </p>
            {profile.dob && (
              <p className="text-sm">
                Birthday: {getPostDateString(new Date(profile.dob))}
              </p>
            )}
          </div>
        </div>
      </div>
      {profile.bio && <Divider className="my-3" />}
      <p className="text-sm whitespace-pre-line">{profile.bio}</p>
      {isOpen && (
        <EditProfileModal
          isOpen={isOpen}
          user={profile}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}

export default ProfileDetails;
