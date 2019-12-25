class Dog {  
   constructor(readonly name: string) { };

   sayHello(): string {
     return 'Dog says hello!';
   }
}

class Fish {  
    constructor(readonly name: string) { };

    dive(howDeep: number): string {
     return `Diving ${howDeep} feet`;
   }
}

class Frog {  
    constructor(readonly name: string) { };
}

type Pet = Dog | Fish | Frog;  

function talkToPet(pet: Pet): string {
  
  if (pet instanceof Dog) {  
    return pet.sayHello();
  } else if (pet instanceof Fish) {
    return 'Fish cannot talk, sorry.';
  } 
  else {
    // A hack to make sure that all union members are processed
    // Try adding the Frog as a member of the union in line 21 
    // and you'll see an error in the line 36 stating that 
    // Frog is not assignable to never. Add another else if
    // and the error will go away
    const ifOtherAnimalBecomesPet: never = pet;
    return ifOtherAnimalBecomesPet;
  }
}

const myDog = new Dog('Sammy');    
const myFish = new Fish('Marry');  

console.log(talkToPet(myDog));  
console.log(talkToPet(myFish)); 
