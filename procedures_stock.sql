
DROP PROCEDURE IF EXISTS `createCar`;
DROP PROCEDURE IF EXISTS `createUserWithCar`;
DROP PROCEDURE IF EXISTS `deleteUser`;
DROP FUNCTION IF EXISTS `getRateByDriver`;
-- ---------------------------------- --

-- Creating user and/or his car --
DELIMITER |
CREATE PROCEDURE createUserWithCar(
	_firstName VARCHAR(255),
	_lastName VARCHAR(255),
	_username VARCHAR(255),
	_email VARCHAR(255),
	_password VARCHAR(255),
	_address VARCHAR(255),
	_city VARCHAR(255),
	_cp VARCHAR(255),
	_phone VARCHAR(255),
	_is_driver BOOLEAN,

	_licencePlate VARCHAR(255),
	_make VARCHAR(255),
	_model VARCHAR(255),
	_capacity INTEGER
)
BEGIN

    DECLARE lastCar INT;

	IF ( _licencePlate != NULL OR _licencePlate != '' ) THEN

	    INSERT INTO cars (licencePlate, make, model, capacity, createdAt, updatedAt)
	    VALUES(_licencePlate, _make, _model, _capacity, SYSDATE(), SYSDATE());

	END IF;

	SET lastCar := (SELECT id_car FROM cars WHERE licencePlate = _licencePlate);

	IF ( lastCar != NULL OR lastCar != '' ) THEN

    	    INSERT INTO users
    	            (firstName, lastName, username, email, password, address, city, cp, phone, privilege, is_driver, id_car, revoked, createdAt, updatedAt)
    	    VALUES  (_firstName, _lastName, _username, _email, _password, _address, _city, _cp, _phone, 1,_is_driver, lastCar, false, SYSDATE(), SYSDATE());
            
    	ELSE
		INSERT INTO users
    	           	(firstName, lastName, username, email, password, address, city, cp, phone, privilege, is_driver, revoked, createdAt, updatedAt)
    	    	VALUES  (_firstName, _lastName, _username, _email, _password, _address, _city, _cp, _phone, 1,_is_driver, false, SYSDATE(), SYSDATE());

    	END IF;


END|
-- ---------------------------------- --

-- Creating car --
DELIMITER |
CREATE PROCEDURE createCar(
	_id_user INTEGER,

	_licencePlate VARCHAR(255),
	_make VARCHAR(255),
	_model VARCHAR(255),
	_capacity INTEGER
)
BEGIN
    	DECLARE lastCar INT;

    	INSERT INTO cars (licencePlate, make, model, capacity, createdAt, updatedAt)
   	VALUES(_licencePlate, _make, _model, _capacity, SYSDATE(), SYSDATE());
	
	SET lastCar := (SELECT id_car FROM cars WHERE licencePlate = _licencePlate);

	IF ( lastCar != NULL OR lastCar != '' ) THEN
    	    UPDATE users SET id_car = lastCar, is_driver = true, updatedAt = SYSDATE() WHERE id_user = _id_user;   
    	END IF;
END|
-- ---------------------------------- --

-- Delete user --
DELIMITER |
CREATE PROCEDURE deleteUser(_id_user INTEGER)
BEGIN
    	DECLARE _id_car INT;

	SET _id_car := (SELECT id_car FROM users WHERE id_user = _id_user);

	DELETE FROM cars WHERE id_car = _id_car;
	DELETE FROM users WHERE id_user = _id_user;
END|


-- ---------------------------------- --

-- Get rate by id_driver --
DELIMITER |
CREATE FUNCTION getRateByDriver(_id_user INTEGER) RETURNS FLOAT 
READS SQL DATA
BEGIN
	DECLARE result float;

    	SET result := (
            SELECT AVG(rate) 
            FROM inscriptionjourneys ij, journeys j
            WHERE j.id_journey = ij.id_trajet
            AND rate > 0
            AND j.id_driver = _id_user
        );
	
	RETURN result;
END|
