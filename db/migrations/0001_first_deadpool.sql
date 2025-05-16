CREATE TABLE "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"name" text NOT NULL,
	"owner_name" text NOT NULL,
	"description" text NOT NULL,
	"logo" text DEFAULT '',
	"location" text NOT NULL,
	"contact" text NOT NULL,
	"website" text DEFAULT '',
	"industry" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forum" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"logo" text DEFAULT '',
	"is_public" boolean DEFAULT false NOT NULL,
	"industry" text NOT NULL,
	"users" uuid[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);

--> statement-breakpoint
ALTER TABLE "business" ADD CONSTRAINT "business_admin_id_profile_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forum" ADD CONSTRAINT "forum_admin_id_profile_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;