// index.js

/**
class Date{
	getFullYear(){
	 }
	getMonth(){
	 }
}
**/

const aaa = new Date();
console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);

// - `aaa` 에 `Date 객체` 를 할당하면 `aaa` 는 `.getMonth` 와 `.getFullYear` 객체 메서드를 사용할 수 있습니다.
//     - 우리는 Date 라는 클래스와 객체 메서드를 만든 적이 없지만 자동으로 내장해 가지고 있습니다.

//         이러한 객체를 **`내장 객체`**라고 합니다.

// index.js

// index.js

class Monster {
  power = 10;

  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power + "야!!!");
  };

  run = () => {
    console.log("도망가자!!");
  };
}

const mymonster1 = new Monster(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(50);
mymonster2.attack();
mymonster2.run();

// - `Monster 클래스` 를 만들어 주었습니다. 이 Monster Class는 Monster를 만드는 설명서일 뿐, 아직 Monster가 만들어진 상태는 아닙니다.
//     - 클래스 안에는 함수 뿐 아니라, 변수(`power`)를 넣어줄 수도 있는데, 변수를 넣어줄 때는 **변수를 선언할 때 사용한 let, const 등을 사용하지는 않습니다.**
//     - `attack()` 함수와 `run()` 함수를 만들었습니다. Monster가 가지는 기능을 만들어 준 것입니다.
// - `new Monster()` :  **new 연산자와 생성자 함수**를 사용해 새로운 객체(mymonster)를 생성했습니다.
//     - 이제, Monster Class 대로 Monster가 만들어진 것 입니다.
//     - Monster Class 내부에 존재하는 함수들에 대해 `.`을 통해 접근할 수 있습니다.
//         - ex) mymonster1`.attack()`
//     - 새로운 객체 대신, class를 가지고 ‘ 새로운 인스턴스를 생성해 주었다’ 라고도 불립니다.

// - 내장함수 `constructor()` 생성자를 사용하여 초기값을 생성해 줄 수 있습니다.
//     - `constructor()` : Monster를 만들 때(생성할 때) 실행해주는 함수입니다.
//         - 따라서, new Monster를 할 때, constructor 함수 내부가 실행 됩니다.
//     - `mymonster2` 는 넘겨받은 인수와 함께 `constructor`가 자동으로 실행됩니다.
        
//         이때 **인수 50**이 aaa라는 이름으로 `this.power`에 할당해 줌으로써 초기값이 다시 생성되게 되는 것입니다.