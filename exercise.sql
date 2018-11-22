-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 22, 2018 at 11:33 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exercise`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(65) NOT NULL,
  `surname` varchar(65) NOT NULL,
  `birth_date` varchar(65) NOT NULL,
  `cellphone` varchar(15) NOT NULL,
  `email` varchar(65) NOT NULL,
  `date_captured` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `birth_date`, `cellphone`, `email`, `date_captured`) VALUES
(1, 'Lesego', 'Seritili', '1994-08-31', '0832087080', 'lsg.seritili@gmail.com', '2018-11-22 00:00:00'),
(2, 'Lesego', 'Seritili', '1994-08-31', '0832087080', 'seritili@gmail.com', '2018-11-22 00:00:00'),
(3, 'ladnfaefo', 'ioanreoire', '1900-02-02', '83298439', '83891@fjldf.com', '2018-11-22 00:00:00'),
(4, 'afoijaowijw', 'jaoriejgoei', '1900-05-02', '8329491843', '983919348', '2018-11-22 00:00:00'),
(5, 'ioijojoij', 'oijoijoijoi', '1900-05-17', '9320909412', 'ijfaoifj@oiaejfoie.com', '2018-11-22 00:00:00'),
(6, 'iafjoifjao', 'oiadjfoijfoiew', '1900-05-17', '921384321080', 'aijfiaojf@ioajroierj', '2018-11-22 00:00:00'),
(7, 'lse', 'slslso', '1900-05-17', '79384913748912', 'aiifjioewjwo@gmail.com', '2018-11-22 00:00:00'),
(8, 'iiiojoijoi', 'dtrdtrd', '1915-04-08', '87987898', 'huhihih@jhi.com', '2018-11-22 00:00:00'),
(9, 'afjeoifjwaoi', 'oiajoiewji', '1999-07-18', '4567890', 'iafjoi@aisfj.com', '2018-11-22 00:00:00'),
(10, 'agoijraeoij', 'akrkrk', '2000-03-14', '67890', 'aosifjoasid@fogo.com', '2018-11-22 00:00:00'),
(11, 'aigjraepw', 'oparejpoer', '2001-04-16', '837837', '8012840@mff.com', '2018-11-22 02:53:40'),
(12, 'aogopgpoi', 'opakporkrep', '1990-05-07', '67890', 'lsgaaoiiao@ofdo.co.za', '2018-11-22 03:48:33'),
(13, 'iogjeorwijiow', 'oiwjeoirj', '1973-10-22', '840912810938', 'hfiwheifuehwi@kfoc.co', '2018-11-22 14:33:12'),
(14, 'oafjoijeoaw', 'ojaojfwoe', '1989-06-23', '82812899832', '889489489@gmail.com', '2018-11-22 23:59:16'),
(15, 'Lspso', 'ddig', '1989-06-23', '02092949', 'eieie@gmail.com', '2018-11-22 23:59:42'),
(16, 'jdojfdao', 'iareojreo', '1992-06-23', '8449789', 'pspfof@goog.co', '2018-11-23 00:00:09'),
(17, 'peter', 'pan', '1992-06-23', '6789090', 'jaoejio@aioeie.com', '2018-11-23 00:00:40'),
(18, 'Bruce', 'Wayne', '1981-09-15', '8393920203', 'bruce@yahoo.com', '2018-11-23 00:02:09'),
(19, 'Tony ', 'Stark', '1982-12-10', '7784789898', 'ironman@gmail.com', '2018-11-23 00:02:45'),
(20, 'Hello', 'World', '1914-08-15', '7878767834', 'hello@gmail.com', '2018-11-23 00:14:55'),
(21, 'Ijfoijow', 'Iajorjeo', '1998-10-18', '02909398595', 'lasjgroir@gmail.com', '2018-11-23 00:18:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
