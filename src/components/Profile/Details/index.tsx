import { User } from "@/src/types/user";
import { Avatar, Button, Divider, Spinner, useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../../Icons";
import { getJoingDateString, getPostDateString } from "@/src/utils/date-utils";
import EditProfileModal from "../Edit";
import { fetchUserProfileAction } from "@/src/app/(site)/(home)/profile/action";

function ProfileDetails({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState<boolean>();
  const [profile, setProfile] = useState<User>();

  const fetchUserProfile = async () => {
    if (!profile) {
      setLoading(true);
      const resp = await fetchUserProfileAction(id);

      setLoading(false);
      if (resp.profile) {
        setProfile(resp.profile);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <Spinner className="w-full self-center" size="sm" />;
  }

  if (!profile) {
    return (
      <p className="text-tiny sm:text-sm">
        Could not find the user, Please try again!
      </p>
    );
  }

  return (
    <div className="w-full bg-default-50 p-3 rounded-xl">
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <Avatar
            showFallback
            className="lg:w-28 lg:h-28 h-14 w-14 lg:text-xl"
            name={`${profile.name}`}
            src={profile.profileImage ? profile.profileImage : ""}
          />
        </div>
        <div className="flex flex-col w-full gap-1 lg:pl-3 pl-2 pr-0">
          <div className="flex flex-row items-center justify-between flex-wrap">
            <p className="lg:text-xl font-bold text-default-800">
              {profile.name}
            </p>
            <Button
              isIconOnly
              color="default"
              size="sm"
              spinnerPlacement="end"
              className="h-6 w-4 lg:h-8 lg:w-8"
              onPress={onOpen}
            >
              <EditIcon size={20} className="h-4 lg:h-6" />
            </Button>
          </div>
          <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-3 gap-1 text-default-600">
            <p className="lg:text-sm text-tiny">
              Since: {getJoingDateString(new Date(profile.createdAt))}
            </p>
            {profile.dob && (
              <p className="lg:text-sm text-tiny">
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
