-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 25 Mars 2018 à 21:38
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
(1, '88-11-22-33', 'Ferrari', 'Enzo', 3, '2018-03-08 19:43:04', '2018-03-18 16:15:52'),
(6, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-11 13:43:48', '2018-03-11 13:43:48'),
(7, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-18 15:59:03', '2018-03-18 15:59:03'),
(8, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-18 16:09:38', '2018-03-18 16:09:38'),
(9, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-18 16:11:00', '2018-03-18 16:11:00'),
(10, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-18 16:15:00', '2018-03-18 16:15:00'),
(11, '99-11-22-33', 'Bugatti', 'Veron', 3, '2018-03-18 16:15:52', '2018-03-18 16:15:52');

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

-- --------------------------------------------------------

--
-- Structure de la table `inscriptionjourneys`
--

CREATE TABLE `inscriptionjourneys` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_trajet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `inscriptionjourneys`
--

INSERT INTO `inscriptionjourneys` (`id`, `createdAt`, `updatedAt`, `id_user`, `id_trajet`) VALUES
(3, '2018-03-20 00:00:00', '2018-03-13 00:00:00', 3, 5),
(4, '2018-03-14 00:00:00', '2018-03-14 00:00:00', 2, 6),
(5, '2018-03-14 00:00:00', '2018-03-14 00:00:00', 3, 6);

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
(5, 'Nice', 'Antibes', 2, '2018-03-13 00:00:00', '2018-03-13 00:00:00', '2018-03-11 00:00:00', 3),
(6, 'Villeneuve-Loubet', 'Cannes', 3, '2018-03-21 12:30:00', '2018-03-14 00:00:00', '2018-03-14 00:00:00', 8),
(7, 'Monaco', 'Nice', 5, '2018-04-05 00:00:00', '2018-03-25 17:40:33', '2018-03-25 17:40:33', 3);

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
(2, 'test', 'test', 'test3', 'test@test.fr', '098f6bcd4621d373cade4e832627b4f6', 'trest', 'ville', '05888', '77777', 1, 1, 0, '2018-03-10 15:49:11', '2018-03-11 13:43:48', 6),
(3, 'Romain', 'Lembo', 'admin', 'admin@admin.fr', '098f6bcd4621d373cade4e832627b4f6', '57, rue', 'Villeneuve-Loubet', '06270', '0645262075', 2, 1, 0, '2018-03-08 17:56:53', '2018-03-24 18:37:14', 1),
(4, 'Prenom', 'Nom', 'test2', 'test@test.fr', '098f6bcd4621d373cade4e832627b4f6', 'rue', 'Ville', '65842', '06554445', 1, 1, 1, '2018-03-08 19:17:32', '2018-03-08 19:43:39', NULL),
(8, 'Prénom', 'Nom', 'revoked', 'revoked', '098f6bcd4621d373cade4e832627b4f6', '70, rue des refusées', 'Ville', '06500', '068879944', 1, 0, 1, '2018-03-10 11:58:05', '2018-03-10 11:59:44', NULL),
(47, 'Tata', 'Tata', 'tata', 'tata@email.fr', '2f6c2404198add983753e94fc24e752f', '100, Champs Elysée', 'Paris', '75000', '0600000001', 1, 0, 0, '2018-03-10 15:55:17', '2018-03-10 15:55:17', NULL),
(48, 'Tata', 'Tata', 'tata1', 'tata@email.fr', '2f6c2404198add983753e94fc24e752f', '100, Champs Elysée', 'Paris', '75000', '0600000001', 1, 0, 0, '2018-03-10 15:55:17', '2018-03-10 15:55:17', NULL),
(49, 'yo', 'yo', 'yo', 'yo', '098f6bcd4621d373cade4e832627b4f6', 'yo', 'yo', '88774', 'yo', 1, 0, 0, '2018-03-12 19:19:08', '2018-03-12 19:19:08', NULL),
(50, 'super', 'super', 'super', 'super', '098f6bcd4621d373cade4e832627b4f6', 'super', 'super', 'super', 'super', 2, 0, 0, '2018-03-14 22:25:59', '2018-03-17 12:25:34', NULL),
(51, 'test66', 'test66', 'test66', 'test66', '098f6bcd4621d373cade4e832627b4f6', 'test66', 'test66', 'test6', 'test66', 1, 0, 1, '2018-03-17 12:17:01', '2018-03-17 12:25:28', NULL);

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
  MODIFY `id_car` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `inscriptionjourneys`
--
ALTER TABLE `inscriptionjourneys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `journeys`
--
ALTER TABLE `journeys`
  MODIFY `id_journey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
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
  ADD CONSTRAINT `inscriptionjourneys_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inscriptionjourneys_ibfk_2` FOREIGN KEY (`id_trajet`) REFERENCES `journeys` (`id_journey`) ON DELETE SET NULL ON UPDATE CASCADE;

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
