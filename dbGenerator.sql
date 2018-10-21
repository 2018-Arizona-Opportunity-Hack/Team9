CREATE DATABASE team9db;
USE team9db

CREATE TABLE CONTACTS (
NAME VARCHAR(50) NOT NULL, 
EMAIL VARCHAR(50) NOT NULL, 
PHONE INT NOT NULL,
PRIMARY KEY(EMAIL)
);

ALTER TABLE CONTACTS
MODIFY COLUMN PHONE VARCHAR(50);

CREATE TABLE GROUPSCATEGORY (
	ID INT NOT NULL,
	NAME VARCHAR(50) UNIQUE,
	DESCRIPTION VARCHAR(250)
);

ALTER TABLE GROUPSCATEGORY
ADD PRIMARY KEY (ID);

CREATE TABLE GROUPCOLLECTION (
	ID INT AUTO_INCREMENT,
	CONTACT_ID VARCHAR(50) NOT NULL,
	GROUP_ID INT,
	PRIMARY KEY(ID),
	CONSTRAINT FK_CONTACTID FOREIGN KEY (CONTACT_ID) REFERENCES CONTACTS (EMAIL),
	CONSTRAINT FK_GROUPID FOREIGN KEY (GROUP_ID) REFERENCES GROUPSCATEGORY (ID)
);

CREATE TABLE PREFRENCES (
	ID INT AUTO_INCREMENT,
	CONTACT_ID VARCHAR(50) NOT NULL,
	PREF1 VARCHAR(50),
	PREF2 VARCHAR(50),
	PREF3 VARCHAR(50),
	LAST_MODIFIED_DTAE DATE,
	PRIMARY KEY(ID),
	CONSTRAINT FK_CONTACTID_PREFS FOREIGN KEY (CONTACT_ID) REFERENCES CONTACTS (EMAIL)
);

CREATE TABLE RESPONSES(
	ID INT AUTO_INCREMENT,
	CONTACT_ID VARCHAR(50) NOT NULL,
	TEXTBODY VARCHAR(500),
	E_DTAE DATE,
	PRIMARY KEY(ID),
	CONSTRAINT FK_CONTACTID_RES FOREIGN KEY (CONTACT_ID) REFERENCES CONTACTS (EMAIL)
);

CREATE TABLE SERVERMSGS(
	ID INT AUTO_INCREMENT,
	CONTACT_ID VARCHAR(50) NOT NULL,
	TEXTBODY VARCHAR(500),
	E_DTAE DATE,
	MSG_ID VARCHAR(100),
	EVENT VARCHAR(50),
	PRIMARY KEY(ID),
	CONSTRAINT FK_CONTACTID_SMSG FOREIGN KEY (CONTACT_ID) REFERENCES CONTACTS (EMAIL)
);

ALTER TABLE RESPONSES
ADD COLUMN MSG_ID VARCHAR(100) NOT NULL UNIQUE;

ALTER TABLE RESPONSES
ADD COLUMN EVENT VARCHAR(50);

--Inserting contacts
INSERT INTO CONTACTS VALUES('Jhon Smith', 'jsmith1985@gmail.com', '1(480)-858-2323');
INSERT INTO CONTACTS VALUES('Alireza', 'rezavrfan@hotmail.com', '1(626)-634-2843');
INSERT INTO CONTACTS VALUES('Mariam', 'mbritan@gmail.com', '1(480)-934-2050');
INSERT INTO CONTACTS VALUES('Prian P.', 'p.forlife@yahoo.com', '1(626)-955-9890');
INSERT INTO CONTACTS VALUES('Moe B.', 'elbash@gmail.com', '1(480)-858-2518');

--Inserting Groups
INSERT INTO GROUPSCATEGORY VALUES(1, 'Young Adults', 'a group of young adults!');
INSERT INTO GROUPSCATEGORY VALUES(2, 'Elders', 'Elder community');

--Inserting CONTACTS in each GROUPSCATEGORY
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES('jsmith1985@gmail.com', 1);
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES('elbash@gmail.com', 1);
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES('rezavrfan@hotmail.com', 2);
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES('mbritan@gmail.com', 2);
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES('p.forlife@yahoo.com', 2);

--Inserting Preferences
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES('jsmith1985@gmail.com', 'No Notification after 8pm',
'','', '2018-1-9');
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES('rezavrfan@hotmail.com', 'Unsubscriped',
'','', '2017-5-9');
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES('elbash@gmail.com', 'non',
'','', '2018-1-9');
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES('mbritan@gmail.com', 'Unsubscriped',
'','', '2018-4-7');
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES('p.forlife@yahoo.com', 'non',
'','', '2017-3-8');

