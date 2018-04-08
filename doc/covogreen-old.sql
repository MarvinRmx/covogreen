-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 08 Avril 2018 à 15:47
-- Version du serveur :  10.1.26-MariaDB-0+deb9u1
-- Version de PHP :  7.0.27-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `covogreen`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createCar` (`_id_user` INTEGER, `_licencePlate` VARCHAR(255), `_make` VARCHAR(255), `_model` VARCHAR(255), `_capacity` INTEGER)  BEGIN
    	DECLARE lastCar INT;

    	INSERT INTO cars (licencePlate, make, model, capacity, createdAt, updatedAt)
   	VALUES(_licencePlate, _make, _model, _capacity, SYSDATE(), SYSDATE());
	
	SET lastCar := (SELECT id_car FROM cars WHERE licencePlate = _licencePlate);

	IF ( lastCar != NULL OR lastCar != '' ) THEN
    	    UPDATE users SET id_car = lastCar, is_driver = true, updatedAt = SYSDATE() WHERE id_user = _id_user;   
    	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createUserWithCar` (`_firstName` VARCHAR(255), `_lastName` VARCHAR(255), `_username` VARCHAR(255), `_email` VARCHAR(255), `_password` VARCHAR(255), `_address` VARCHAR(255), `_city` VARCHAR(255), `_cp` VARCHAR(255), `_phone` VARCHAR(255), `_is_driver` BOOLEAN, `_licencePlate` VARCHAR(255), `_make` VARCHAR(255), `_model` VARCHAR(255), `_capacity` INTEGER)  BEGIN

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


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (`_id_user` INTEGER)  BEGIN
    	DECLARE _id_car INT;
	DECLARE _id_journey INT;

	SET _id_car := (SELECT id_car FROM users WHERE id_user = _id_user);
	SET _id_journey := (SELECT id_journey FROM journeys WHERE id_driver = _id_user);

	DELETE FROM cars WHERE id_car = _id_car;
	DELETE FROM inscriptionjourneys WHERE id_trajet = _id_journey;
	DELETE FROM journeys WHERE id_driver = _id_user;
	DELETE FROM users WHERE id_user = _id_user;
END$$

--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `getRateByDriver` (`_id_user` INTEGER) RETURNS FLOAT READS SQL DATA
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
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `id_car` int(11) NOT NULL,
  `licencePlate` varchar(255) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `cars`
--

INSERT INTO `cars` (`id_car`, `licencePlate`, `make`, `model`, `capacity`, `createdAt`, `updatedAt`) VALUES
(1, '88-11-22-33', 'Ferrari', 'Enzo', 3, '2018-03-08 19:43:04', '2018-04-02 12:41:38');

-- --------------------------------------------------------

--
-- Structure de la table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_auteur` int(11) DEFAULT NULL,
  `id_trajet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `chats`
--

