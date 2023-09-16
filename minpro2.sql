CREATE SCHEMA `minpro2`;

use minpro2;

CREATE TABLE `minpro2`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account_type` ENUM('user','event_organizer'),
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` CHAR(64) NULL,
  PRIMARY KEY (`id`));

-- change the type of password to CHAR
ALTER TABLE `minpro2`.`users`
CHANGE COLUMN `password` `password` CHAR(64) NULL;

-- adding users to the table
INSERT INTO `minpro2`.`users` (
`account_type`,
`first_name`,
`last_name`,
`username`, 
`email`, 
`password`) 
VALUES (
'user',
'Bread',
'Pit',
'BreadPit',
'breadpit@mail.com',
'breadbradpit123'
);
INSERT INTO `minpro2`.`users` (
`account_type`,
`first_name`,
`last_name`,
`username`, 
`email`, 
`password`) 
VALUES (
'user',
'Fauza',
'Rizky',
'FRizky',
'fauzariz@mail.com',
'fauzar123'
);

INSERT INTO `minpro2`.`users` (
`account_type`,
`first_name`,
`last_name`,
`username`, 
`email`, 
`password`) 
VALUES (
'user',
'Anida',
'Bajumi',
'anidabbajumi',
'anidaaaa@mail.com',
'aniiiiida!123'
);

-- delete existing table
DROP TABLE users;

-- deleting duplicate users
DELETE FROM `minpro2`.`users` WHERE (`id` = '3');

-- view the table
SELECT * FROM minpro2.users;


-- code yg diatas jangan diganti2 yak
-- mulai code yg punya lo di bawah line ini ajaa