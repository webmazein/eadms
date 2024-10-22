-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 22, 2024 at 09:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tnd`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `action_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actions`
--

INSERT INTO `actions` (`id`, `action_name`) VALUES
(1, 'action 1'),
(2, 'action 2');

-- --------------------------------------------------------

--
-- Table structure for table `defects`
--

CREATE TABLE `defects` (
  `id` int(11) NOT NULL,
  `defect_name` varchar(200) NOT NULL,
  `defect_name_hi` varchar(200) NOT NULL,
  `station_id` varchar(10) NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `screen_no` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defects`
--

INSERT INTO `defects` (`id`, `defect_name`, `defect_name_hi`, `station_id`, `station_name`, `screen_no`) VALUES
(1, 'Counter Shaft Oil Seal Cut (E/A)', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(2, 'LCC & RCC joint gasket cut', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(3, 'LCC oil seal cut', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(4, 'RCC model wrong fitment', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(5, 'Engine Wrong Model', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(6, 'Gear washer miss', '   ', '1', 'Stage 1 Gear train fitment', '1'),
(7, 'Drive Sprocket Bolt Loose', '   ', '2', 'Stage 2 ( Drive Sproket Ftment, Fixing Bolt)', '1'),
(8, 'Drum bolt loose', '   ', '2', 'Stage 2 ( Drive Sproket Ftment, Fixing Bolt)', '1'),
(9, 'LCC & RCC Joint bolt Loose/U/T', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(10, 'LCC/RCC  joint bolt Thread Free', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(11, 'LCC/RCC joint bolt miss', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(12, 'Drum Seal Miss', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(13, 'Drum seal cut', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(14, 'Drum seal fitment NG', '   ', '3', 'Stage 3 (LCC/RCC Joint, Drum Seal)', '1'),
(15, 'GSS NG', '   ', '4', 'Stage 4 ( GSS/Kick Fitment)', '1'),
(16, 'GSS Oil Seal Cut', '   ', '4', 'Stage 4 ( GSS/Kick Fitment)', '1'),
(17, 'Kick Retainer Point Out', '   ', '4', 'Stage 4 ( GSS/Kick Fitment)', '1'),
(18, 'Kick Returning NG', '   ', '4', 'Stage 4 ( GSS/Kick Fitment)', '1'),
(19, 'Drum pin miss', '   ', '5', 'Stage 5 ( Drum Plate Fitment)', '1'),
(20, 'Drum knock bolt loose', '   ', '5', 'Stage 5 ( Drum Plate Fitment)', '1'),
(21, 'Star plate fitment NG', '   ', '5', 'Stage 5 ( Drum Plate Fitment)', '1'),
(22, 'Drum plate fitment NG', '   ', '5', 'Stage 5 ( Drum Plate Fitment)', '1'),
(23, 'Self Moter Fitment NG', '   ', '6', 'Stage 6 (Motor)', '1'),
(24, 'Self motor \'O\' ring cut', '   ', '6', 'Stage 6 (Motor)', '1'),
(25, 'LCC Moter Hole Thread Free', '   ', '6', 'Stage 6 (Motor)', '1'),
(26, 'Self Motor Bolt Loose', '   ', '6', 'Stage 6 (Motor)', '1'),
(27, 'Clutch cotter fitment reverse/NG', '   ', '7', 'Stage 7 ( Clutch, Seperator Plate)', '1'),
(28, 'Spilne Washer Double', '   ', '7', 'Stage 7 ( Clutch, Seperator Plate)', '1'),
(29, 'Set Ring Fitment NG', '   ', '7', 'Stage 7 ( Clutch, Seperator Plate)', '1'),
(30, 'Drive Shaft Thread damage', '   ', '8', 'Stage 8 (ROF Fitmentt)', '2'),
(31, 'Spring washer miss', '   ', '8', 'Stage 8 (ROF Fitmentt)', '2'),
(32, 'Cylinder block dowell miss', '   ', '8', 'Stage 8 (ROF Fitmentt)', '2'),
(33, 'Clutch Nut Over Torque', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(34, 'Clutch Tight In Drive Shaft', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(35, 'Clutch Lock nut loose', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(36, 'ROF Lock nut loose', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(37, 'Bearing miss', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(38, 'ROF cover gasket miss', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(39, 'ROF cover gasket cut', '   ', '9', 'Stage 9 ( ROF DCNR,Bearing, Gasket )', '2'),
(40, 'ROF Cover Screw Loose/Missing', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(41, 'RCC Cover Gasket Cut', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(42, 'RCC Cover Gasket miss', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(43, 'RCC Cover Oil Seal Cut', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(44, 'RCC Cover Oil Seal Cut / NG', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(45, 'RCC Oil Seal Cut', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(46, 'RCC cover lifter miss', '   ', '10', 'Stage 10 ( ROF Screw, Dowel, RCC Gasket)', '2'),
(47, 'CCR Cover Bolt Thread washed', '   ', '11', 'Stage 11 ( RCC Tightening)', '2'),
(48, 'RCC Cover Bolt Loose/U/T', '   ', '11', 'Stage 11 ( RCC Tightening)', '2'),
(49, 'RCC cover bolt miss', '   ', '11', 'Stage 11 ( RCC Tightening)', '2'),
(50, 'Right Side Cover bolt loose/fitment NG', '   ', '12', 'Stage 11 ( RCC Tightening)', '2'),
(51, 'Cy Block gasket cut', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(52, 'Cy Block gasket cut/Ext Mat.', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(53, 'Cylinder block gasket miss', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(54, 'Cylider Block Rubber Packing Leakage', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(55, 'Cylider Block Rubber Packing miss', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(56, 'Piston Ring miss', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(57, 'Piston ring taper fitment', '   ', '12', 'Stage 12 ( Block Fitment)', '2'),
(58, 'Cy Head Gasket Fitment NG', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(59, 'Guide roller miss', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(60, 'Guide roller pin miss', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(61, 'Guide roller pin washer miss', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(62, 'Cy Head Gasket miss', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(63, 'Cy Head Dowell miss', '   ', '13', 'Stage 13 ( Timing, Guide Roller, Sproket)', '2'),
(64, 'Cy Head Wrong Model  Fitment', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(65, 'Top Cover Fitment NG', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(66, 'Top Cover Gasket Cut', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(67, 'Top cover gasket fitment NG', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(68, 'Cap Nut Washer fitment wrong', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(69, 'Cap Nut Washer Miss', '   ', '14', 'Stage 14 ( Cylinder Head, Top Cover)', '2'),
(70, 'Cap Nut Crack', '   ', '15', 'Stage 15 ( Cap Nut, Guide )', '2'),
(71, 'Cap Nut Fitment NG', '   ', '15', 'Stage 15 ( Cap Nut, Guide )', '2'),
(72, 'Cap Nut Loose', '   ', '15', 'Stage 15 ( Cap Nut, Guide )', '2'),
(73, 'Cap Nut Surface NG', '   ', '15', 'Stage 15 ( Cap Nut, Guide )', '2'),
(74, 'Cap Nut Taper', '   ', '15', 'Stage 15 ( Cap Nut, Guide )', '2'),
(75, 'Allen Bolt Loose', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(76, 'Cam shaft thread damage', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(77, 'H.S. Bolt Thread washed in CCL', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(78, 'HS Bolt Loose/U/T', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(79, 'Knock Bolt Fall In Engine', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(80, 'Timing out', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(81, 'Dowel miss in camshaft', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(82, 'Sealing Bolt Washer Miss', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(83, 'HS Bolt Miss', '   ', '16', 'Stage 16 ( Hex Bolt Tightening, Sealing Bolt)', '3'),
(84, 'Sealing bolt loose/U/T', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(85, 'LCC Oil Bolt Thread free', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(86, 'Netural Swtich \'O\' Ring Cut', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(87, 'Neutral Light Not Show', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(88, 'Neutral Screw Broken', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(89, 'Oil Bolt Loose/U/T', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(90, 'Oil Bolt Miss', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(91, 'Neutral Switch Clamp Loose/Miss', '   ', '17', 'Stage 17 ( Neutral)', '3'),
(92, 'Cam Chain Guide Damage', '   ', '18', 'Stage 18 ( Oil Temp Sensor, Chain Guide)', '3'),
(93, 'Chain Guide Miss Small', '   ', '18', 'Stage 18 ( Oil Temp Sensor, Chain Guide)', '3'),
(94, 'EOT sensor washer miss', '   ', '18', 'Stage 18 ( Oil Temp Sensor, Chain Guide)', '3'),
(95, 'EOT sensor  loose', '   ', '18', 'Stage 18 ( Oil Temp Sensor, Chain Guide)', '3'),
(96, 'EOT sensor wrong model fitment', '   ', '18', 'Stage 18 ( Oil Temp Sensor, Chain Guide)', '3'),
(97, 'Speed sensor O-ring miss', '   ', '19', 'Stage 19 (RPM Sensor) i3s', '3'),
(98, 'Speed sensor bolt loose', '   ', '19', 'Stage 19 (RPM Sensor) i3s', '3'),
(99, 'Speed sensor O-ring cut', '   ', '19', 'Stage 19 (RPM Sensor) i3s', '3'),
(100, 'Knock Bolt Loose', '   ', '20', 'Stage 20 (Spkt start)', '3'),
(101, 'Knock Bolt miss', '   ', '', 'Stage 20 (Spkt start)', '3'),
(102, 'LCC Fixing Plate 6x16 Bolt Free', '   ', '', 'Stage 20 (Spkt start)', '3'),
(103, 'Self Motor Circlip Miss', '   ', '', 'Stage 20 (Spkt start)', '3'),
(104, 'Crank Shaft Left Thread Wash', '   ', '', 'Stage 21 ( Flywhee)', '3'),
(105, 'flywheel nut loose', '   ', '', 'Stage 21 ( Flywhee)', '3'),
(106, 'Chain Guide fitment NG-Big', '   ', '', 'Stage 21 ( Flywhee)', '3'),
(107, 'Chain Guide Miss Big', '   ', '', 'Stage 21 ( Flywhee)', '3'),
(108, 'Cy Head Valve Leakage - Tappet Lock', '   ', '', 'Stage 22 ( Tappet Setting)', '4'),
(109, 'Tappet Loose', '   ', '', 'Stage 22 ( Tappet Setting)', '4'),
(110, 'Tappet open', '   ', '', 'Stage 22 ( Tappet Setting)', '4'),
(111, 'Tappet Nut Damage', '   ', '', 'Stage 22 ( Tappet Setting)', '4'),
(112, 'Tappet nut thread free', '   ', '', 'Stage 22 ( Tappet Setting)', '4'),
(113, 'Cy. Head Left Cover Bolt Loose', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(114, 'Cyl.Guide Roller Hole Thread Free', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(115, 'Cylinder Tensinor Hole Thread Free', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(116, 'Dipstick loose', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(117, 'Guide Pin Roller Loose/U/T/MISS', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(118, 'Hole cap O-ring cut / miss', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(119, 'Tappet Hole Cap Loose/U/T', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(120, 'Tappet Hole Cap \'O\' Ring Miss/ Cut', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(121, 'Guide roller loose', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(122, 'Left Cover Fitment NG', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(123, 'Left Cover gasket Fitment NG', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(124, 'Left Cover gasket miss', '   ', '', 'Stage 23 ( Hole Cap/ L Cover Fitment)', '4'),
(125, 'Neutral wire connection NG', '   ', '', 'Stage 24A(LCC Cover)', '4'),
(126, 'ACG Cover Scratch', '   ', '', 'Stage 24A(LCC Cover)', '4'),
(127, 'ACG Cover Gasket Cut', '   ', '', 'Stage 24A(LCC Cover)', '4'),
(128, 'ACG Cover Gasket miss', '   ', '', 'Stage 24A(LCC Cover)', '4'),
(129, 'ACG Cover Bolt miss', '   ', '', 'Stage 24B(LCC Cover)', '4'),
(130, 'ACG cover bolt clamp wrong fitment', '   ', '', 'Stage 24B(LCC Cover)', '4'),
(131, 'ACG cover clamp miss', '   ', '', 'Stage 24B(LCC Cover)', '4'),
(132, 'ACG cover clamp direction wrong', '   ', '', 'Stage 24B(LCC Cover)', '4'),
(133, 'ACG Cover Bolt Loose', '   ', '', 'Stage 24C(LCC COVER) ', '4'),
(134, 'Oil miss', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(135, 'Oil level less', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(136, 'Oil level excess', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(137, 'Dipstic loose fitment', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(138, 'Dipstic O ring miss', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(139, 'Breather pipe fitment NG', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(140, 'Breather pipe wrong model fitment', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(141, 'Breather pipe circlip miss', '   ', '', 'Stage 26 (OIL FILLING)', '4'),
(142, 'Stopper arm spring fitment NG', '   ', '', 'Sub assy', '5'),
(143, 'KSR Point Out', '   ', '', 'Sub assy', '5'),
(144, 'Dipstick O Ring Double/miss/cut', '   ', '', 'Sub assy', '5'),
(145, 'Hole cap O ring Double/miss/cut', '   ', '', 'Sub assy', '5'),
(146, 'ACG Coil Damage', '   ', '', 'LCC Cover(Clamp Tightening/\r\nGromet Fitment)', '5'),
(147, 'ACG gromet fitment N.G', '   ', '', 'LCC Cover(Clamp Tightening/\r\nGromet Fitment)', '5'),
(148, 'One-way clutch reverse fitment', '   ', '', 'Flywheel(Pre-tightening) ', '5'),
(149, 'Flywheel rooler spring miss', '   ', '', 'Flywheel(Pre-tightening) ', '5'),
(150, 'Flywheel bolt loose', '   ', '', 'Flywheel(Pre-tightening) ', '5'),
(151, 'CCR Bearing Depth NG', '   ', '', 'RCC Brg press', '5'),
(152, 'Drain Bolt Loose', '   ', '', 'RCC Brg press', '5'),
(153, 'RCC Cover Nipple  Leakage', '   ', '', 'RCC Brg press', '5'),
(154, 'RCC Cover Oil Gallery Nipple Missing', '   ', '', 'RCC Brg press', '5'),
(155, 'Oil Pump Wrong Fitment', '   ', '', 'RCC 1', '5'),
(156, 'GSS Pin Loose', '   ', '', 'RCC 1', '5'),
(157, 'LCC/RCC Stud Thread Free', '   ', '', 'RCC 2', '5'),
(158, 'RCC - handling dent at joint face', '   ', '', 'RCC 2', '5'),
(159, 'LCC Dia 52 Oil Seal Cut/Leakage', '   ', '', 'LCC number Punch', '6'),
(160, 'Oil Seal Miss', '   ', '', 'LCC number Punch', '6'),
(161, 'GSS Oil Seal Miss', '   ', '', 'LCC number Punch', '6'),
(162, 'Breather Pipe Fitment NG/Loose', '   ', '', 'LCC 1', '6'),
(163, 'Breather Tube Miss', '   ', '', 'LCC 1', '6'),
(164, 'CCL Cover Bolt Thread washed', '   ', '', 'LCC 1', '6'),
(165, 'Tensionar Rollar Miss', '   ', '', 'LCC 2', '6'),
(166, 'oil stopper plate miss', '   ', '', 'LCC 2', '6'),
(167, 'Oil stopper plate bolt loose', '   ', '', 'LCC 2', '6'),
(168, 'Spark Plug Miss', '   ', '', 'Cyl Head 1', '6'),
(169, 'Cy Head Right Side Cover Bolt Loose/Fitm', '   ', '', 'Cyl Head 2', '6'),
(170, 'Cy Head Right Side Cover Gasket Cut/Doub', '   ', '', 'Cyl Head 2', '6'),
(171, 'Cyl Head Plug Miss', '   ', '', 'Cyl Head 2', '6'),
(172, 'Right Side Cover Gasket Cut', '   ', '', 'Cyl Head 2', '6'),
(173, 'Spark plug Loose/U/T', '   ', '', 'Cyl Head 2', '6'),
(174, 'O2 sensor loose', '   ', '', 'Oxygen Sensor', '6'),
(175, 'O2 sensor miss', '   ', '', 'Oxygen Sensor', '6'),
(176, 'Cy head O2 sensor dia. o/s ', '   ', '', 'Oxygen Sensor', '6'),
(177, 'Cam Shaft Wrong Fitment', '   ', '', 'Cam shaft bearing press', '6'),
(178, 'Double Washer In Oil Bolt', '   ', '', 'GSD', '7'),
(179, 'GSD Clip Missing', '   ', '', 'GSD', '7'),
(180, 'GSD Pin Missing', '   ', '', 'GSD', '7'),
(181, 'GSS (Wrong Model)', '   ', '', 'GSD', '7'),
(182, 'CCL Stud Hole Thread washed', '   ', '', 'Stud Fitment', '7'),
(183, 'CCL Wrong Stud Fitment', '   ', '', 'Stud Fitment', '7'),
(184, 'Dowels Fitment NG.', '   ', '', 'Stud Fitment', '7'),
(185, 'LCC stud loose', '   ', '', 'Stud Fitment', '7');

-- --------------------------------------------------------

--
-- Table structure for table `operators`
--

CREATE TABLE `operators` (
  `id` int(11) NOT NULL,
  `operator_name` varchar(100) NOT NULL,
  `station_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `operators`
--

INSERT INTO `operators` (`id`, `operator_name`, `station_id`) VALUES
(46, 'name 1', '1'),
(47, 'name 2', '2'),
(48, 'name 3', '3'),
(49, 'name 4', '4'),
(50, 'name 5', '5'),
(51, 'name 6', '6'),
(52, 'name 7', '7'),
(53, 'name 8', '8'),
(54, 'name 9', '9'),
(55, 'name17', '16');

-- --------------------------------------------------------

--
-- Table structure for table `raised_defects`
--

CREATE TABLE `raised_defects` (
  `id` int(11) NOT NULL,
  `engine_serial_no` varchar(50) NOT NULL,
  `defects` varchar(500) NOT NULL,
  `actions` varchar(500) NOT NULL,
  `user` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `raised_defects`
--

INSERT INTO `raised_defects` (`id`, `engine_serial_no`, `defects`, `actions`, `user`, `updated_at`) VALUES
(1, '640522710874', 'Cam Chain Guide Damage', 'action 1', 'info@supervisor.com', '2024-09-21 17:42:21'),
(2, 'Test', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'Info@supervisor.com', '2024-09-24 20:10:59'),
(3, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-28 09:48:02'),
(4, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-29 20:32:28'),
(5, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-29 20:55:04'),
(6, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-29 20:55:38'),
(7, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-29 20:56:55'),
(8, 'test data', 'LCC & RCC joint gasket cut, Engine Wrong Model, LCC oil seal cut', 'action 1', 'info@supervisor.com', '2024-09-29 20:57:14'),
(9, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-09-29 21:20:40'),
(10, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-08 18:29:05'),
(11, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-08 19:13:48'),
(12, 'test data', 'Clutch Tight In Drive Shaft', 'action 1', 'info@supervisor.com', '2024-10-08 19:35:51'),
(15, 'test data', 'Sealing bolt loose/U/T', 'action 1', 'info@supervisor.com', '2024-10-08 19:42:00'),
(16, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-09 20:24:46'),
(17, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-21 18:16:16'),
(18, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-21 18:30:47'),
(19, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-21 18:31:08'),
(20, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-21 18:31:35'),
(21, 'test data', 'LCC & RCC joint gasket cut', 'action 1', 'info@supervisor.com', '2024-10-21 18:41:25'),
(22, 'test data', 'LCC & RCC joint gasket cut', 'action 2', 'info@supervisor.com', '2024-10-21 19:19:22'),
(23, 'test data', 'LCC oil seal cut', 'action 1', 'info@supervisor.com', '2024-10-21 19:19:47'),
(24, 'test data', 'Counter Shaft Oil Seal Cut (E/A)', 'action 1', 'info@supervisor.com', '2024-10-21 19:21:26'),
(25, 'test data', 'Clutch Tight In Drive Shaft', 'action 1', 'info@supervisor.com', '2024-10-21 19:24:39'),
(28, 'test data', 'Cam shaft thread damage', 'action 1', 'info@supervisor.com', '2024-10-21 19:54:52');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `alert_timer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `alert_timer`) VALUES
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `role` text NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `age`, `mobile`, `role`, `address`) VALUES
(9, 'User Test', 'info@user.com', 'user123', 0, '', 'user', ''),
(10, 'Supervisor test', 'info@supervisor.com', 'supervisor123', 0, '', 'supervisor', ''),
(12, 'admin', 'info@admin.com', 'admin123', 0, '', 'admin', '');

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `id` int(11) NOT NULL,
  `engine_serial_no` varchar(100) NOT NULL,
  `action_taken` varchar(100) NOT NULL,
  `operator_name` varchar(100) NOT NULL,
  `defect_name` varchar(100) NOT NULL,
  `station_id` varchar(100) NOT NULL,
  `screen_no` varchar(100) NOT NULL,
  `user` varchar(200) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`id`, `engine_serial_no`, `action_taken`, `operator_name`, `defect_name`, `station_id`, `screen_no`, `user`, `updated_at`) VALUES
(1, '640522710874', 'action 1', 'name 1', 'Cam Chain Guide Damage', '1', '3', 'info@supervisor.com', '2024-09-21 17:42:21'),
(2, 'Test', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'Info@supervisor.com', '2024-09-24 20:10:59'),
(3, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-28 09:48:02'),
(4, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-29 20:32:28'),
(5, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-29 20:55:04'),
(6, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-29 20:55:38'),
(7, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-29 20:56:55'),
(8, 'test data', 'action 1', 'name 1', 'LCC & RCC joint gasket cut', '1', '1', 'info@supervisor.com', '2024-09-29 20:57:14'),
(9, 'test data', 'action 1', 'name 1', 'Engine Wrong Model', '1', '1', 'info@supervisor.com', '2024-09-29 20:57:14'),
(10, 'test data', 'action 1', 'name 1', 'LCC oil seal cut', '1', '1', 'info@supervisor.com', '2024-09-29 20:57:14'),
(11, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-09-29 21:20:40'),
(12, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-08 18:29:05'),
(13, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-08 19:13:48'),
(14, 'test data', 'action 1', 'name 9', 'Clutch Tight In Drive Shaft', '9', '2', 'info@supervisor.com', '2024-10-08 19:35:51'),
(15, 'test data', 'action 1', 'name17', 'Sealing bolt loose/U/T', '17', '3', 'info@supervisor.com', '2024-10-08 19:42:00'),
(16, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-09 20:24:46'),
(17, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-21 18:16:16'),
(18, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-21 18:30:47'),
(19, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-21 18:31:08'),
(20, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-21 18:31:35'),
(21, 'test data', 'action 1', 'name 1', 'LCC & RCC joint gasket cut', '1', '1', 'info@supervisor.com', '2024-10-21 18:41:25'),
(22, 'test data', 'action 2', 'name 1', 'LCC & RCC joint gasket cut', '1', '1', 'info@supervisor.com', '2024-10-21 19:19:22'),
(23, 'test data', 'action 1', 'name 1', 'LCC oil seal cut', '1', '1', 'info@supervisor.com', '2024-10-21 19:19:47'),
(24, 'test data', 'action 1', 'name 1', 'Counter Shaft Oil Seal Cut (E/A)', '1', '1', 'info@supervisor.com', '2024-10-21 19:21:26'),
(25, 'test data', 'action 1', 'name 9', 'Clutch Tight In Drive Shaft', '9', '2', 'info@supervisor.com', '2024-10-21 19:24:39'),
(26, 'test data', 'action 1', 'name17', 'Cam shaft thread damage', '16', '3', 'info@supervisor.com', '2024-10-21 19:54:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `defects`
--
ALTER TABLE `defects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operators`
--
ALTER TABLE `operators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raised_defects`
--
ALTER TABLE `raised_defects`
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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `defects`
--
ALTER TABLE `defects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `operators`
--
ALTER TABLE `operators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `raised_defects`
--
ALTER TABLE `raised_defects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
