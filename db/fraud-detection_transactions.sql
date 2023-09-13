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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `sender_username` varchar(255) NOT NULL,
  `receiver_username` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `mac_address` varchar(17) NOT NULL,
  `transactiontype` varchar(50) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `fk_sender_username` (`sender_username`),
  CONSTRAINT `fk_sender_username` FOREIGN KEY (`sender_username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'Austyn Murimi','Austyn Murimi',5000.00,'2023-08-20 11:42:53','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(2,'Austyn Murimi','Austyn Murimi',-1000.00,'2023-08-20 12:31:24','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(3,'Austyn Murimi','Austyn Murimi',5000.00,'2023-08-20 13:00:46','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(4,'Austyn Murimi','Austyn Murimi',1000.00,'2023-08-20 13:02:42','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(5,'Austyn Murimi','Austyn Murimi',5000.00,'2023-08-20 13:04:36','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(6,'Austyn Murimi','Austyn Murimi',5000.00,'2023-08-20 13:07:28','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(7,'John James','John James',5000.00,'2023-08-20 13:13:46','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(8,'John James','John James',-1000.00,'2023-08-20 13:18:02','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(9,'John James','John James',10000.00,'2023-08-20 13:37:05','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(10,'John James','John James',-1000.00,'2023-08-20 13:43:27','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(11,'John James','John James',-5000.00,'2023-08-20 13:46:55','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(12,'John James','John James',-50.00,'2023-08-20 13:57:49','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(13,'John James','John James',20.00,'2023-08-20 14:00:57','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(14,'John James','Kang\'ara',2000.00,'2023-08-20 14:32:21','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(15,'Kang\'ara','John James',5000.00,'2023-08-20 14:33:30','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(16,'Kang\'ara','Kang\'ara',10000.00,'2023-08-20 14:37:49','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(17,'Kang\'ara','John James',20.00,'2023-08-20 14:38:49','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(18,'Kang\'ara','John James',30.00,'2023-08-21 09:01:37','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(19,'Kang\'ara','John James',30.00,'2023-08-21 09:08:06','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(20,'Kang\'ara','John James',10.00,'2023-08-21 09:10:12','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(21,'John James','Kang\'ara',60.00,'2023-08-21 10:21:15','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(22,'John James','Kang\'ara',20.00,'2023-08-21 10:34:42','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(23,'Kang\'ara','John James',500.00,'2023-08-21 11:10:37','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(24,'Kang\'ara','Kang\'ara',-30.00,'2023-08-21 11:55:22','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(25,'Kang\'ara','Kang\'ara',40.00,'2023-08-21 11:59:04','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(26,'John James','John James',-300.00,'2023-08-21 13:04:35','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(27,'John James','John James',-300.00,'2023-08-21 13:40:07','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(28,'John James','John James',-30.00,'2023-08-21 13:46:44','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(29,'John James','John James',-30.00,'2023-08-21 13:46:49','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(30,'John James','Kang\'ara',10000.00,'2023-08-21 14:38:29','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(31,'John James','John James',10000.00,'2023-08-21 15:10:23','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(32,'John James','Kang\'ara',2000.00,'2023-08-22 10:54:53','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(33,'John James','Kang\'ara',20.00,'2023-08-22 11:48:48','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(34,'Kang\'ara','John James',200.00,'2023-08-23 09:22:04','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(35,'Kang\'ara','Kang\'ara',50.00,'2023-08-23 10:07:33','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(36,'Kang\'ara','Kang\'ara',-30.00,'2023-08-23 10:11:42','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(37,'Kang\'ara','John James',30.00,'2023-08-23 10:14:03','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(38,'John James','John James',100001.00,'2023-08-23 13:58:43','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(39,'John James','John James',100001.00,'2023-08-23 14:01:47','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(40,'John James','John James',100001.00,'2023-08-23 14:05:01','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(41,'John James','John James',100001.00,'2023-08-23 14:28:03','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(42,'John James','John James',20.00,'2023-08-23 14:51:18','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(43,'John James','John James',100001.00,'2023-08-23 15:11:41','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Deposit'),(44,'John James','Kang\'ara',200.00,'2023-08-23 20:10:33','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(45,'John James','Kang\'ara',1000.00,'2023-08-23 20:19:18','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(46,'John James','Kang\'ara',2000.00,'2023-08-23 20:31:13','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(47,'John James','Kang\'ara',30.00,'2023-08-23 20:44:43','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(48,'John James','Kang\'ara',2000.00,'2023-08-24 16:22:22','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(49,'John James','Kang\'ara',400.00,'2023-08-25 13:07:24','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(50,'John James','Kang\'ara',5000.00,'2023-08-25 13:27:32','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(51,'John James','Kang\'ara',888.00,'2023-08-30 13:17:07','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(52,'John James','Kang\'ara',1000.00,'2023-08-31 16:20:19','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Transfer'),(53,'John James','John James',-5000.00,'2023-09-07 22:49:56','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(54,'John James','John James',-5000.00,'2023-09-07 22:50:05','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal'),(55,'John James','John James',-5000.00,'2023-09-07 22:50:13','Your location','::ffff:127.0.0.1','5c:96:9d:86:b4:d3','Withdrawal');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
