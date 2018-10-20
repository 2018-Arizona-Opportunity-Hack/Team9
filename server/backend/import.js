

function readCSV(){
    const filePath = "C:\\Users\\nicko\\OneDrive\\Desktop\\Team9\\demo.csv";

    const csv= require('csvtojson');

    csv()
        .fromFile(filePath)
        .then((jsonObj) => {
            [jsonObj].forEach(item => {
                client.messages.create(item{'Phone Number'})
            });
        })
}

readCSV();

class Person{
    constructor(lastName, firstName, phoneNumber, email){
        this._lastName = lastName;
        this._firsName = firstName;
        this._phoneNumber = phoneNumber;
        this._email = email;
    }

    get lastName(){
        return this._lastName;
    }

    get firstName(){
        return this._firsName;
    }

    get phoneNumber(){
        return this._phoneNumber;
    }

    get email(){
        return this._email;
    }
}

class CSV(){
    
}
