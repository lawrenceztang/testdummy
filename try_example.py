# This script demonstrates a simple try-except block

def main():
    try:
        # Example: dividing by zero to raise an exception
        result = 10 / 0
        print(f"Result is {result}")
    except ZeroDivisionError as e:
        print(f"Caught an exception: {e}")
    finally:
        print("Execution of try-except block complete.")

if __name__ == "__main__":
    main()
