"use client";

import { JsonFieldType } from "@/src/types/form";
import { BusinessReview } from "@/src/types/review";
import { LABEL_MAPPER } from "@/src/utils/constants";
import { getPostDateString } from "@/src/utils/date-utils";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider, Input, Slider } from "@heroui/react";
import { User } from "@heroui/user";
import { JSX } from "react";
import BusinessReviewMenu from "./Menu";

export default function BusinessReviewCard({
  review,
}: {
  review: BusinessReview;
}) {
  const renderField = (field: JsonFieldType) => {
    switch (field.type) {
      case "RATING":
        return Number(field.value) > 0 ? (
          <Slider
            aria-label="Volume"
            label={LABEL_MAPPER.get(field.label)}
            color="primary"
            hideThumb
            classNames={{
              labelWrapper: "mb-0",
              label: "text-default-600 text-tiny",
              value: "text-default-600 text-tiny",
              track: "m-0 p-0",
            }}
            maxValue={5}
            minValue={0}
            value={Number(field.value)}
            size="sm"
          />
        ) : null;
      case "INPUT":
      case "DROPDOWN":
        return field.value && field.value !== "0" ? (
          <Input
            label={LABEL_MAPPER.get(field.label)}
            type="text"
            classNames={{
              input: "text-tiny",
            }}
            variant="faded"
            size="sm"
            readOnly
            value={String(field.value)}
          />
        ) : null;

      default:
        return null;
    }
  };

  const renderJsonFields = (json: any) => {
    const jsonFieldGrid: any[][] = [[]];
    let i = 0;
    let j = 0;
    let n = json.length;

    jsonFieldGrid[i] = [];
    while (j < n) {
      if (renderField(json[j])) {
        jsonFieldGrid[i].push(renderField(json[j]));
      }
      j++;
      if (jsonFieldGrid[i].length === 2) {
        i++;
        jsonFieldGrid[i] = [];
      }
    }

    if (jsonFieldGrid[0].length === 0) {
      return;
    }

    return (
      <>
        <Divider className="my-3" />
        <div className="flex flex-col gap-4">
          {jsonFieldGrid.map(
            (row: JSX.Element[], index: number) =>
              row.length > 0 && (
                <div
                  key={index}
                  className="flex flex-row gap-2 items-center justify-center w-full"
                >
                  {row.map(
                    (field: JSX.Element, fieldIndex: number) =>
                      field && (
                        <div key={fieldIndex} className="w-full">
                          {field}
                        </div>
                      )
                  )}
                </div>
              )
          )}
        </div>
      </>
    );
  };

  return (
    <Card key={review.id} className="w-full my-1">
      <CardHeader className="justify-between">
        <User
          avatarProps={{
            src: String(review.userProfileImage),
            showFallback: true,
            name: `${review.userName}`,
            className: "h-8 w-8 sm:h-10 sm:w-10",
          }}
          classNames={{
            name: "text-tiny sm:text-sm",
          }}
          description={getPostDateString(review.createdAt)}
          name={`${review.userName}`}
        />
        <BusinessReviewMenu review={review} />
      </CardHeader>
      <CardBody className="overflow-visible px-3 pt-0">
        <Slider
          aria-label="Volume"
          label="Overall Rating"
          color="primary"
          hideThumb
          classNames={{
            labelWrapper: "mb-0",
            label: "text-default-600 text-tiny sm:text-sm",
            value: "text-default-600 text-tiny sm:text-sm",
            track: "m-0 p-0",
          }}
          maxValue={5}
          minValue={0}
          value={review.rating}
          size="sm"
        />
        <Divider className="my-3" />
        <p className="text-tiny sm:text-sm text-default-600 whitespace-pre-line">
          {review.text}
        </p>
        {renderJsonFields(review.json)}
      </CardBody>
    </Card>
  );
}
