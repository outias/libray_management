-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 16, 2023 at 09:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(64) DEFAULT NULL,
  `author` varchar(32) DEFAULT NULL,
  `price` int(20) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `archive` int(20) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `price`, `description`, `archive`) VALUES
(1, 'The Adventures of Duck and Goose', 'Sir Quackalot', 11, '', 1),
(2, 'The Return of Duck and Goose', 'Sir Quackalot', 12, '', 0),
(3, 'More Fun with Duck and Goose', 'Sir Quackalot', 13, '', 0),
(4, 'Duck and Goose on Holiday', 'Sir Quackalot', 12, '', 0),
(5, 'The Return of Duck and Goose', 'Sir Quackalot', 20, '', 0),
(6, 'The Adventures of Duck and Goose', 'Sir Quackalot', 19, '', 0),
(7, 'My Friend is a Duck', 'A. Parrot', 15, '', 0),
(8, 'Annotated Notes on the ‘Duck and Goose’ chronicles', 'Prof Macaw', 9000, 'yes', 1),
(9, '‘Duck and Goose’ Cheat Sheet for Students', 'Polly Parrot', 6, '', 0),
(10, '‘Duck and Goose’: an allegory for modern times?', 'Bor Ing', 60, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `company_id` int(20) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `last_name` varchar(123) NOT NULL,
  `dob` varchar(200) NOT NULL,
  `country_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `district_id` int(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `id_type` varchar(120) NOT NULL,
  `id_number` varchar(120) NOT NULL,
  `archive` int(11) NOT NULL DEFAULT 0,
  `created_by` int(12) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attachment` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='table containing all the user Information';

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `company_id`, `first_name`, `gender`, `phone`, `email`, `last_name`, `dob`, `country_id`, `region_id`, `district_id`, `address`, `id_type`, `id_number`, `archive`, `created_by`, `created_on`, `attachment`) VALUES
(1, 1, 'SUDAN', 'Male', '+255623544601', 'emanuelshao20@gmail.com', 'yoyo', '2023-02-01', 1, 1, 0, 'Dar es salaam', '', '', 0, 1, '2023-02-01 05:57:10', 'uploads/candidate/download.png'),
(2, 1, 'fddfdf', 'Male', 'dfd', '', 'dfdf', '2023-01-31', 1, 1, 0, '', '', '', 1, 1, '2023-02-08 13:30:14', 'uploads/candidate/hair.png'),
(3, 1, 'fff', 'Male', 'fff', 'fff', 'ff', '2023-02-03', 1, 1, 0, 'fff', '', '', 1, 1, '2023-02-08 13:30:18', ''),
(4, 1, 'JUMA', 'Male', '+255623544601', '123@demo.com', 'Shao', '2023-02-03', 1, 1, 0, 'Dar es salaam', '', '', 0, 1, '2023-02-03 15:06:00', ''),
(5, 1, 'SALIM', 'Female', '+255623544601', 'emanuelshao20@gmail.com', 'EMMANUEL', '2023-02-03', 1, 3, 0, '31024', '', '', 0, 1, '2023-02-03 15:08:12', ''),
(6, 1, 'aaaa', 'Female', 'aa', 'aa', 'aaa', '2023-02-03', 1, 4, 0, 'aa', '', '', 1, 1, '2023-02-08 13:30:09', ''),
(7, 2, 'GGG', 'Male', 'GGG', '', 'GGG', '2023-02-16', 1, 5, 0, '', '', '', 0, 1, '2023-02-11 03:19:07', ''),
(8, 2, 'AAA', 'Male', 'AAA', 'superadmin@demo.com', 'AAAA', '2023-02-15', 1, 1, 0, 'address', '', '', 0, 1, '2023-02-11 13:23:07', ''),
(9, 2, 'ZZZZ', 'Male', 'ZZZ', '', 'ZZZ', '2023-02-08', 2, 1, 0, '', '', '', 0, 1, '2023-02-11 03:28:12', ''),
(10, 3, 'Juma', 'Male', '+255 718 178 1970', '', 'EMMANUEL', '2023-02-15', 1, 2, 0, '', '', '', 0, 1, '2023-02-11 11:53:40', ''),
(11, 3, 'hhh', 'Male', 'nn', '', '  nn', '2023-02-09', 1, 2, 0, '', '', '', 0, 1, '2023-02-11 12:04:28', ''),
(12, 3, 'bbb', 'Male', '+255 718 178 1970', '', 'bbb', '2023-02-11', 2, 2, 0, '', '', '', 0, 1, '2023-02-11 12:14:08', ''),
(13, 3, 'ccc ddd', 'Male', 'ccddd', '', 'ccdddd', '2023-02-07', 2, 2, 0, '', '', '', 0, 1, '2023-02-11 12:18:32', '');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `book_id` int(20) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `book_id`, `comment`, `created_on`, `archive`) VALUES
(1, 29, 1, 'dsjfjsdj', '2023-02-15 16:24:07', 0),
(2, 29, 1, 'that is liar', '2023-02-15 16:53:58', 0),
(3, 39, 1, 'juma', '2023-02-15 16:54:38', 0),
(4, 39, 1, 'noooooooooooooooooooooooooooooooooooooooooooooo', '2023-02-15 17:01:22', 0),
(5, 39, 1, 'hellow', '2023-02-15 22:59:01', 0),
(6, 39, 1, 'dsgf', '2023-02-15 22:59:28', 0),
(7, 39, 1, 'mnnnmnm', '2023-02-15 23:00:15', 0),
(8, 39, 8, 'bdgfggb', '2023-02-15 23:07:38', 0),
(9, 39, 8, 'kkk', '2023-02-15 23:07:43', 0),
(10, 39, 8, 'yes', '2023-02-15 23:07:57', 0),
(11, 29, 8, 'NHHH', '2023-02-15 23:38:03', 0),
(12, 39, 3, 'jhhgjhhjg', '2023-02-15 23:48:41', 0),
(13, 39, 4, 'this book is nice', '2023-02-15 23:49:48', 0),
(14, 42, 10, 'only this', '2023-02-16 07:35:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `country_id` int(20) NOT NULL,
  `fax` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `created_by` int(20) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `country_id`, `fax`, `phone`, `email`, `address`, `created_by`, `updated_on`, `archive`) VALUES
