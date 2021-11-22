-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2021 at 05:07 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

USE unichat;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `factcheck`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment_user` int(11) NOT NULL,
  `comment_post` int(11) NOT NULL,
  `comment_text` varchar(256) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_user`, `comment_post`, `comment_text`, `date_created`) VALUES
(5, 2, 14, 'any guesses??', '2021-05-07 23:28:11'),
(6, 2, 14, 'Lmaoo', '2021-05-08 11:25:10');

-- --------------------------------------------------------

--
-- Table structure for table `communities`
--

CREATE TABLE `communities` (
  `community_id` int(11) NOT NULL,
  `community_name` varchar(128) NOT NULL,
  `community_date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `community_description` varchar(256) NOT NULL,
  `community_creator` int(11) NOT NULL,
  `community_num_posts` int(11) NOT NULL DEFAULT 0,
  `community_num_followers` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `communities`
--

INSERT INTO `communities` (`community_id`, `community_name`, `community_date_created`, `community_description`, `community_creator`, `community_num_posts`, `community_num_followers`) VALUES
(6, 'Math', '2021-04-26 23:42:39', 'A place to post Math Questions', 2, 0, 0),
(7, 'Computer Science', '2021-04-26 23:44:01', 'Ask Questions about CS', 2, 0, 1),
(8, 'Physics', '2021-04-26 23:51:32', 'A place for asking physics questions', 18, 4, 0),
(9, 'Music', '2021-04-26 23:54:44', 'A place to ask music related questions', 19, 0, 0),
(10, 'Art', '2021-04-30 12:55:27', 'A place to post art related questions', 1, 2, 6),
(11, 'English', '2021-04-30 13:05:25', 'A place to ask english related questions', 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `followings`
--

CREATE TABLE `followings` (
  `following_id` int(11) NOT NULL,
  `following_user` int(11) NOT NULL,
  `following_community` int(11) NOT NULL,
  `following_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followings`
--

INSERT INTO `followings` (`following_id`, `following_user`, `following_community`, `following_date`) VALUES
(17, 2, 10, '2021-05-08 18:20:00'),
(18, 1, 10, '2021-05-08 18:35:32'),
(19, 18, 10, '2021-05-08 18:36:54'),
(20, 19, 10, '2021-05-08 18:37:28'),
(21, 20, 10, '2021-05-08 18:38:48'),
(22, 21, 10, '2021-05-08 18:39:34');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `like_post` int(11) NOT NULL,
  `like_user` int(11) NOT NULL,
  `like_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_creator` int(11) NOT NULL,
  `post_community` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `post_title` varchar(256) NOT NULL,
  `post_details` varchar(400) NOT NULL,
  `post_topic` varchar(256) DEFAULT NULL,
  `post_likes` int(11) NOT NULL DEFAULT 0,
  `post_dislikes` int(11) NOT NULL DEFAULT 0,
  `post_comments` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_creator`, `post_community`, `date_created`, `post_title`, `post_details`, `post_topic`, `post_likes`, `post_dislikes`, `post_comments`) VALUES
(14, 2, 8, '2021-05-07 23:27:38', 'momentum', 'What is momentum in physics?', 'newtonian mechanics', 0, 0, 2),
(15, 2, 8, '2021-05-08 12:37:34', 'Who is newton', 'My professor keeps talking about this dude named newton, who is he???', '', 0, 0, 0),
(16, 2, 8, '2021-05-08 16:06:12', 'gravitational constant', 'what is it?', '', 0, 0, 0),
(17, 2, 8, '2021-05-08 16:12:12', 'what is antimatter', 'What is it?', '', 0, 0, 0),
(18, 2, 10, '2021-05-08 18:33:38', 'where is the louvre', 'where is the famous museum that houses some of the most amazing pieces of art?', '', 0, 1, 0),
(19, 2, 10, '2021-05-08 19:42:34', 'who is banksy', 'I heard there was a really cool graffiti artist named banksy. Any interesting things about him?', 'Graffiti', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(256) DEFAULT NULL,
  `user_tag` int(4) NOT NULL,
  `user_email` varchar(256) DEFAULT NULL,
  `user_password` varchar(256) DEFAULT NULL,
  `user_attempts` int(11) DEFAULT 0,
  `recov_question` varchar(256) DEFAULT NULL,
  `recov_answer` varchar(256) DEFAULT NULL,
  `user_img` int(1) DEFAULT 0,
  `user_active` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_tag`, `user_email`, `user_password`, `user_attempts`, `recov_question`, `recov_answer`, `user_img`, `user_active`) VALUES
(1, 'john', 1111, 'lol@gmail.com', 'password', 1, 'what', 'nothing', 0, 1),
(2, 'rey', 1112, 'oof@gmail.com', 'password', 0, 'What was the house number and street name you lived in as a child?', 'oof', 0, 1),
(18, 'kevin', 1113, 'kevin@gmail.com', 'kevin1234', 0, 'What was the house number and street name you lived in as a child?', 'none', 0, 1),
(19, 'Albert', 1114, 'albert@gmail.com', 'albert1234', 0, 'What was the house number and street name you lived in as a child?', 'none', 0, 1),
(20, 'david', 1115, 'david@gmail.com', 'david1234', 0, 'What was the house number and street name you lived in as a child?', 'none', 0, 1),
(21, 'james', 1116, 'james@gmail.com', 'james@1234', 0, 'What was the house number and street name you lived in as a child?', 'none', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`community_id`);

--
-- Indexes for table `followings`
--
ALTER TABLE `followings`
  ADD PRIMARY KEY (`following_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `community_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `followings`
--
ALTER TABLE `followings`
  MODIFY `following_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

CREATE TABLE user_friends (
	`friend_id` int(11) NOT NULL AUTO_INCREMENT,
	`user_id` int(11) NOT NULL,
    `acceptee_id` int(11) NOT NULL,
    `date_friended` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`friend_id`)
);

CREATE TABLE `groups` (
	`group_id` int(11) NOT NULL AUTO_iNCREMENT,
    `group_creator` int(11) NOT NULL,
    `group_name` varchar(256) NOT NULL,
	`date_created` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`group_id`)
);

CREATE TABLE `group_members`(
	`member_id` int(11) NOT NULL AUTO_INCREMENT,
    `group_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
	`date_joined` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY(`member_id`)
);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
