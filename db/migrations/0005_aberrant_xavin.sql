ALTER TABLE "business_review" ALTER COLUMN "json" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "business_review" ALTER COLUMN "json" SET DEFAULT '[]'::json;--> statement-breakpoint