#include <iostream>

int main()
{

    /*Variables be declared and simulateneously assigned a value.
    This is handy if you already know what value the variable needs to have */

    /*============================================*/

    // integer can only hold a whole number
    /*
       Variables can also be declared without an initial value.
       They can then have a value assigned to them later in the program i.e. as an input from the user later in the program
   */
    int x;  // Declear an integer
    x = 57; // assignment
    int y = 3;
    int sumint = x + y;

    // Multiple lines can be printed by one line of code, as shown here:
    std::cout << x << std::endl
              << y << std::endl;

    std::cout << "value of x: " << x << '\n'; // print the integer
    std::cout << "Value of y: " << y << '\n';

    // We can add multiple variables together to create another variable:
    std::cout << "sum of x+y: " << sumint << '\n';

    std::cout << "________________" << '\n';

    /*==============================================*/

    // double: (can store numbers including decimals)
    double a = 9.5;
    double b = 0.5;
    double age = 22.2;
    double price = 99.99;
    double temperature = 36.4;
    double sumdbl = a + b;

    std::cout << "Value of a: " << a << '\n';
    std::cout << "Value of b: " << b << '\n';
    std::cout << "Sum of a+b: " << sumdbl << '\n';

    std::cout << "Age is :" << age << std::endl;
    std::cout << "The price is: " << price << std::endl;
    std::cout << "The Tepmperature is so hign,its around " << temperature << ' ' << "Degre celcious:" << std::endl;

    /*===============================================*/


    std::cout << "________________" << '\n';



    /*===============================================*/
 
    // Single Character :

    char grade = 'A';
    char initial = 'C';
    char dollersign = '$';

    std::cout << grade << std::endl;
    std::cout << initial << std::endl;
    std::cout << dollersign << std::endl;

    /*===============================================*/
    
    
    std::cout << "________________" << '\n';


    /*===============================================*/

    // boolean (true of false)
    bool power = true;
    bool forSale = false;
    bool student = true;

    /*=====================END==========================*/





    /*===============================================*/

    //String (Object that represent a sequence of text)
    std::string name = "Jahin";
    std::string day = "Sunday";
    std::string food = "Chocolate";
    std::string address = "123 Begunjoar";
    std::string todaysdate = "27th July 2026";

    std::cout << "Hello, " << name << "!" << '\n';
    std::cout << "You're " << age << " years old.";



    /*=====================END==========================*/

    return 0;
}