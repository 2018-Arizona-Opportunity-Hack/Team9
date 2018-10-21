-- Getting a specific group
SELECT A.NAME, A.PHONE 
FROM CONTACTS A
JOIN GROUPCOLLECTION B ON A.EMAIL = B.CONTACT_ID
JOIN GROUPSCATEGORY C ON B.GROUP_ID = C.ID
WHERE C.NAME = 'Young Adults';


-- Getting user PREFRENCES
SELECT U.NAME , P.PREF1, P.PREF2, P.PREF3
FROM CONTACTS U, PREFRENCES P
WHERE U.EMAIL = 'jsmith1985@gmail.com' AND P.CONTACT_ID = U.EMAIL;

-- Getting user Responses
SELECT U.NAME, U.PHONE, R.TEXTBODY, R.EVENT
FROM CONTACTS U, RESPONSES R
WHERE U.EMAIL = 'jsmith1985@gmail.com' AND U.EMAIL = R.CONTACT_ID;

-- Getting responses for an event
SELECT U.NAME, U.PHONE, R.TEXTBODY, R.EVENT
FROM CONTACTS U, RESPONSES R
WHERE U.EMAIL = R.CONTACT_ID AND R.EVENT = 'Breast Cancer Event';

-- Getting server sms for a user
SELECT U.NAME, U.PHONE, S.TEXTBODY, S.EVENT
FROM CONTACTS U, SERVERMSGS S
WHERE U.EMAIL = 'jsmith1985@gmail.com' AND U.EMAIL = S.CONTACT_ID;

-- Getting server sms for an event
SELECT U.NAME, U.PHONE, S.TEXTBODY, S.EVENT
FROM CONTACTS U, SERVERMSGS S
WHERE U.EMAIL = S.CONTACT_ID AND S.EVENT = 'Breast Cancer Event';

-- for testing
DROP TABLE MSG
CREATE TABLE MSG (
	SID VARCHAR(250) NOT NULL UNIQUE,
	BODY VARCHAR(250),
    DATE_SENT DATETIME
);

SELECT *
FROM msg
