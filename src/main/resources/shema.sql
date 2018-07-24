--
-- Create table user
--
CREATE TABLE IF NOT EXISTS `user`(
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_login` VARCHAR(60) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_first_name` VARCHAR(60),
    `user_last_name` VARCHAR(60),
    `user_address` VARCHAR(255),
    `user_profile_photo` VARCHAR(255),
    `user_profile_header` VARCHAR(255),
    `created_date` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    `user_date_birthday` TIMESTAMP,
    PRIMARY KEY(`user_id`)
);

--
-- Create table comment
--
CREATE TABLE IF NOT EXISTS `COMMENT`(
    `comment_id` BIGINT NOT NULL AUTO_INCREMENT,
    `comment_content` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    `user_id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL,
    PRIMARY KEY(`comment_id`),
);

--
-- Create table message
--
CREATE TABLE IF NOT EXISTS `message`(
    `message_id` BIGINT NOT NULL,
    `message_content` VARCHAR(255) NOT NULL,
    `dialog_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `created_date` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    PRIMARY KEY(`message_id`),
);

--
-- Create table post
--
CREATE TABLE IF NOT EXISTS `post`(
    `post_id` BIGINT NOT NULL AUTO_INCREMENT,
    `post_content` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP NOT NULL,
    `last_update` TIMESTAMP NOT NULL,
    `user_id` BIGINT NOT NULL,
    PRIMARY KEY (`post_id`)
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
ALTER TABLE `post`        ADD CONSTRAINT fk_post_user       FOREIGN KEY(`user_id`)    REFERENCES `user`(`user_id`);
ALTER TABLE `message`     ADD CONSTRAINT fk_message_dialog  FOREIGN KEY(`dialog_id`)  REFERENCES `dialog`(`dialog_id`);
ALTER TABLE `message`     ADD CONSTRAINT fk_message_user    FOREIGN KEY(`user_id`)    REFERENCES `user`(`user_id`);
ALTER TABLE `favorites`   ADD CONSTRAINT fk_user_join       FOREIGN KEY(`user_id`)    REFERENCES `user`(`user_id`);
ALTER TABLE `favorites`   ADD CONSTRAINT fk_post_join       FOREIGN KEY(`post_id`)    REFERENCES `post`(`post_id`);
ALTER TABLE `comment`     ADD CONSTRAINT fk_comment_post    FOREIGN KEY(`post_id`)    REFERENCES `post`(`post_id`);
ALTER TABLE `comment`     ADD CONSTRAINT fk_comment_user    FOREIGN KEY(`user_id`)    REFERENCES `user`(`user_id`);
ALTER TABLE `user_dialog` ADD CONSTRAINT fk_user_join       FOREIGN KEY(`user_id`)    REFERENCES `user`(`user_id`);
ALTER TABLE `user_dialog` ADD CONSTRAINT fk_dialog_join     FOREIGN KEY(`dialog_id`)  REFERENCES `dialog`(`dialog_id`);
