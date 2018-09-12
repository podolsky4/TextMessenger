--
-- Create table user
--
CREATE TABLE IF NOT EXISTS `user` (
  `id`             BIGINT       NOT NULL AUTO_INCREMENT,
  `login`          VARCHAR(60)  NOT NULL,
  `email`          VARCHAR(255) NOT NULL,
  `password`       VARCHAR(255) NOT NULL,
  `first_name`     VARCHAR(60),
  `last_name`      VARCHAR(60),
  `address`        VARCHAR(255),
  `profile_photo`  VARCHAR(255),
  `profile_header` VARCHAR(255),
  `birthday`       DATE,
  `is_enabled`     BOOLEAN DEFAULT FALSE,
  `created_at`     TIMESTAMP    NOT NULL,
  `last_update`    TIMESTAMP    NULL,
  PRIMARY KEY (`id`)
);

--
-- Create table temporary token
--
CREATE TABLE IF NOT EXISTS `temporary_token` (
  `id`             BIGINT       NOT NULL AUTO_INCREMENT,
  `user_id`        BIGINT       NOT NULL,
  `token`          VARCHAR(255) NOT NULL,
  `expiry_date`    TIMESTAMP    NOT NULL,
  `created_at`     TIMESTAMP    NOT NULL,
  `last_update`    TIMESTAMP    NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `temporary_token` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

--
-- Create table user to user many to many self join
--
CREATE TABLE IF NOT EXISTS `user_rel` (
  `following_id` BIGINT NOT NULL ,
  `follower_id` BIGINT NOT NULL ,
  PRIMARY KEY (`following_id`, `follower_id`) ,
  --INDEX `fk_person_has_person_person1_idx` (`following_id` ASC) ,
  --INDEX `fk_person_has_person_person_idx` (`follower_id` ASC) ,
  CONSTRAINT `fk_person_has_person_person`
  FOREIGN KEY (`follower_id`)
  REFERENCES `user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT `fk_person_has_person_person1`
  FOREIGN KEY (`following_id`)
  REFERENCES `user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
);

--
-- Create table post
--
CREATE TABLE IF NOT EXISTS `post` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `content`     VARCHAR(280) NOT NULL,
  `img_url`     VARCHAR(280),
  `img_key`     VARCHAR(280),
  `parent_id`   BIGINT,
  `created_at`  TIMESTAMP    NOT NULL,
  `last_update` TIMESTAMP    NULL,
  `user_id`     BIGINT       NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES `post` (`id`)
);

--
-- Create table comment
--
CREATE TABLE IF NOT EXISTS `comment` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `content`     VARCHAR(255) NOT NULL,
  `user_id`     BIGINT       NOT NULL,
  `post_id`     BIGINT       NOT NULL,
  `created_at`  TIMESTAMP    NOT NULL,
  `last_update` TIMESTAMP    NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
);

--
-- Create table dialog
--
CREATE TABLE IF NOT EXISTS `dialog` (
  `id`          BIGINT    NOT NULL AUTO_INCREMENT,
  `created_at`  TIMESTAMP NOT NULL,
  `last_update` TIMESTAMP NULL,
  PRIMARY KEY (`id`)
);

--
-- Create table message
--
CREATE TABLE IF NOT EXISTS `message` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT,
  `content`     VARCHAR(255) NOT NULL,
  `dialog_id`   BIGINT       NOT NULL,
  `user_id`     BIGINT       NOT NULL,
  `created_at`  TIMESTAMP    NOT NULL,
  `last_update` TIMESTAMP    NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`dialog_id`) REFERENCES `dialog` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Create join table favorites
--
CREATE TABLE IF NOT EXISTS `favorites` (
  `user_id` BIGINT NOT NULL,
  `post_id` BIGINT NOT NULL,
  PRIMARY KEY(`user_id`, `post_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
);

--
-- Create join table user_dialog
--
CREATE TABLE IF NOT EXISTS `user_dialog` (
  `user_id`   BIGINT NOT NULL,
  `dialog_id` BIGINT NOT NULL,
  PRIMARY KEY(`user_id`, `dialog_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`dialog_id`) REFERENCES `dialog` (`id`)
);
--
-- Create table notification
--
CREATE TABLE IF NOT EXISTS `notification` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `is_checked` BOOLEAN DEFAULT FALSE,
  `type` VARCHAR(255),
  `user_to` BIGINT NOT NULL,
  `user_from` BIGINT NOT NULL,
  `content_id` BIGINT NOT NULL,
  `created_at`  TIMESTAMP    NOT NULL,
  `last_update` TIMESTAMP    NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_to`) REFERENCES `user` (`id`),
  FOREIGN KEY (`user_from`) REFERENCES `user` (`id`)
);