INSERT INTO `chats` (`id`, `message`, `createdAt`, `updatedAt`, `id_auteur`, `id_trajet`) VALUES
(1, 'salut', '2018-03-27 15:22:27', '2018-03-27 15:22:27', 3, 5),
(2, 'Ca va ?', '2018-03-27 15:29:52', '2018-03-27 15:29:52', 3, 5),
(3, 'Oui et toi ?', '2018-03-27 15:30:23', '2018-03-27 15:30:23', 3, 5),
(4, 'Super', '2018-03-27 15:30:26', '2018-03-27 15:30:26', 3, 5),
(5, 'Yo', '2018-03-27 15:30:34', '2018-03-27 15:30:34', 3, 8),
(6, 'Ca va ?', '2018-03-27 15:30:36', '2018-03-27 15:30:36', 3, 8),
(7, 'test', '2018-03-27 15:35:49', '2018-03-27 15:35:49', 3, 7),
(8, 'salut', '2018-03-28 09:42:50', '2018-03-28 09:42:50', 2, 6),
(9, 'Oui et toi ?', '2018-04-02 15:05:31', '2018-04-02 15:05:31', 2, 8),
(10, 'Tu fais quoi ?', '2018-04-02 15:07:43', '2018-04-02 15:07:43', 2, 8),
(11, 'Rien et toi ?', '2018-04-02 15:08:32', '2018-04-02 15:08:32', 2, 8),
(12, 'Salut', '2018-04-02 15:10:21', '2018-04-02 15:10:21', 3, 5),
(13, 'test2', '2018-04-02 15:13:44', '2018-04-02 15:13:44', 3, 7),
(14, 'test3', '2018-04-02 15:15:31', '2018-04-02 15:15:31', 3, 7),
(15, 'test4', '2018-04-02 15:17:40', '2018-04-02 15:17:40', 3, 7),
(16, 'Rien aussi', '2018-04-03 14:00:35', '2018-04-03 14:00:35', 3, 8),
(17, 'Test', '2018-04-07 12:02:14', '2018-04-07 12:02:14', 3, 8),
(18, 'Ok', '2018-04-07 12:02:18', '2018-04-07 12:02:18', 3, 8),
(19, 'Yo', '2018-04-07 12:02:25', '2018-04-07 12:02:25', 3, 5),
(20, 'test', '2018-04-07 12:07:19', '2018-04-07 12:07:19', 3, 7),
(21, 'test', '2018-04-07 12:07:36', '2018-04-07 12:07:36', 3, 9),
(22, 'rere', '2018-04-07 12:07:45', '2018-04-07 12:07:45', 3, 9),
(23, 'tetrt', '2018-04-07 12:13:00', '2018-04-07 12:13:00', 3, 7),
(24, 'yr', '2018-04-07 12:17:09', '2018-04-07 12:17:09', 3, 7),
(25, 'tes', '2018-04-07 12:23:44', '2018-04-07 12:23:44', 3, 8),
(26, 'tetete', '2018-04-07 12:30:36', '2018-04-07 12:30:36', 3, 7),
(28, 'salut les copain', '2018-04-07 14:03:01', '2018-04-07 14:03:01', NULL, NULL),
(29, 'ttrt', '2018-04-07 18:14:22', '2018-04-07 18:14:22', 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `inscriptionjourneys`
--

CREATE TABLE `inscriptionjourneys` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_trajet` int(11) DEFAULT NULL,
  `rate` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `inscriptionjourneys`
--

INSERT INTO `inscriptionjourneys` (`id`, `createdAt`, `updatedAt`, `id_user`, `id_trajet`, `rate`, `comment`) VALUES
(3, '2018-03-20 00:00:00', '2018-04-03 14:39:30', 3, 5, 5, 'test'),
(13, '2018-03-28 10:38:11', '2018-03-28 10:38:11', 2, 6, 0, ''),
(14, '2018-04-02 15:05:07', '2018-04-02 15:05:07', 2, 8, 0, ''),
(15, '2018-04-07 09:54:51', '2018-04-07 09:54:51', 3, 6, 0, ''),
(17, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3, 7, 0, ''),
(20, '2018-04-07 13:56:51', '2018-04-07 13:56:51', 3, 10, 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `journeys`
--

CREATE TABLE `journeys` (
  `id_journey` int(11) NOT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `seats_available` int(11) DEFAULT NULL,
  `date_journey` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_driver` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `journeys`
--

INSERT INTO `journeys` (`id_journey`, `origin`, `destination`, `seats_available`, `date_journey`, `createdAt`, `updatedAt`, `id_driver`) VALUES
(5, 'Nice', 'Antibes', 2, '2018-03-13 00:00:00', '2018-03-13 00:00:00', '2018-04-03 16:49:29', 3),
(6, 'Villeneuve-Loubet', 'Cannes', 3, '2018-03-21 12:30:00', '2018-03-14 00:00:00', '2018-04-07 09:54:51', 8),
(7, 'Monaco', 'Nice', 5, '2018-04-05 00:00:00', '2018-03-25 17:40:33', '2018-04-03 14:00:07', 3),
(8, 'Monaco', 'Biot', 5, '2018-08-05 00:00:00', '2018-03-27 14:59:02', '2018-04-07 14:06:25', 3),
(9, 'Cagnes', 'Paris', 8, '2018-04-29 00:00:00', '2018-04-07 09:59:59', '2018-04-07 12:32:52', 3),
(10, 'Bagdad', 'Dubai', 8, '2018-04-22 00:00:00', '2018-04-07 13:56:51', '2018-04-07 13:56:51', 3);

-- --------------------------------------------------------

--
-- Structure de la table `participations`
--

CREATE TABLE `participations` (
  `id_participation` int(11) NOT NULL,
  `note` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_driver` int(11) DEFAULT NULL,
  `id_journey` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `privilege` int(11) DEFAULT NULL,
  `is_driver` tinyint(1) DEFAULT NULL,
  `revoked` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id_user`, `firstName`, `lastName`, `username`, `email`, `password`, `address`, `city`, `cp`, `phone`, `privilege`, `is_driver`, `revoked`, `createdAt`, `updatedAt`, `id_car`) VALUES
(2, 'Prénom', 'Nom', 'test3', 'romanlembo06@gmail.com', '098f6bcd4621d373cade4e832627b4f6', 'trest', 'ville', '05888', '+3369849747', 1, 1, 0, '2018-03-10 15:49:11', '2018-04-03 14:03:02', NULL),
(3, 'Romain', 'Lembo', 'admin', 'romanlembo06@gmail.com', '098f6bcd4621d373cade4e832627b4f6', '57, rue', 'Villeneuve-Loubet', '06270', '+33645262075', 2, 1, 0, '2018-03-08 17:56:53', '2018-04-07 13:41:07', 1),
(4, 'Prenom', 'Nom', 'test2', 'test@test.fr', '098f6bcd4621d373cade4e832627b4f6', 'rue', 'Ville', '65842', '06554445', 1, 1, 1, '2018-03-08 19:17:32', '2018-03-08 19:43:39', NULL),
(8, 'Prénom', 'Nom', 'revoked', 'revoked', '098f6bcd4621d373cade4e832627b4f6', '70, rue des refusées', 'Ville', '06500', '068879944', 1, 0, 1, '2018-03-10 11:58:05', '2018-03-10 11:59:44', NULL),
(47, 'Tata', 'Tata', 'tata', 'tata@email.fr', '2f6c2404198add983753e94fc24e752f', '100, Champs Elysée', 'Paris', '75000', '0600000001', 1, 0, 0, '2018-03-10 15:55:17', '2018-03-10 15:55:17', NULL),
(48, 'Tata', 'Tata', 'tata1', 'tata@email.fr', '2f6c2404198add983753e94fc24e752f', '100, Champs Elysée', 'Paris', '75000', '0600000001', 1, 0, 0, '2018-03-10 15:55:17', '2018-03-10 15:55:17', NULL),
(51, 'test66', 'test66', 'test66', 'test66', '098f6bcd4621d373cade4e832627b4f6', 'test66', 'test66', 'test6', 'test66', 1, 0, 0, '2018-03-17 12:17:01', '2018-04-02 13:33:26', NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id_car`);

--
-- Index pour la table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_auteur` (`id_auteur`),
  ADD KEY `id_trajet` (`id_trajet`);

--
-- Index pour la table `inscriptionjourneys`
--
ALTER TABLE `inscriptionjourneys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_trajet` (`id_trajet`);

--
-- Index pour la table `journeys`
--
ALTER TABLE `journeys`
  ADD PRIMARY KEY (`id_journey`),
  ADD KEY `id_driver` (`id_driver`);

--
-- Index pour la table `participations`
--
ALTER TABLE `participations`
  ADD PRIMARY KEY (`id_participation`),
  ADD KEY `id_driver` (`id_driver`),
  ADD KEY `id_journey` (`id_journey`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_car` (`id_car`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `id_car` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT pour la table `inscriptionjourneys`
--
ALTER TABLE `inscriptionjourneys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT pour la table `journeys`
--
ALTER TABLE `journeys`
  MODIFY `id_journey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT pour la table `participations`
--
ALTER TABLE `participations`
  MODIFY `id_participation` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`id_auteur`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`id_trajet`) REFERENCES `journeys` (`id_journey`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `inscriptionjourneys`
--
ALTER TABLE `inscriptionjourneys`
  ADD CONSTRAINT `inscriptionjourneys_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inscriptionjourneys_ibfk_2` FOREIGN KEY (`id_trajet`) REFERENCES `journeys` (`id_journey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `journeys`
--
ALTER TABLE `journeys`
  ADD CONSTRAINT `journeys_ibfk_1` FOREIGN KEY (`id_driver`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `participations`
--
ALTER TABLE `participations`
  ADD CONSTRAINT `participations_ibfk_1` FOREIGN KEY (`id_driver`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_2` FOREIGN KEY (`id_journey`) REFERENCES `journeys` (`id_journey`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `cars` (`id_car`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
