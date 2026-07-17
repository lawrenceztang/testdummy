def divide_numbers(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero."
    else:
        return f"Result is {result}"

if __name__ == "__main__":
    print(divide_numbers(10, 2))  # Should print: Result is 5.0
    print(divide_numbers(10, 0))  # Should print: Error: Cannot divide by zero.
