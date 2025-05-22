CREATE TABLE "business_industry_form" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"industry" text NOT NULL,
	"form_id" text NOT NULL,
	"form_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