--Inserting RESPONSES
INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('jsmith1985@gmail.com', 'Can you come to the hospital Thursday 2/23/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2018-2-21');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('jsmith1985@gmail.com', 'Can you come to the hospital Monday 5/20/2018 at 4:30pm? RSVP at http://forms.google.com/form23345', '2018-3-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('jsmith1985@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form4564', '2017-5-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('p.forlife@yahoo.com', 'Can you come to the hospital Friday 2/20/2018 at 1:00pm? RSVP at http://forms.google.com/form2567', '2016-2-11');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('mbritan@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form234564', '2018-8-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('mbritan@gmail.com', 'Can you come to the hospital Thursday 2/23/2018 at 1:00pm? RSVP at http://forms.google.com/form2334244', '2016-8-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('mbritan@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2013-12-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('elbash@gmail.com', 'Can you come to the hospital Thursday 2/12/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2015-3-8');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('elbash@gmail.com', 'Can you come to the hospital Friday 3/11/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2017-6-7');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('rezavrfan@hotmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2015-11-11');

INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE) VALUES('rezavrfan@hotmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2016-3-8');

UPDATE RESPONSES SET MSG_ID = 'Dkjdfn34HB798', EVENT = 'Children Hospital Event'
WHERE ID = 1;

UPDATE RESPONSES SET MSG_ID = 'Dkj76543234HB798', EVENT = 'Children Hospital Event'
WHERE ID = 2;

UPDATE RESPONSES SET MSG_ID = 'SFDGJK43234HB798', EVENT = 'Breast Cancer Event'
WHERE ID = 3;

UPDATE RESPONSES SET MSG_ID = 'gfhGGkae32455sd', EVENT = 'Breast Cancer Event'
WHERE ID = 4;

UPDATE RESPONSES SET MSG_ID = 'jghjkl48953dfgd8', EVENT = 'Breast Cancer Event'
WHERE ID = 5;

UPDATE RESPONSES SET MSG_ID = 'Bash2347835sdfjg', EVENT = 'Breast Cancer Event'
WHERE ID = 6;

UPDATE RESPONSES SET MSG_ID = 'Dkdjf494394HB798', EVENT = 'Children Hospital Event'
WHERE ID = 7;

UPDATE RESPONSES SET MSG_ID = 'FFGDkkdgg34HB798', EVENT = 'Children Hospital Event'
WHERE ID = 8;

UPDATE RESPONSES SET MSG_ID = 'sldkfmn843758FFS', EVENT = 'Breast Cancer Event'
WHERE ID = 9;

UPDATE RESPONSES SET MSG_ID = 'FOOadh23874583ks', EVENT = 'Breast Cancer Event'
WHERE ID = 10;

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('jsmith1985@gmail.com', 'Can you come to the hospital Thursday 2/23/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2018-2-21', 'SFngjhk245sf', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('jsmith1985@gmail.com', 'Can you come to the hospital Monday 5/20/2018 at 4:30pm? RSVP at http://forms.google.com/form23345', '2018-3-8', 'Dtgj3948jdkf', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('jsmith1985@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form4564', '2017-5-8', 'DishgF34878734nmv', 'Children Hospital Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('p.forlife@yahoo.com', 'Can you come to the hospital Friday 2/20/2018 at 1:00pm? RSVP at http://forms.google.com/form2567', '2016-2-11', 'NshofFjh2487fcbg', 'Children Hospital Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('mbritan@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form234564', '2018-8-8', 'Flasjf3847dmhg', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('mbritan@gmail.com', 'Can you come to the hospital Thursday 2/23/2018 at 1:00pm? RSVP at http://forms.google.com/form2334244', '2016-8-8', 'SFjhn3598SDjgn', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('mbritan@gmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2013-12-8', 'BFHDwf8247djfjk', 'Children Hospital Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('elbash@gmail.com', 'Can you come to the hospital Thursday 2/12/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2015-3-8', 'Mosh384792nv', 'Children Hospital Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('elbash@gmail.com', 'Can you come to the hospital Friday 3/11/2018 at 1:00pm? RSVP at http://forms.google.com/form2344', '2017-6-7', 'Vashf835kdn432', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('rezavrfan@hotmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2015-11-11', 'Fdbjs9858723las', 'Breast Cancer Event');

INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES('rezavrfan@hotmail.com', 'Would you like to schedule appointment for next week? RSVP at http://forms.google.com/form2344', '2016-3-8', 'SFjf83848df', 'Children Hospital Event');