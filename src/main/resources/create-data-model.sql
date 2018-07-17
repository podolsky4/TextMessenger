CREATE TABLE users
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    login varchar(50) NOT NULL,
    `e-mail` VARCHAR(50) NOT NULL,
    `registration-date` timestamp NOT NULL,
    password varchar(50) NOT NULL,
    gender int
);
CREATE UNIQUE INDEX users_id_uindex ON users (id);
CREATE UNIQUE INDEX users_login_uindex ON users (login);
CREATE UNIQUE INDEX `users_e-mail_uindex` ON users (`e-mail`);
CREATE UNIQUE INDEX `users_registration-date_uindex` ON users (`registration-date`);
