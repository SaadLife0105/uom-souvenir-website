ALTER TABLE "reservation_items" ADD COLUMN "item_label" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "payment_reference_number" text;