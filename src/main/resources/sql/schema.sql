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
  `created_at`     TIMESTAMP    NOT NULL,
  `last_update`    TIMESTAMP    NULL,
  PRIMARY KEY (`id`)
);

--
-- Create table user to user many to many self join
--
CREATE TABLE IF NOT EXISTS `user_rel` (
  `following_id` BIGINT NOT NULL ,
  `follower_id` BIGINT NOT NULL ,
  PRIMARY KEY (`following_id`, `follower_id`) ,
  INDEX `fk_person_has_person_person1_idx` (`following_id` ASC) ,
  INDEX `fk_person_has_person_person_idx` (`follower_id` ASC) ,
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
  `content`     VARCHAR(255) NOT NULL,
  `created_at`  TIMESTAMP    NOT NULL,
  `last_update` TIMESTAMP    NULL,
  `user_id`     BIGINT       NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
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
  `id`          BIGINT       NOT NULL,
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