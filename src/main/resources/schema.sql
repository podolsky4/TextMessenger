CREATE TABLE Users (
id int PRIMARY KEY  auto_increment,
    login varchar(50) NOT NULL,
    `e-mail` varchar(50) NOT NULL,
    `registration-date` TIMESTAMP NOT NULL,
    password varchar(50) NOT NULL,
    gender char(6) ,
    check(gender in ('Male', 'Female'))
);
