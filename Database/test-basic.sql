# 数据库基础的CURD操作备忘

CREATE TABLE `Persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255),
  `FirstName` varchar(255),
  `Address` varchar(255),
  `City` varchar(255),
  `Age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- 创建(C reate)
INSERT INTO `Persons` (`LastName`, `FirstName`, `Address`, `City`, `Age`)
VALUES
	('Adams', 'John', 'Oxford Street', 'London', 25),
	('Bush', 'George', 'Fifth Avenue', 'New York', 50),
	('Carter', 'Thomas', 'Changan Street', 'Beijing', 12),
	('Bush', 'Trump', 'Hangzhou', 'Beijing', 25); 

# INSERT INTO Persons (LastName, Address) VALUES ('Wilson', 'Champs-Elysees');

-- 更新(U pdate)
# UPDATE Persons SET FirstName = 'Fred', City = 'London' ,Age = 90 WHERE LastName = 'Wilson';

-- 读取(R etrieve)
# SELECT * FROM Persons;

# SELECT LastName, FirstName FROM Persons;

# SELECT DISTINCT LastName FROM Persons;

# SELECT * FROM Persons WHERE City='Beijing';

# SELECT * FROM Persons WHERE Age<>25 ORDER BY Age;

# SELECT * FROM Persons WHERE FirstName='George' AND LastName='Bush';

# SELECT * FROM Persons WHERE FirstName='George' OR LastName='Bush';

# SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William') AND LastName='Carter';

# SELECT * FROM Persons ORDER BY Age ASC,City ASC;

-- 删除(D elete)
# DELETE FROM Persons WHERE LastName = 'Wilson';

# DELETE FROM Persons