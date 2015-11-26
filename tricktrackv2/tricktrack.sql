-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 24, 2015 at 02:42 
-- Server version: 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tricktrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `_id` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `id_issue` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `_id` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `text` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `id_issue` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `reporter` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `status` varchar(25) NOT NULL,
  `assigned_to` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `comment` int(5) DEFAULT NULL,
  `attachment` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`_id`, `title`, `description`, `reporter`, `priority`, `status`, `assigned_to`, `category`, `comment`, `attachment`) VALUES
('1', 'asdwer', 'asdferer', 'testreporter', 'medium', 'todo', 'names will go here', 'category2', 0, 0),
('111', 'asd', 'asdf', 'testreporter', 'medium', 'todo', 'names will go here', 'category2', 0, 0),
('T-1', 'Test Title', 'TestDescription', '1', 'urgent', 'todo', '1', 'bug', 0, 0),
('TT-4', 'asdwer', 'asdferer', 'testreporter', 'medium', 'todo', 'names will go here', 'category2', 0, 0),
('TT-5', 'asdwer', 'asdferer', 'testreporter', 'medium', 'todo', 'names will go here', 'category2', 0, 0),
('TT-6', 'qqqq', 'qqqqqq', 'hash@mail.de', 'high', 'todo', 'names will go here', 'category1', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `_id` varchar(80) NOT NULL,
  `username` varchar(80) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`_id`, `username`, `firstname`, `lastname`, `email`, `password`) VALUES
('2', 'hash3', 'hash34', 'hash34', 'hash3@mail.de', '76d80224611fc919a5d54f0ff9fba446'),
('test', 'test', 'test', 'test', 'test@mail.de', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `_id` (`_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `_id` (`_id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `_id` (`_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `_id` (`_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
