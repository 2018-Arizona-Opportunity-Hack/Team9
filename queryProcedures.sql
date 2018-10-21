-- Procedure to get group of contacts
CREATE PROCEDURE GetGroup(gName varchar(50))
BEGIN  
SELECT A.NAME, A.PHONE, C.NAME 
FROM CONTACTS A
JOIN GROUPCOLLECTION B ON A.EMAIL = B.CONTACT_ID
JOIN GROUPSCATEGORY C ON B.GROUP_ID = C.ID
WHERE C.NAME = gName;
END
//
CALL GetGroup('Young Adults'); //

-- Procedure to get user Responses
CREATE PROCEDURE GetResponses(uID varchar(50))
BEGIN  
SELECT U.NAME, U.PHONE, R.TEXTBODY, R.EVENT
FROM CONTACTS U, RESPONSES R
WHERE U.EMAIL = uID AND U.EMAIL = R.CONTACT_ID;
END
//

CALL GetResponses('jsmith1985@gmail.com'); //

