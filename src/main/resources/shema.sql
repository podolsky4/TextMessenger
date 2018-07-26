--
-- Create table user
--
CREATE TABLE IF NOT EXISTS `user`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(60) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(60),
    `last_name` VARCHAR(60),
    `address` VARCHAR(255),
    `profile_photo` VARCHAR(255),
    `profile_banner` VARCHAR(255),
    `birthday` TIMESTAMP,
    `created_at` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NULL,
    PRIMARY KEY(`id`)
);

--
-- Create table comment
--
CREATE TABLE IF NOT EXISTS `comment`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    PRIMARY KEY(`id`),
);

--
-- Create table message
--
CREATE TABLE IF NOT EXISTS `message`(
    `id` BIGINT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `dialog_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    PRIMARY KEY(`id`),
);

--
-- Create table post
--
CREATE TABLE IF NOT EXISTS `post`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    `user_id` BIGINT NOT NULL,
    PRIMARY KEY (`id`)
);

--
-- Create table dialog
--
CREATE TABLE IF NOT EXISTS `dialog`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`)
);


--
-- Create join table favorites
--
CREATE TABLE IF NOT EXISTS `favorites`(
    `user_id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL
);

--
-- Create join table user_dialog
--
CREATE TABLE IF NOT EXISTS `user_dialog`(
    `user_id` BIGINT NOT NULL,
    `dialog_id` BIGINT NOT NULL
);

--
-- Create constraints for tables
--
ALTER TABLE `post`        ADD CONSTRAINT fk_post_user       FOREIGN KEY(`user_id`)    REFERENCES `user`(`id`);
ALTER TABLE `message`     ADD CONSTRAINT fk_message_dialog  FOREIGN KEY(`dialog_id`)  REFERENCES `dialog`(`id`);
ALTER TABLE `message`     ADD CONSTRAINT fk_message_user    FOREIGN KEY(`user_id`)    REFERENCES `user`(`id`);
ALTER TABLE `favorites`   ADD CONSTRAINT fk_user_join       FOREIGN KEY(`user_id`)    REFERENCES `user`(`id`);
ALTER TABLE `favorites`   ADD CONSTRAINT fk_post_join       FOREIGN KEY(`post_id`)    REFERENCES `post`(`id`);
ALTER TABLE `comment`     ADD CONSTRAINT fk_comment_post    FOREIGN KEY(`post_id`)    REFERENCES `post`(`id`);
ALTER TABLE `comment`     ADD CONSTRAINT fk_comment_user    FOREIGN KEY(`user_id`)    REFERENCES `user`(`id`);
ALTER TABLE `user_dialog` ADD CONSTRAINT fk_user_join       FOREIGN KEY(`user_id`)    REFERENCES `user`(`id`);
ALTER TABLE `user_dialog` ADD CONSTRAINT fk_dialog_join     FOREIGN KEY(`dialog_id`)  REFERENCES `dialog`(`id`);