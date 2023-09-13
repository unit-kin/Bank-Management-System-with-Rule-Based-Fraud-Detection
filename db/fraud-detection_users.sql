-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: fraud-detection
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.23.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `account_number` varchar(20) NOT NULL,
  `mac_address` varchar(17) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `status` varchar(10) DEFAULT 'active',
  `last_blocked_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `account_number` (`account_number`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alvin','akkangara8@gmail.com','$2b$10$B.gfRb2oyr.6C6oMGmzza.m1j5h3hR48a6ENJoinjtxed7ut6xGti','ACCT-9f61c440',NULL,NULL,0,'active','2023-08-22 11:29:00'),(2,'John Jones ','Johnj@gmail.com','$2b$10$NDlwfiKR8tfMrF5toEwlWOJHVGV8gNM4anxzfWAkfTUs18tBTNtVG','ACCT-4d573ca6','5c:96:9d:86:b4:d3',NULL,0,'active',NULL),(3,'Austyn Murimi','Murimz@gmail.com','$2b$10$4LkFBmfsxMMtkc4RZalaYeRprxh/dpeNUZ5tycR.JZsVvW7zb8Tqe','ACCT-0f3b9adf','5c:96:9d:86:b4:d3',NULL,0,'active',NULL),(4,'John James','Johnjames@gmail.com','$2b$10$4UblXOPE3EV64E2JBkpEYuuyBN5fuj3e.INfTWaVXNzzNfD7j612W','ACCT-20221f10','5c:96:9d:86:b4:d3',481537.00,0,'active','2023-09-08 06:27:41'),(5,'Kang\'ara','kang14@gmail.com','$2b$10$B6y2EZZjR.oQT6QwJ5eHp.9lodHpdI91IGvzdAuEVY1UjHA4Qvoge','ACCT-67d2c165','5c:96:9d:86:b4:d3',30828.00,0,'active',NULL),(6,'Admin','Admin@gmail.com','$2b$10$YHpvPtF93VNFrfcSdT9r1.PUnBjRepbtIJl/wq7XxAK9omaBacmx2','ACCT-8b582a39','5c:96:9d:86:b4:d3',0.00,1,'active',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-13 11:37:16
