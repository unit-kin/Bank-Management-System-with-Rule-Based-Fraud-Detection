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
-- Table structure for table `fraud_transactions`
--

DROP TABLE IF EXISTS `fraud_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fraud_transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `sender_username` varchar(255) NOT NULL,
  `receiver_username` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `mac_address` varchar(17) NOT NULL,
  `transactiontype` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `read` tinyint DEFAULT '0',
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraud_transactions`
--

LOCK TABLES `fraud_transactions` WRITE;
/*!40000 ALTER TABLE `fraud_transactions` DISABLE KEYS */;
INSERT INTO `fraud_transactions` VALUES (1,'John James','John James',100001.00,'2023-08-23 16:37:46','Your location','Your IP','5c:96:9d:86:b4:d3','Deposit','',0),(2,'John James','John James',100001.00,'2023-08-23 17:15:34','Your location','Your IP','5c:96:9d:86:b4:d3','Deposit','Large deposit detected for user',0),(3,'John James','ACCT-67d2c166',5000.00,'2023-08-23 17:29:09','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(4,'John James','ACCT-67d2c165',10000000.00,'2023-08-23 17:42:47','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Large transaction amount:',0),(5,'Kang\'ara','Kang\'ara',1000000.00,'2023-08-23 19:54:41','Your location','Your IP','5c:96:9d:86:b4:d3','Deposit','Large deposit detected for user',0),(6,'John James','ACCT-20221f222',509055.00,'2023-08-23 20:08:30','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(7,'John James','ACCT-20221f10777733',100001.00,'2023-08-23 20:18:43','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(8,'John James','ACCT-67d2c165',100001.00,'2023-08-23 20:19:07','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Large transaction amount:',0),(9,'John James','hbivkknjasncoscnjc',5777777.00,'2023-08-23 20:30:56','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(10,'John James','wicbwcbwichwc9w43r43',30.00,'2023-08-23 20:44:30','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(11,'John James','923842934232223928',2000.00,'2023-08-24 16:21:23','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(12,'John James','43567uyibhkjomninin',400.00,'2023-08-25 13:06:46','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(13,'John James','5623728e92y7327e82e872',5000.00,'2023-08-25 13:26:11','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(14,'John James','fcgvhbjedrcfvtgbyhnurdcfvg',777.00,'2023-08-30 13:15:40','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(15,'John James','John James',100001.00,'2023-08-30 13:21:07','Your location','Your IP','5c:96:9d:86:b4:d3','Deposit','Large deposit detected for user',0),(16,'John James','ACCT-67d2c165',200000.00,'2023-08-31 16:14:26','Your location','Your IP','a8:20:66:44:53:02','Transfer','MAC address mismatch for user',0),(17,'John James','ACCT-67d2c165',30.00,'2023-08-31 16:16:40','Your location','Your IP','a8:20:66:44:53:02','Transfer','MAC address mismatch for user',0),(18,'John James','ACCT-67d2c165',200000.00,'2023-08-31 16:20:31','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Large transaction amount:',0),(19,'John James','fwckw cvwkrcowjnw23456',2345.00,'2023-09-04 15:55:14','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',1),(20,'John James','sedrhjkl;\'lkjhgfd',34567890.00,'2023-09-04 16:34:45','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',1),(21,'John James','21345678',9876543.00,'2023-09-04 16:48:39','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',1),(22,'John James','234566u',2345678.00,'2023-09-04 16:54:04','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',1),(23,'John James','3456789',34569.00,'2023-09-04 17:04:11','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',1),(24,'John James','4567890',5467890.00,'2023-09-06 15:27:08','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected ',0),(25,'John James','4567890',5467890.00,'2023-09-06 15:31:15','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(26,'John James','4567890',5467890.00,'2023-09-06 15:37:10','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(27,'John James','4567890',5467890.00,'2023-09-06 15:38:28','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(28,'John James','4567890',5467890.00,'2023-09-06 15:59:07','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(29,'John James','4567890',5467890.00,'2023-09-06 16:00:34','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(30,'John James','4567890',5467890.00,'2023-09-06 16:04:58','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(31,'John James','34567890',3456789.00,'2023-09-07 22:35:41','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(32,'John James','34567',3456789.00,'2023-09-07 22:41:30','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(33,'John James','34567',3456789.00,'2023-09-07 22:42:02','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(34,'John James','34567',3456789.00,'2023-09-07 22:45:31','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(35,'John James','34567',3456789.00,'2023-09-07 22:46:04','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(36,'John James','34567',3456789.00,'2023-09-07 22:47:09','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(37,'John James','34567890',3456789.00,'2023-09-07 22:48:24','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(38,'John James','John James',5000.00,'2023-09-07 22:50:21','Your location','Your IP','5c:96:9d:86:b4:d3','Withdrawal','Rapid withdrawals detected for user',0),(39,'John James','John James',5000.00,'2023-09-07 22:50:24','Your location','Your IP','5c:96:9d:86:b4:d3','Withdrawal','Rapid withdrawals detected for user',0),(40,'John James','John James',5000.00,'2023-09-07 22:50:29','Your location','Your IP','5c:96:9d:86:b4:d3','Withdrawal','Rapid withdrawals detected for user',0),(41,'John James','34567890876',345654.00,'2023-09-08 09:14:24','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(42,'John James','ACCT-67d2c167',500.00,'2023-09-08 09:24:53','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',1),(43,'John James','5467890-',65789.00,'2023-09-13 11:23:20','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(44,'John James','5467890-',65789.00,'2023-09-13 11:23:38','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0),(45,'John James','5467890-',65789.00,'2023-09-13 11:24:30','Your location','Your IP','5c:96:9d:86:b4:d3','Transfer','Invalid receiver account detected',0);
/*!40000 ALTER TABLE `fraud_transactions` ENABLE KEYS */;
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
