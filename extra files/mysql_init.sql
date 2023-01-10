CREATE TABLE `Potholes` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`city` varchar(255) NOT NULL,
	`report_count` INT NOT NULL,
	`status` varchar(255) NOT NULL,
	`approx_latitude` varchar(255) NOT NULL,
	`approx_longitude` varchar(255) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `Reports` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`potholeID` INT NOT NULL AUTO_INCREMENT,
	`userID` INT NOT NULL AUTO_INCREMENT,
	`timestamp` TIMESTAMP NOT NULL,
	`latitude` varchar(255) NOT NULL,
	`longitude` varchar(255) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `Users` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`user_agent` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`reliability` INT NOT NULL,
	`last_report` TIMESTAMP NOT NULL,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Reports` ADD CONSTRAINT `Reports_fk0` FOREIGN KEY (`potholeID`) REFERENCES `Potholes`(`ID`);

ALTER TABLE `Reports` ADD CONSTRAINT `Reports_fk1` FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);




