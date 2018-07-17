CREATE TABLE users
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    login varchar(50) NOT NULL,
    `e-mail` varchar(50) NOT NULL,
    `registration-date` TIMESTAMP NOT NULL,
    password varchar(50) NOT NULL,
    gender char(6) ,
    check(gender in ('Male', 'Female'))
);
CREATE UNIQUE INDEX users1_id_uindex ON users1 (id);
CREATE UNIQUE INDEX users1_login_uindex ON users1 (login);
CREATE UNIQUE INDEX `users1_e-mail_uindex` ON users1 (`e-mail`)
