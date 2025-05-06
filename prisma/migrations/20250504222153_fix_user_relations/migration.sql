-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_division_id_fkey";

-- DropForeignKey
ALTER TABLE "event_gallery" DROP CONSTRAINT "event_gallery_event_id_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "sifest_activities" DROP CONSTRAINT "sifest_activities_sifest_id_fkey";

-- AddForeignKey
ALTER TABLE "event_gallery" ADD CONSTRAINT "event_gallery_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sifest_activities" ADD CONSTRAINT "sifest_activities_sifest_id_fkey" FOREIGN KEY ("sifest_id") REFERENCES "sifest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
