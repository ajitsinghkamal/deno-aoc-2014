# Day 1

Run the solution with:


```bash

deno task main --day=1 # runs both parts
deno task main --day=1 --part=1 # only run for part 1
deno task main --day=1 --part=2 # only run for part 2

```

---

### Part 1

https://adventofcode.com/2024/day/1

**Your actual left and right lists contain many location IDs. What is the total distance between your lists?**

| Left | Right |
| ---- | ----- |
| 3 | 4 |
| 4 | 3 |
| 2 | 5 |
| 1 | 3 |
| 3 | 9 |
| 3 | 3 |

> To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is `2 + 1 + 0 + 1 + 2 + 5`, a total distance of `11`!

### Part 2

https://adventofcode.com/2024/day/1#part2

**Calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list.**

---

**Solution**

<img width="871" alt="Screenshot 2024-12-08 at 21 33 38" src="https://github.com/user-attachments/assets/5fd5356b-3894-40e3-965a-be16cae8ed6e">

<img width="879" alt="Screenshot 2024-12-08 at 15 27 17" src="https://github.com/user-attachments/assets/a58fd938-e1f8-45cc-9baf-a2ac305f269a">

<img width="891" alt="Screenshot 2024-12-08 at 21 41 03" src="https://github.com/user-attachments/assets/abec3b5e-dd26-4abe-a054-488a727c70ac">