(1, 'Mwema Advocate ', 1, 'fax', '+255 718 178 1970', 'superadmin@demo.com', 'Address', 1, '2023-02-11 11:15:16', 0),
(2, 'ABC Co ltd', 1, 'fax', '+255623544601', 'Email@gmail.com', 'Address', 1, '2023-02-11 11:14:16', 0),
(3, 'zzzz', 1, 'fax', '222', 'emanuelshao20@gmail.com', 'addreds', 1, '2023-02-11 11:15:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `updated_on`, `archive`) VALUES
(1, 'Tanzania', '2023-01-27 12:47:53', 0),
(2, 'Kenya', '2023-01-27 12:47:53', 0),
(3, 'Uganda', '2023-01-27 12:48:12', 0),
(4, 'DRC Congo', '2023-01-27 12:48:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id` int(20) NOT NULL,
  `region_id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `region_id`, `name`, `updated_on`, `archive`) VALUES
(1, 1, 'KINONDONI', '2023-02-11 03:18:08', 0),
(2, 1, 'UBUNGO', '2023-02-11 03:18:08', 0);

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `book_id` int(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `like`
--

CREATE TABLE `like` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `book_id` int(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `id` int(20) NOT NULL,
  `country_id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id`, `country_id`, `name`, `updated_on`, `archive`) VALUES
(1, 1, 'Mbeya', '2023-01-31 02:11:58', 0),
(2, 1, 'Dar es Salaam', '2023-01-31 02:11:58', 0),
(3, 1, 'Morogoro', '2023-01-31 02:12:35', 0),
(4, 1, 'arusha', '2023-01-31 02:12:35', 0),
(5, 1, 'Tanga', '2023-01-31 02:13:43', 0),
(6, 1, 'Kilimanjaro', '2023-01-31 02:13:43', 0),
(7, 1, 'Dodoma', '2023-01-31 02:13:43', 0),
(8, 1, 'Tabora', '2023-01-31 02:13:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `updated_on`, `archive`) VALUES
(1, 'Admin', '2023-02-15 12:38:12', 0),
(2, 'User', '2023-02-15 12:38:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `system_name` varchar(50) NOT NULL,
  `system_info` varchar(500) NOT NULL,
  `attachment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `system_name`, `system_info`, `attachment`) VALUES
(1, 'LIBRARY MANAGEMENT', 'INFO ZOTE', 'uploads/settings/logo.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `country_id` int(20) NOT NULL,
  `first_name` varchar(120) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `role_id` int(11) DEFAULT 3,
  `last_name` varchar(123) NOT NULL,
  `archive` int(11) NOT NULL DEFAULT 0,
  `password` varchar(60) NOT NULL,
  `last_logout` varchar(120) DEFAULT NULL,
  `mg_password` varchar(300) NOT NULL,
  `created_by` int(12) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attachment` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='table containing all the user Information';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `country_id`, `first_name`, `gender`, `phone`, `email`, `role_id`, `last_name`, `archive`, `password`, `last_logout`, `mg_password`, `created_by`, `created_on`, `attachment`) VALUES
(29, 1, 'Emanuel', 'Male', '+255623544601', 'emanuelshao20@gmail.com', 1, 'Shao0', 1, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-16 07:17:21', ''),
(37, 2, 'Juma', 'Female', 'dsfsd', 'emanuelshao0@gmail.com', 1, 'Ally', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-16 08:01:10', ''),
(38, 2, 'emanuel', 'Male', '+255 718 178 1970', 'emanuelsha0@gmail.com', 1, 'sss', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-15 12:41:01', ''),
(39, 1, 'juma', 'Male', '+3454353', 'juma@gmail.com', 2, 'Shao', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-14 21:02:53', ''),
(40, 1, 'emanuel', 'Male', '+255 718 178 1970', 'emanuelshao@gmail.com', 1, 'shao', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-16 07:09:48', ''),
(41, 1, 'emanuel', 'Male', '+255 718 178 1970', 'emanuelsho@gmail.com', 1, 'shao', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-16 07:12:27', ''),
(42, 1, 'emanuel', 'Male', '+255 718 178 1970', 'emanuel@gmail.com', 1, 'shao', 0, 'Machange200;', NULL, 'ff3488d6c3cd90019060a8d3739bcfc8', 1, '2023-02-16 07:13:30', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `like`
--
ALTER TABLE `like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
