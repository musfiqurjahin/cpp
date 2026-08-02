#include <iostream>
#include <vector>
#include <string>   // <-- Missing header

// This is very long to type out!
// typedef std::vector<std::pair<std::string, int>> pairlist_t;

typedef std::string str_t;

using text_t = std::string;

int main() {

    // std::vector<std::pair<std::string, int>> pairlist;
    // pairlist_t pairlist;

    std::string one = "Hello";
    str_t two = "World";

    std::cout << one << " " << two << std::endl;

    text_t three = "Goodbye";
    std::cout << three << std::endl;

    return 0;
}