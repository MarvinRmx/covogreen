
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
    	            (firstName, lastName, username, email, password, address, city, cp, phone, privilege, is_driver, id_car, createdAt, updatedAt)
    	    VALUES  (_firstName, _lastName, _username, _email, _password, _address, _city, _cp, _phone, 1,_is_driver, lastCar, SYSDATE(), SYSDATE());
            
    	ELSE
		INSERT INTO users
    	           	(firstName, lastName, username, email, password, address, city, cp, phone, privilege, is_driver, createdAt, updatedAt)
    	    	VALUES  (_firstName, _lastName, _username, _email, _password, _address, _city, _cp, _phone, 1,_is_driver, SYSDATE(), SYSDATE());

    	END IF;


END|
-- ---------------------------------- --

