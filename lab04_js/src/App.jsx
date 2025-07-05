function App() {
  // variables
  var x; // Now x is undefined
  var length = 16; // Number
  var lastName = "Johnson"; // String
  var x = {
    firstName: "John",
    lastName: "Doe"
  };

  // operators
  var x = 5; // assign the value 5 to x
  var y = 2; // assign the value 2 to y
  var z = x + y; // assign the value 7 to z (x + y) 
  var z = x * y;

  // functions
  function showMessage() {
    var userName = "Bob"; // (1) changed the outer variable

    let message = 'Hello, ' + userName;
    alert(message);
  }
  // showMessage()

  function add() {
    return 1 + 2;
  }
  console.log(add());

  function sum(a, b) {
    return a + b;
  }
  console.log(sum(5, 10));

  // arrrow function
  let sayHi = () => console.log("Hello!");
  sayHi();

  let multiSum = (a, b) => {
    let result = a + b;
    return result;
  };

  console.log(multiSum(1, 2));


  // if
  var score = 85;
  if (score > 80) {
    console.log("You passed the exam!");
  }

  // if else
  var score = 75;
  if (score > 80) {
    console.log("Your grade is A");
  }
  else if (score > 70) {
    console.log("Your grade is B");
  }
  else if (score > 60) {
    console.log("Your grade is C");
  }
  else {
    console.log("You failed the exam.");
  }

  // while loop
  let i = 0;
  while (i < 5) {
    console.log("Number: " + i);
    i++;
  }

  // for loop 
  for (let i = 0; i < 5; i++) {
    console.log("Number: " + i);
  }

  // objects
  let person = {
    firstName: "sakda",
    lastName: "homhuan",
    age: 30,
    getFullName: function () {
      return this.firstName + " " + this.lastName;
    }
  };


  const rand = Math.random() * 9;
  const lottery = rand.toFixed(0);
  console.log("Lottery number is: " + lottery);

  const onInputChange = (event) => {
    console.log(event.target.value);
    if (event.target.value == lottery) {
      console.log("รวยๆ :)");
    } else {
      console.log("งวดหน้าเอาใหม่!");
    }
  }

  let user = {
    firstname: "John",
    age: 30,
    sayHi: function () {
      console.log("Hello " + this.firstname);
    },
    sayYeah() {
      console.log("Yeah!!")
    }
  };

  user.sayHi()


  return (
    <>
      {/* <input type="number" name="" onChange={onInputChange} /> */}
    </>
  )
}

export default App
