require("dotenv").config();

const db = require("./connection");

async function deleteOldTables(){
    const get_tables = 'SHOW tables;';

    const remove_foreign_keys = 'SET FOREIGN_KEY_CHECKS=0;';
    const delete_old_tables = 'DROP TABLE ??;'

    await db.query(remove_foreign_keys);

    const [rows]= await db.query(get_tables);

    for(i = 0; i < rows.length; i++){
        const table = rows[i]["Tables_in_" + process.env.SQL_DB];
        await db.query(delete_old_tables, table);
        console.log("Deleted Table: " + table);
    }
}

async function createNewTables(){
    const pothole_sql = "CREATE TABLE `Potholes` ("+
        "`ID` INT NOT NULL AUTO_INCREMENT,"+
        " `city` varchar(255) NOT NULL,"+
        " `zipcode` varchar(255) NOT NULL,"+
        " `report_count` INT NOT NULL,"+
        " `status` varchar(255) NOT NULL,"+
        " `approx_latitude` varchar(255) NOT NULL,"+
        " `approx_longitude` varchar(255) NOT NULL,"+
        " PRIMARY KEY (`ID`)"+
        ");";
    var [result] = await db.query(pothole_sql);
    console.log("Created Potholes...");


    const reports_sql = "CREATE TABLE `Reports` ("+
        " `ID` INT NOT NULL AUTO_INCREMENT,"+
        " `potholeID` INT NOT NULL,"+
        " `userID` INT NOT NULL,"+
        " `timestamp` TIMESTAMP NOT NULL,"+
        " `latitude` varchar(255) NOT NULL,"+
        " `longitude` varchar(255) NOT NULL,"+
        "PRIMARY KEY (`ID`)"+
        ");";
    [result] = await db.query(reports_sql);
    console.log("Created Reports...");


    const users_sql = "CREATE TABLE `Users` ("+
	" `ID` INT NOT NULL AUTO_INCREMENT,"+
	" `user_agent` varchar(255) NOT NULL,"+
	" `county` varchar(255) NOT NULL,"+
    " `ip` varchar(255) NOT NULL,"+
	" `reliability` INT NOT NULL,"+
	" `last_report` TIMESTAMP NOT NULL,"+
    " `last_signin` TIMESTAMP NOT NULL,"+
	" PRIMARY KEY (`ID`)"+
    ");";
    [result] = await db.query(users_sql);
    console.log("Created Users...");
    
}

async function alterTables(){
    const foreign_pothole = "ALTER TABLE `Reports` ADD CONSTRAINT `Reports_fk0` FOREIGN KEY (`potholeID`) REFERENCES `Potholes`(`ID`) ON DELETE CASCADE;";
    const foreign_user = "ALTER TABLE `Reports` ADD CONSTRAINT `Reports_fk1` FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);";

    const add_foreign_keys = 'SET FOREIGN_KEY_CHECKS=1;';

    await db.query(foreign_pothole);
    await db.query(foreign_user);
    await db.query(add_foreign_keys);
    console.log("Added foreign keys");
}

async function main(){
    console.log("Deleting old tables from database");
    await deleteOldTables();

    console.log("Creating new Tables");
    await createNewTables();

    console.log("Adding Foreign keys");
    await alterTables();
    //do things with seeding here
    db.end();
}
main();