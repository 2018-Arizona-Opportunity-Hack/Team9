-- Procedure to add contact
CREATE PROCEDURE AddContact(name varchar(50), email varchar(50), phone varchar(50))
BEGIN  
INSERT INTO CONTACTS VALUES(name, email, phone);
END
//

-- Procedure to add contact
CREATE PROCEDURE AddGroup(gType varchar(50), gDesc varchar(50))
BEGIN  
DECLARE nID INT;
SET nID = (Select MAX(ID) AS gID FROM GROUPSCATEGORY);
SELECT nID;
SET nID = nID + 1;
INSERT INTO GROUPSCATEGORY VALUES(nID, gType, gDesc);
END
//

-- Procedure to add contact to a group
CREATE PROCEDURE AddContactToGroup(cID varchar(50), gID INT)
BEGIN  
INSERT INTO GROUPCOLLECTION(CONTACT_ID, GROUP_ID) VALUES(cID, gID);
END
//

-- Procedure to add contact Preferences
CREATE PROCEDURE AddContactPreferences(cID varchar(50), p1 varchar(50), p2 varchar(50), p3 varchar(50))
BEGIN  
INSERT INTO PREFRENCES(CONTACT_ID, PREF1, PREF2, PREF3, LAST_MODIFIED_DTAE) VALUES(cID, p1, p2, p3, NOW());
END
//

-- Procedure to add contact Responses
CREATE PROCEDURE AddContactResponses(cID varchar(50), tbody varchar(250), mID varchar(250), eType varchar(50))
BEGIN  
INSERT INTO RESPONSES(CONTACT_ID, TEXTBODY, E_DTAE, Msg_Id, Event) VALUES(cID, tbody, NOW(), mID, eType);
END
//

-- Procedure to add server messages
CREATE PROCEDURE AddServerMsgs(cID varchar(50), tbody varchar(250), mID varchar(250), eType varchar(50))
BEGIN  
INSERT INTO SERVERMSGS(CONTACT_ID, TEXTBODY, E_DTAE, MSG_ID, EVENT) VALUES(cID, tbody, NOW(), mID, eType);
END
//

-- Below are how to exec each procedure. Do NOT FORGET to replace the values with yours!
-- NOTE: Use the exact uncommented call line with only deleting the hardcoded values and replacing them with yours.
-- DO NOT move any thing else!

--	Contacts adding: 
CALL AddContact('Bash', 'nbaash@gmail.com', '1(480)-416-2518'); //

-- New Group adding
CALL AddGroup('Youth Boys', 'Youth boys list'); //

-- Adding contact to group
CALL AddContactToGroup('nbaash@gmail.com', 3); //

-- Adding contact prefrences
CALL AddContactPreferences('nbaash@gmail.com', 'non', 't', ''); //

-- Adding contact Responses
CALL AddContactResponses('nbaash@gmail.com', 'Yes', 'dfjhSD34357SDbjbf', 'Hospital'); //

-- Adding Server messages
CALL AddServerMsgs('nbaash@gmail.com', 'Can you come and pick up your pills Friday 10/28/2018? ', 'dfkjSFGDF458DFG', 'Hospital'); //
