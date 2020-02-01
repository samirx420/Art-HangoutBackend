

// class Country {

//     firstname;
//     lastname;
//     // constructor(){
//     //     this.firstname;

//     // }
  
//     // fields(){
//     //     return ['firstname', 'lastname']
//     // }

// }

// console.log(Object.keys(new Country()))

let fields = ['first_name', 'last_name']

const mapped = fields.reduce((acc, item) => {
        return {
            ...acc,
            [item]: item,
        };
    },
    {}
);

console.log(mapped)