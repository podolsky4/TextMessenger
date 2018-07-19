--
-- Create table users
--

CREATE TABLE users (
    id int(11) NOT NULL auto_increment,
    login varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    regdate TIMESTAMP NOT NULL,
    password varchar(50) NOT NULL,
    gender varchar(6) ,
    check(gender in ('Male', 'Female')),
    PRIMARY KEY (id)
);
