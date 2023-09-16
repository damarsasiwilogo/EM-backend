CREATE SCHEMA `minpro2`;

CREATE TABLE `minpro2`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` CHAR(64) NULL,
  PRIMARY KEY (`id`));

-- change the type of password to CHAR
ALTER TABLE `minpro2`.`users`
CHANGE COLUMN `password` `password` CHAR(64) NULL;


use minpro2;
SELECT * FROM minpro2.users;